import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Suspense, lazy } from 'react'
import Navigation from './components/Navigation'
import TickerTape from './components/TickerTape'
import Hero from './components/Hero'
import Portfolio from './components/Portfolio'
import Blog from './components/Blog'
import Footer from './components/Footer'
import BlogPost from './components/BlogPost'
import CNNDemo from './components/CNNDemo'
import SentimentDemo from './components/SentimentDemo'

// Lazy load MDX blog posts for better performance
const CnnBackpropagation = lazy(() => import('./content/blog/cnn-backpropagation.mdx'))

// Frontmatter needs to be imported separately (not lazy)
import { frontmatter as cnnFrontmatter } from './content/blog/cnn-backpropagation.mdx'

function BlogLoading() {
  return (
    <div className="pt-32 pb-16 flex flex-col items-center justify-center min-h-[50vh]">
      <div
        className="w-10 h-10 border-[3px] border-electric border-t-transparent mb-4 animate-spin"
        style={{ borderRadius: 0 }}
      />
      <p className="text-cream/70 font-semibold tracking-wide">Loading article…</p>
    </div>
  )
}

function App() {
  return (
    <Router>
      <div className="min-h-screen relative bg-ink text-cream">
        <div className="fixed inset-0 z-0 bg-ink pointer-events-none overflow-hidden" aria-hidden>
          <div className="absolute -top-20 -right-10 w-[min(60vw,480px)] h-56 bg-hot/30 rotate-[-10deg] border-2 border-cream/25" />
          <div className="absolute top-[22%] -left-12 w-80 h-44 bg-electric/12 rotate-[7deg] border-2 border-cream/15" />
          <div className="absolute top-[48%] right-[4%] w-36 h-36 bg-hot/22 rotate-[-18deg] border-2 border-ink" />
          <div className="absolute bottom-[18%] left-[12%] w-52 h-28 bg-electric/15 rotate-[4deg] border-2 border-cream/12" />
          <div className="absolute bottom-24 right-[22%] w-28 h-28 bg-hot/18 rotate-[14deg] border-2 border-ink" />
          <div className="absolute top-[60%] left-[40%] w-px h-32 bg-electric/35 rotate-90 hidden lg:block" />
          <div className="absolute top-[15%] right-[35%] w-20 h-20 border-2 border-hot/45 rotate-45" />
        </div>

        <div className="relative z-10">
          <Navigation />
          <TickerTape />
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/cnn-demo" element={<CNNDemo />} />
              <Route path="/sentiment-demo" element={<SentimentDemo />} />
              <Route
                path="/blog/cnn-backpropagation"
                element={
                  <Suspense fallback={<BlogLoading />}>
                    <BlogPost frontmatter={cnnFrontmatter}>
                      <CnnBackpropagation />
                    </BlogPost>
                  </Suspense>
                }
              />
            </Routes>
          </motion.main>
          <Footer />
        </div>
      </div>
    </Router>
  )
}

export default App
