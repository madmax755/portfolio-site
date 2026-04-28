import { motion } from 'framer-motion'
import { Calendar, ExternalLink, Github, MapPin, Mail, Phone, Play } from 'lucide-react'
import { Link } from 'react-router-dom'

function Portfolio() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
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

  const experiences = [
    {
      period: 'Jul 2025 – Sep 2025',
      title: 'Software Engineer — Techex',
      description: 'Worked on performance optimisation and streaming infrastructure at Techex.',
      achievements: [
        'Refactored React components to avoid unmount/remount cycles, optimised MobX usage, and stabilised the UI',
        'Implemented process-specific CPU usage tracking and real-time charts for module statistics',
        'Developed WHIP/WebRTC Rust output module to parse incoming PES packets and stream RTP packets, debugging with Wireshark',
        'Automated encoder video quality testing (VMAF), saving over a week of manual effort per test round',
      ],
    },
    {
      period: 'Feb 2025 – Ongoing',
      title: 'Full-stack Car Inventory & Invoicing System',
      description:
        'Developed, sold, and provided support for a full-stack vehicle inventory & invoicing platform with a Python FastAPI backend and a custom React frontend.',
      achievements: [
        'Automated data ingestion by building a Selenium-based web scraper with scheduled cron jobs to update car listings',
        'Implemented invoicing workflows including PDF generation and digital signing, enabling secure payment tracking and client-ready documentation',
      ],
    },
    {
      period: 'Aug 2024 – Ongoing',
      title: 'Self-hosted Server',
      link: 'https://maxkendall.com',
      description: 'Hosting multiple web servers, a DNS server, a file server, a GitHub runner, and various other services.',
      achievements: [
        'Set up Nginx reverse proxy, Cloudflare DDNS via API, and CI/CD with GitHub Actions',
        'Implemented SSH access with keys + fail2ban for security',
        'Automated off-site snapshot backups for resilience',
        'Configured Prometheus + Grafana for remote alerts',
      ],
    },
    {
      period: 'Nov 2024 – Dec 2024',
      title: 'Convolutional Neural Network (from scratch in C++)',
      link: 'https://github.com/madmax755/cnn-from-scratch',
      demo: '/cnn-demo',
      description: 'Built a CNN library from scratch in C++ for image classification.',
      achievements: [
        'Implemented convolutional, pooling, and dense layers',
        'Custom Tensor3D class for efficient data handling',
        'Custom optimisers (SGD, Momentum, Adam, AdamW with gradient clipping)',
        'Model serialisation (save/load)',
        'Achieved 99.4% accuracy on MNIST with augmentation',
      ],
    },
    {
      period: 'Sep 2024 – Oct 2024',
      title: 'Feedforward Neural Network (from scratch in C++)',
      link: 'https://github.com/madmax755/mlp-from-scratch',
      demo: '/sentiment-demo',
      description: 'Implemented a classic MLP neural network entirely in C++ without ML libraries.',
      achievements: [
        'Highly configurable network topologies with multiple activation functions (ReLU, Sigmoid, Softmax)',
        'Optimisers: SGD, Momentum, NAG, Adam, AdamW',
        'Multi-threaded training support',
        'Model persistence and evaluation metrics',
        'Reached 91% accuracy on MNIST digit classification',
      ],
    },
  ]

  return (
    <div className="pt-16">
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto relative">
          <div
            className="absolute -top-4 right-4 md:right-12 w-40 h-24 bg-hot/35 border-2 border-cream/30 rotate-[-8deg] pointer-events-none hidden sm:block"
            aria-hidden
          />
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48 }}
            className="relative z-10 max-w-3xl"
          >
            <p className="tech-bracket font-display font-bold text-hot uppercase tracking-[0.35em] text-xs mb-5">Portfolio</p>
            <h1 className="font-display font-bold text-cream text-4xl md:text-6xl lg:text-7xl leading-[0.95] mb-8 uppercase tracking-tight">
              Experience
              <br />
              <span className="text-electric glitch-text">&amp; projects</span>
            </h1>
            <div className="relative pl-5 border-l-4 border-electric bg-panel/50 border-y border-r border-cream/10 py-4 pr-4">
              <p className="text-lg md:text-xl text-cream/80 font-semibold max-w-2xl">
                Software engineering, machine learning, and systems — the work I am most excited to talk about.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-20 md:pb-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto relative">
          <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-electric/30 hidden md:block" aria-hidden />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-10 md:space-y-12 md:pl-10"
          >
            {experiences.map((exp, index) => (
              <motion.article
                key={index}
                variants={itemVariants}
                className={`card relative overflow-visible ${
                  index % 2 === 0
                    ? 'md:-rotate-[0.35deg] md:translate-x-1'
                    : 'md:rotate-[0.35deg] md:-translate-x-1'
                } ${index % 2 === 0 ? 'border-t-4 border-t-electric' : 'border-t-4 border-t-hot'}`}
              >
                <div
                  className="absolute -top-3 -right-3 w-16 h-8 bg-electric/90 border-2 border-ink z-10 rotate-6 pointer-events-none hidden sm:block"
                  aria-hidden
                />
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <Calendar className="text-electric shrink-0" size={20} strokeWidth={2.25} />
                    <span className="font-display font-bold text-[11px] uppercase tracking-[0.2em] text-ink bg-electric px-3 py-1.5 border-2 border-ink">
                      {exp.period}
                    </span>
                  </div>
                  {(exp.link || exp.demo) && (
                    <div className="flex flex-wrap gap-2">
                      {exp.demo && (
                        <Link
                          to={exp.demo}
                          className="inline-flex items-center gap-1.5 font-display text-[11px] font-bold uppercase tracking-[0.15em] text-cream border-2 border-cream/25 px-3 py-1.5 hover:border-electric hover:text-electric hover:bg-electric/10 transition-colors"
                          title="Try Demo"
                        >
                          <Play size={14} fill="currentColor" />
                          Demo
                        </Link>
                      )}
                      {exp.link && exp.link.includes('github') && (
                        <motion.a
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-display text-[11px] font-bold uppercase tracking-[0.15em] text-cream border-2 border-cream/25 px-3 py-1.5 hover:border-electric hover:text-electric transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          title="View Source"
                        >
                          <Github size={14} />
                          Code
                        </motion.a>
                      )}
                      {exp.link && !exp.link.includes('github') && (
                        <motion.a
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-display text-[11px] font-bold uppercase tracking-[0.15em] text-cream border-2 border-cream/25 px-3 py-1.5 hover:border-electric hover:text-electric transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <ExternalLink size={14} />
                          Visit
                        </motion.a>
                      )}
                    </div>
                  )}
                </div>

                <h2 className="font-display font-bold text-xl md:text-2xl text-cream mb-3 leading-snug uppercase tracking-tight">
                  {exp.title}
                </h2>

                <p className="text-cream/75 mb-5 leading-relaxed font-semibold">{exp.description}</p>

                <ul className="space-y-3">
                  {exp.achievements.map((achievement, i) => (
                    <motion.li
                      key={i}
                      className="text-cream/85 flex gap-3 items-start font-medium"
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * i }}
                    >
                      <span className="mt-2 w-2 h-2 bg-hot shrink-0 border border-cream/30" aria-hidden />
                      <span>{achievement}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-surface border-y-2 border-electric/25 relative overflow-hidden">
        <div
          className="absolute top-10 right-[8%] w-48 h-48 border-2 border-hot/35 rotate-12 pointer-events-none"
          aria-hidden
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-cream text-3xl md:text-5xl mb-4 uppercase tracking-tight">
              Let&apos;s build something
            </h2>
            <p className="text-lg text-cream/70 mb-14 max-w-2xl mx-auto font-semibold">
              I am always interested in new opportunities and sharp problems. If that sounds like your team, get in touch.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
              <motion.div
                className="card border-l-[8px] border-l-hot md:translate-y-2 bg-panel-bright/50"
                whileHover={{ y: -2 }}
              >
                <Mail className="text-hot mb-4" size={28} strokeWidth={2.25} />
                <h3 className="font-display font-bold text-cream uppercase text-xs tracking-[0.2em] mb-2">Email</h3>
                <p className="text-cream/75 font-semibold">max@maxkendall.com</p>
              </motion.div>

              <motion.div className="card border-l-[8px] border-l-electric md:-translate-y-2" whileHover={{ y: -2 }}>
                <Phone className="text-electric mb-4" size={28} strokeWidth={2.25} />
                <h3 className="font-display font-bold text-cream uppercase text-xs tracking-[0.2em] mb-2">Phone</h3>
                <p className="text-cream/75 font-semibold">07400 502233</p>
              </motion.div>

              <motion.div
                className="card border-l-[8px] border-l-hot md:translate-y-2 bg-panel-bright/50"
                whileHover={{ y: -2 }}
              >
                <MapPin className="text-hot mb-4" size={28} strokeWidth={2.25} />
                <h3 className="font-display font-bold text-cream uppercase text-xs tracking-[0.2em] mb-2">Location</h3>
                <p className="text-cream/75 font-semibold">United Kingdom</p>
              </motion.div>
            </div>

            <motion.a
              href="mailto:max@maxkendall.com"
              className="btn-primary inline-block"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Email me
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Portfolio
