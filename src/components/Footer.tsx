import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Mail, href: 'mailto:max@maxkendall.com', label: 'Email' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/max-kendall/', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/madmax755', label: 'GitHub' },
  ]

  const footerLinks = [
    { name: 'Portfolio', to: '/portfolio' },
    { name: 'Blog', to: '/blog' },
    { name: 'CNN Demo', to: '/cnn-demo' },
    { name: 'Sentiment Demo', to: '/sentiment-demo' },
  ]

  return (
    <footer className="bg-ink border-t-2 border-hot/40 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr_1fr] gap-8 md:gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <h3 className="font-display font-bold text-2xl text-electric uppercase tracking-[0.12em] glitch-text">Max Kendall</h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.05 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            <h4 className="font-display font-bold text-cream uppercase tracking-[0.35em] text-xs">Sitemap</h4>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="text-cream/70 hover:text-electric font-semibold transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-2 h-0.5 bg-hot opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            <h4 className="font-display font-bold text-cream uppercase tracking-[0.35em] text-xs">Connect</h4>
            <div className="flex gap-2">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/45 hover:text-electric p-2.5 border-2 border-cream/15 hover:border-electric transition-colors"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.label}
                >
                  <link.icon size={22} strokeWidth={2.25} />
                </motion.a>
              ))}
            </div>
            <div className="text-cream/55 text-sm space-y-1 font-semibold">
              <p>max@maxkendall.com</p>
              <p>07400 502233</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.42, delay: 0.12 }}
          viewport={{ once: true }}
          className="border-t-2 border-cream/10 mt-8 pt-5 text-cream/40 text-sm font-semibold text-center"
        >
          <span>© {currentYear} Max Kendall</span>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
