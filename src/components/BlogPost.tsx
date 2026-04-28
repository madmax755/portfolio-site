import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'
import { Link } from 'react-router-dom'

interface BlogPostProps {
  frontmatter: {
    title: string
    date: string
    description: string
    tags: string[]
  }
  children: React.ReactNode
}

function BlogPost({ frontmatter, children }: BlogPostProps) {
  return (
    <div className="relative isolate min-h-screen overflow-x-hidden">
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-ink/82 backdrop-blur-md supports-[backdrop-filter]:bg-ink/72"
        aria-hidden
      />

      <div className="relative z-10 pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-display font-bold text-xs uppercase tracking-[0.2em] text-cream/55 hover:text-hot transition-colors group"
          >
            <ArrowLeft size={20} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to blog</span>
          </Link>
        </div>

        <motion.header
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.48 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12"
        >
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex items-center gap-2 text-cream/50 font-semibold">
              <Calendar size={18} strokeWidth={2.25} />
              <span>{frontmatter.date}</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Tag size={18} className="text-cream/40 shrink-0" strokeWidth={2.25} />
              <div className="flex flex-wrap gap-2">
                {frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-display font-bold uppercase tracking-[0.15em] text-ink bg-electric px-2.5 py-1 border-2 border-ink"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-cream mb-6 leading-[1.06] uppercase tracking-tight">
            {frontmatter.title}
          </h1>

          <div className="border-l-4 border-electric pl-5 py-3 bg-panel/85 border-y border-r border-cream/10 max-w-3xl backdrop-blur-sm">
            <p className="text-xl text-cream/80 leading-relaxed font-semibold">
              {frontmatter.description}
            </p>
          </div>
        </motion.header>

        <motion.article
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.48, delay: 0.08 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="prose blog-reading-panel border-2 border-cream/12 bg-panel/88 p-6 sm:p-8 backdrop-blur-sm">
            {children}
          </div>
        </motion.article>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.48, delay: 0.15 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-10 border-t-2 border-cream/10"
        >
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
            <Link to="/blog" className="btn-secondary text-center sm:text-left w-fit">
              ← More articles
            </Link>
            <a
              href="mailto:max@maxkendall.com"
              className="font-display font-bold text-xs uppercase tracking-[0.2em] text-cream/50 hover:text-electric transition-colors text-center sm:text-right"
            >
              Questions? Email me
            </a>
          </div>
        </motion.footer>
      </div>
    </div>
  )
}

export default BlogPost
