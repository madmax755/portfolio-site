import { motion } from 'framer-motion'
import { Calendar, ExternalLink, Github, MapPin, Mail, Phone } from 'lucide-react'

function Portfolio() {
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

  const experiences = [
    {
      period: 'Jul 2025 – Sep 2025',
      title: 'Software Engineer — Techex',
      description: 'Worked on performance optimisation and streaming infrastructure at Techex.',
      achievements: [
        'Refactored React components to avoid unmount/remount cycles, optimised MobX usage, and stabilised the UI',
        'Implemented process-specific CPU usage tracking and real-time charts for module statistics',
        'Developed WHIP/WebRTC Rust output module to parse incoming PES packets and stream RTP packets, debugging with Wireshark',
        'Automated encoder video quality testing (VMAF), saving over a week of manual effort per test round'
      ]
    },
    {
      period: 'Feb 2025 – May 2025',
      title: 'Full-stack Car Inventory & Invoicing System',
      link: '#',
      description: 'Built a complete vehicle inventory and invoicing system.',
      achievements: [
        'FastAPI backend with SQLite database',
        'Custom JS/HTML/CSS frontend with responsive layout',
        'Automated data ingestion using a Selenium scraper with cron scheduling',
        'PDF invoice generation with digital signing for secure payment tracking'
      ]
    },
    {
      period: 'Aug 2024 – Ongoing',
      title: 'Self-hosted Server',
      link: 'https://maxkendall.com',
      description: 'Self-hosting multiple services and applications on a Raspberry Pi Zero W.',
      achievements: [
        'Hosting portfolio, Minesweeper, and personal todo-list web apps',
        'Configured Nginx reverse proxy, Cloudflare DDNS via API, and CI/CD with GitHub Actions',
        'Implemented SSH access with keys + fail2ban for security',
        'Automated off-site snapshot backups for resilience',
        'Monitoring with Prometheus + Grafana for remote alerts'
      ]
    },
    {
      period: 'Nov 2024 – Dec 2024',
      title: 'Convolutional Neural Network (from scratch in C++)',
      link: 'https://github.com/madmax755/cnn-from-scratch',
      description: 'Built a CNN library from scratch in C++ for image classification.',
      achievements: [
        'Implemented convolutional, pooling, and dense layers',
        'Custom Tensor3D class for efficient data handling',
        'Custom optimisers (SGD, Momentum, Adam, AdamW with gradient clipping)',
        'Model serialisation (save/load)'
      ],
      results: 'Achieved 99.4% accuracy on MNIST with augmentation'
    },
    {
      period: 'Sep 2024 – Oct 2024',
      title: 'Feedforward Neural Network (from scratch in C++)',
      link: 'https://github.com/madmax755/mlp-from-scratch',
      description: 'Implemented a classic MLP neural network entirely in C++ without ML libraries.',
      achievements: [
        'Highly configurable network topologies with multiple activation functions (ReLU, Sigmoid, Softmax)',
        'Optimisers: SGD, Momentum, NAG, Adam, AdamW',
        'Multi-threaded training support',
        'Model persistence and evaluation metrics'
      ],
      results: 'Reached 91% accuracy on MNIST digit classification'
    }
  ]

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-8 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
                Experience & Projects
              </span>
            </h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              A journey through software engineering, machine learning, and system architecture
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="card hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div className="flex items-center space-x-3 mb-2 md:mb-0">
                    <Calendar className="text-emerald-400 flex-shrink-0" size={20} />
                    <span className="text-emerald-400 font-semibold text-sm bg-emerald-500/10 px-3 py-1 rounded-full">
                      {exp.period}
                    </span>
                  </div>
                  {exp.link && (
                    <div className="flex space-x-2">
                      {exp.link.includes('github') ? (
                        <motion.a
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-emerald-400 transition-colors p-2"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Github size={20} />
                        </motion.a>
                      ) : (
                        <motion.a
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-emerald-400 transition-colors p-2"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ExternalLink size={20} />
                        </motion.a>
                      )}
                    </div>
                  )}
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                  {exp.title}
                </h3>

                <p className="text-gray-100 mb-4 leading-relaxed">
                  {exp.description}
                </p>

                <ul className="space-y-2 mb-4">
                  {exp.achievements.map((achievement, i) => (
                    <motion.li
                      key={i}
                      className="text-gray-100 flex items-start space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                    >
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 flex-shrink-0" />
                      <span>{achievement}</span>
                    </motion.li>
                  ))}
                </ul>

                {exp.results && (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                    <p className="text-emerald-300 font-semibold">
                      <span className="text-emerald-400">Results:</span> {exp.results}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Let's Work Together
            </h2>
            <p className="text-xl text-gray-100 mb-12 max-w-2xl mx-auto">
              I'm always interested in new opportunities and exciting projects.
              Let's discuss how we can collaborate.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <motion.div
                className="card text-center"
                whileHover={{ scale: 1.05 }}
              >
                <Mail className="text-emerald-400 mx-auto mb-4" size={32} />
                <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
                <p className="text-gray-100">max@maxkendall.com</p>
              </motion.div>

              <motion.div
                className="card text-center"
                whileHover={{ scale: 1.05 }}
              >
                <Phone className="text-emerald-400 mx-auto mb-4" size={32} />
                <h3 className="text-lg font-semibold text-white mb-2">Phone</h3>
                <p className="text-gray-100">07400 502233</p>
              </motion.div>

              <motion.div
                className="card text-center"
                whileHover={{ scale: 1.05 }}
              >
                <MapPin className="text-emerald-400 mx-auto mb-4" size={32} />
                <h3 className="text-lg font-semibold text-white mb-2">Location</h3>
                <p className="text-gray-100">United Kingdom</p>
              </motion.div>
            </div>

            <motion.a
              href="mailto:max@maxkendall.com"
              className="btn-primary inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Portfolio
