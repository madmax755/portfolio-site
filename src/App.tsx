import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Suspense, lazy } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Portfolio from './components/Portfolio'
import Blog from './components/Blog'
import Footer from './components/Footer'
import BlogPost from './components/BlogPost'

// Lazy load MDX blog posts for better performance
const CnnBackpropagation = lazy(() => import('./content/blog/cnn-backpropagation.mdx'))

// Frontmatter needs to be imported separately (not lazy)
import { frontmatter as cnnFrontmatter } from './content/blog/cnn-backpropagation.mdx'

// Loading component for blog posts
function BlogLoading() {
  return (
    <div className="pt-32 pb-16 flex flex-col items-center justify-center min-h-[50vh]">
      <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-gray-400">Loading article...</p>
    </div>
  )
}

function App() {
  return (
    <Router>
      <div className="min-h-screen relative">
        {/* Fixed background layer */}
        <div className="fixed inset-0 bg-gray-950 z-0" />
        <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-emerald-950/30 z-0" />
        
        {/* Floating background effects */}
        <div className="fixed top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-float z-0 pointer-events-none" />
        <div className="fixed bottom-20 right-10 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl animate-float z-0 pointer-events-none" style={{ animationDelay: '2s' }} />
        <div className="fixed top-1/4 left-1/4 w-2 h-2 bg-emerald-400 rounded-full opacity-60 animate-float z-0 pointer-events-none" style={{ animationDelay: '1s' }} />
        <div className="fixed top-3/4 right-1/4 w-1 h-1 bg-emerald-300 rounded-full opacity-40 animate-float z-0 pointer-events-none" style={{ animationDelay: '3s' }} />
        <div className="fixed top-1/2 left-3/4 w-3 h-3 bg-emerald-500 rounded-full opacity-30 animate-float z-0 pointer-events-none" style={{ animationDelay: '4s' }} />
        
        {/* Content layer */}
        <div className="relative z-10">
        <Navigation />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/blog" element={<Blog />} />
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
