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
    <div className="pt-20 pb-16 overflow-x-hidden">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Link
          to="/blog"
          className="inline-flex items-center space-x-2 text-gray-400 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Blog</span>
        </Link>
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12"
      >
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center space-x-2 text-gray-400">
            <Calendar size={18} />
            <span>{frontmatter.date}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Tag size={18} className="text-gray-400" />
            <div className="flex flex-wrap gap-2">
              {frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-emerald-500/10 text-emerald-300 px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {frontmatter.title}
        </h1>

        {/* Description */}
        <p className="text-xl text-gray-300 leading-relaxed">
          {frontmatter.description}
        </p>
      </motion.header>

      {/* Content */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="prose">
          {children}
        </div>
      </motion.article>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-gray-800/50"
      >
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link
            to="/blog"
            className="btn-secondary"
          >
            ← More Articles
          </Link>
          <a
            href="mailto:max@maxkendall.com"
            className="text-gray-400 hover:text-emerald-400 transition-colors"
          >
            Questions? Get in touch
          </a>
        </div>
      </motion.footer>
    </div>
  )
}

export default BlogPost

