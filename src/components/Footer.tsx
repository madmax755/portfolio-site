import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart } from 'lucide-react'
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
    <footer className="bg-gray-950 border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold text-emerald-400">Max Kendall</h3>
            <p className="text-gray-100 leading-relaxed">
              Software Engineer passionate about machine learning, data engineering, and building robust systems.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="text-gray-100 hover:text-emerald-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-white">Connect</h4>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-emerald-400 transition-colors p-2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <link.icon size={24} />
                </motion.a>
              ))}
            </div>
            <div className="text-gray-100 text-sm space-y-1">
              <p>max@maxkendall.com</p>
              <p>07400 502233</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-800/50 mt-8 pt-8 text-center"
        >
          <p className="text-gray-400 text-sm flex items-center justify-center space-x-2">
            <span>© {currentYear} Max Kendall. Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="text-red-500" size={16} fill="currentColor" />
            </motion.div>
            <span>using React & TypeScript</span>
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
