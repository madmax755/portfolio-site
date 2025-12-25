import { motion } from 'framer-motion'
import { ChevronDown, Brain, MessageSquareText, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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

  const demos = [
    { 
      icon: Brain, 
      label: 'CNN Demo', 
      description: 'Handwritten digit recognition',
      to: '/cnn-demo' 
    },
    { 
      icon: MessageSquareText, 
      label: 'Sentiment Analysis', 
      description: 'Real-time text sentiment',
      to: '/sentiment-demo' 
    },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 sm:pt-0">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Profile Image */}
          <motion.div
            variants={itemVariants}
            className="relative inline-block"
          >
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 p-1 animate-glow">
              <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                <img src="/public/profile.jpg" alt="Max Kendall" className="w-full h-full object-cover rounded-full" />
              </div>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text text-transparent">
                Max Kendall
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 font-light">
              Software Engineer & Data Enthusiast
            </p>
          </motion.div>

          {/* Interactive Demos */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 py-8"
          >
            {demos.map((demo) => (
              <Link
                key={demo.label}
                to={demo.to}
                className="flex items-center space-x-4 bg-gray-800/60 backdrop-blur-sm border border-gray-600/50 rounded-xl px-5 py-4 hover:border-emerald-500/70 hover:bg-gray-800/80 transition-all group hover:scale-[1.03] hover:-translate-y-0.5"
              >
                <div className="p-2 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
                  <demo.icon className="text-emerald-400 group-hover:text-emerald-300 transition-colors" size={24} />
                </div>
                <div className="text-left">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-100 font-semibold">{demo.label}</span>
                    <ArrowRight size={14} className="text-gray-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <span className="text-gray-400 text-sm">{demo.description}</span>
                </div>
              </Link>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/portfolio" className="btn-primary w-full sm:w-auto text-center">
              View My Work
            </Link>
            <a
              href="mailto:max@maxkendall.com"
              className="btn-secondary w-full sm:w-auto text-center"
            >
              Get In Touch
            </a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            variants={itemVariants}
            className="pt-16"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block text-gray-300 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              <ChevronDown size={32} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
