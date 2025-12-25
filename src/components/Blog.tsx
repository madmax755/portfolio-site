import { motion } from 'framer-motion'
import { Calendar, ArrowRight, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'

function Blog() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  const blogPosts = [
    {
      title: 'Backpropagation for Convolutional Neural Networks',
      date: 'Dec 2024',
      description: 'A deep dive into the mathematics and implementation of backpropagation in CNNs, including gradient computation for convolutional layers.',
      slug: 'cnn-backpropagation',
      tags: ['Machine Learning', 'CNN', 'Mathematics']
    }
  ]

  const recentUpdates = [
    { title: 'CNN Demo', link: '/cnn_demo', type: 'Project', isExternal: true },
    { title: 'Backpropagation for CNNs', link: '/blog/cnn-backpropagation', type: 'Article', isExternal: false }
  ]

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-10 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
                Blog & Articles
              </span>
            </h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              Thoughts on software engineering, machine learning, and technology
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {blogPosts.map((post, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="card group hover:border-emerald-500/30 transition-all duration-300 block cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Calendar size={16} />
                      <span className="text-sm">{post.date}</span>
                    </div>
                    <div className="text-emerald-400 group-hover:text-emerald-300 transition-colors p-2">
                      <ArrowRight size={18} />
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-gray-100 mb-4 leading-relaxed">
                    {post.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-xs bg-emerald-500/10 text-emerald-300 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Recent Updates Sidebar */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center justify-center space-x-3">
              <BookOpen className="text-emerald-400" size={32} />
              <span>Recent Updates</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentUpdates.map((update, index) => (
                update.isExternal ? (
                  <motion.a
                    key={index}
                    href={update.link}
                    className="card text-center group hover:border-emerald-500/30 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-emerald-400 text-sm font-semibold mb-2 bg-emerald-500/10 px-3 py-1 rounded-full inline-block">
                      {update.type}
                    </div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-emerald-300 transition-colors">
                      {update.title}
                    </h3>
                  </motion.a>
                ) : (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to={update.link}
                      className="card text-center group hover:border-emerald-500/30 transition-all duration-300 block"
                    >
                      <div className="text-emerald-400 text-sm font-semibold mb-2 bg-emerald-500/10 px-3 py-1 rounded-full inline-block">
                        {update.type}
                      </div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-emerald-300 transition-colors">
                        {update.title}
                      </h3>
                    </Link>
                  </motion.div>
                )
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Blog
