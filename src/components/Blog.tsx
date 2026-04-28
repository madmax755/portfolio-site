import { motion } from 'framer-motion'
import { Calendar, ArrowRight, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'

function Blog() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.09,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.42,
      },
    },
  }

  const blogPosts = [
    {
      title: 'Backpropagation for Convolutional Neural Networks',
      date: 'Dec 2024',
      description:
        'A deep dive into the mathematics and implementation of backpropagation in CNNs, including gradient computation for convolutional layers.',
      slug: 'cnn-backpropagation',
      tags: ['Machine Learning', 'CNN', 'Mathematics'],
    },
  ]

  const recentUpdates = [
    { title: 'CNN Demo', link: '/cnn-demo', type: 'Project', isExternal: false },
    { title: 'Backpropagation for CNNs', link: '/blog/cnn-backpropagation', type: 'Article', isExternal: false },
  ]

  return (
    <div className="pt-16">
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto relative">
          <div
            className="absolute -top-2 left-4 md:left-12 w-28 h-28 border-2 border-electric/50 rotate-[10deg] pointer-events-none hidden md:block bg-electric/10"
            aria-hidden
          />
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48 }}
            className="relative z-10 text-center md:text-left max-w-3xl mx-auto md:mx-0"
          >
            <p className="tech-bracket font-display font-bold text-electric uppercase tracking-[0.35em] text-xs mb-5">Writing</p>
            <h1 className="font-display font-bold text-cream text-4xl md:text-6xl lg:text-7xl leading-[0.95] mb-8 uppercase tracking-tight">
              Blog
              <span className="text-hot"> / </span>
              articles
            </h1>
            <div className="md:max-w-2xl border-l-4 border-hot pl-5 py-2 bg-panel/40 border-y border-r border-cream/10">
              <p className="text-lg md:text-xl text-cream/75 font-semibold">
                Notes on engineering, ML, and whatever I have been obsessing over lately.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {blogPosts.map((post, index) => (
              <motion.div key={index} variants={itemVariants} className={index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="card group block h-full border-t-[8px] border-t-hot hover:border-t-electric bg-panel-bright/30"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-cream/50 font-semibold text-sm">
                      <Calendar size={16} strokeWidth={2.25} />
                      <span>{post.date}</span>
                    </div>
                    <ArrowRight
                      size={20}
                      strokeWidth={2.5}
                      className="text-cream/30 group-hover:text-electric group-hover:translate-x-1 transition-all"
                    />
                  </div>

                  <h2 className="font-display font-bold text-xl text-cream mb-3 group-hover:text-hot transition-colors leading-snug uppercase tracking-tight">
                    {post.title}
                  </h2>

                  <p className="text-cream/70 mb-6 leading-relaxed font-medium">{post.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-[10px] font-display font-bold uppercase tracking-[0.15em] text-ink bg-electric px-2.5 py-1 border-2 border-ink"
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

      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-surface border-t-2 border-electric/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-cream text-2xl md:text-4xl mb-12 flex flex-wrap items-center justify-center gap-4 uppercase tracking-tight">
              <BookOpen className="text-electric shrink-0" size={36} strokeWidth={2.25} />
              <span>Recent updates</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentUpdates.map((update, index) =>
                update.isExternal ? (
                  <motion.a
                    key={index}
                    href={update.link}
                    className="card text-center border-l-[8px] border-l-electric group bg-panel-bright/20"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-hot mb-3 inline-block border-2 border-hot px-2 py-1">
                      {update.type}
                    </div>
                    <h3 className="font-display font-bold text-lg text-cream group-hover:text-electric transition-colors uppercase tracking-wide">
                      {update.title}
                    </h3>
                  </motion.a>
                ) : (
                  <motion.div key={index} whileHover={{ y: -3 }} whileTap={{ scale: 0.99 }}>
                    <Link
                      to={update.link}
                      className="card text-center border-l-[8px] border-l-electric group block h-full bg-panel-bright/20"
                    >
                      <div className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-hot mb-3 inline-block border-2 border-hot px-2 py-1">
                        {update.type}
                      </div>
                      <h3 className="font-display font-bold text-lg text-cream group-hover:text-electric transition-colors uppercase tracking-wide">
                        {update.title}
                      </h3>
                    </Link>
                  </motion.div>
                ),
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Blog
