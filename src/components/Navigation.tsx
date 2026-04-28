import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Github, Mail, Linkedin } from 'lucide-react'

function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/blog', label: 'Blog' },
  ]

  const socialLinks = [
    { icon: Mail, href: 'mailto:max@maxkendall.com', label: 'Email' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/max-kendall/', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/madmax755', label: 'GitHub' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-ink/92 border-b-2 border-electric/40 backdrop-blur-[2px]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-[4.5rem]">
          <motion.div className="flex-shrink-0 flex items-center gap-3" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/"
              className="flex items-center gap-2 group"
            >
              <span className="font-display font-bold text-sm sm:text-base text-ink bg-electric px-2.5 py-1 border-2 border-cream tracking-[0.2em] uppercase group-hover:bg-hot group-hover:text-cream transition-colors">
                MK
              </span>
              <span className="hidden sm:inline font-display text-[10px] font-bold text-hot uppercase tracking-[0.25em]">
                v.2026
              </span>
            </Link>
          </motion.div>

          <div className="hidden md:block">
            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link px-3 py-2 text-[11px] font-bold uppercase ${
                    location.pathname === item.path ? 'text-hot' : ''
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-0.5 border-l-2 border-hot/50 pl-4 ml-2">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/45 hover:text-electric p-2 border-2 border-transparent hover:border-electric/60 transition-colors"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.94 }}
                aria-label={link.label}
              >
                <link.icon size={20} strokeWidth={2.25} />
              </motion.a>
            ))}
          </div>

          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="text-cream hover:text-hot p-2 border-2 border-cream/25 hover:border-hot transition-colors"
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} strokeWidth={2.5} /> : <Menu size={22} strokeWidth={2.5} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-panel border-t-2 border-electric/30"
          >
            <div className="px-2 pt-2 pb-2 space-y-0">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-3 font-display font-bold text-xs uppercase tracking-[0.15em] border-l-4 ${
                    location.pathname === item.path
                      ? 'text-ink bg-electric border-l-hot'
                      : 'text-cream/90 border-l-transparent hover:border-l-electric hover:bg-panel-bright/50'
                  } transition-colors`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="flex justify-center gap-4 px-2 pb-4 pt-2 border-t-2 border-cream/10">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/50 hover:text-electric p-2 border-2 border-cream/15"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  aria-label={link.label}
                >
                  <link.icon size={22} strokeWidth={2.25} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navigation
