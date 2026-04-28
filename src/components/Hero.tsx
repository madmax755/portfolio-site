import { motion } from 'framer-motion'
import { ChevronDown, Brain, MessageSquareText, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.12,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.48,
      },
    },
  }

  const demos = [
    {
      icon: Brain,
      label: 'CNN Demo',
      description: 'Handwritten digit recognition',
      to: '/cnn-demo',
      stripe: 'border-l-[8px] border-l-electric bg-electric/5',
    },
    {
      icon: MessageSquareText,
      label: 'Sentiment Analysis',
      description: 'Real-time text sentiment',
      to: '/sentiment-demo',
      stripe: 'border-l-[8px] border-l-hot bg-hot/5',
    },
  ]

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-10 md:pt-14 pb-20">
      <p
        className="pointer-events-none absolute left-1/2 top-28 -translate-x-1/2 lg:left-[8%] lg:translate-x-0 font-display font-bold text-[clamp(4rem,18vw,14rem)] leading-none text-panel-bright/40 uppercase tracking-tighter select-none"
        aria-hidden
      >
        SYS
      </p>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center"
        >
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <motion.div variants={itemVariants} className="relative inline-block lg:block">
              <div className="relative z-20 inline-block">
                <div className="w-32 h-32 sm:w-36 sm:h-36 mx-auto lg:mx-0 border-2 border-electric bg-panel p-1 shadow-[6px_6px_0_var(--color-hot)] rotate-[-4deg] hover:rotate-0 transition-transform duration-300">
                  <img
                    src="/profile.webp"
                    alt="Max Kendall"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div
                className="hidden lg:block absolute -bottom-2 left-[5.5rem] w-56 h-16 bg-hot/80 border-2 border-cream z-10 rotate-[3deg]"
                aria-hidden
              />
              <div
                className="hidden lg:block absolute top-1/2 -right-4 w-24 h-2 bg-electric z-30 rotate-90"
                aria-hidden
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-5 relative z-30">
              <p className="tech-bracket font-display text-hot uppercase tracking-[0.35em] text-xs font-bold">
                Hello — I am
              </p>
              <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[4.5rem] xl:text-[5.25rem] leading-[0.92] tracking-tight uppercase glitch-text">
                <span className="text-cream">Max</span>
                <br />
                <span className="text-hot">Kendall</span>
              </h1>
              <div className="relative max-w-xl mx-auto lg:mx-0">
                <div className="absolute -left-1 top-0 bottom-0 w-1 bg-hot" aria-hidden />
                <p className="font-sans text-lg sm:text-xl md:text-2xl font-semibold text-cream/90 pl-5 py-2 border-2 border-cream/10 bg-panel/60">
                  Mathematician, software engineer, ML &amp; robotics enthusiast.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2"
            >
              <Link to="/portfolio" className="btn-primary w-full sm:w-auto text-center">
                View work
              </Link>
              <a href="mailto:max@maxkendall.com" className="btn-secondary w-full sm:w-auto text-center">
                Say hello
              </a>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative lg:min-h-[440px] flex flex-col justify-center">
            <motion.div
              variants={itemVariants}
              className="absolute -top-6 right-2 lg:right-0 z-0 font-display text-[10px] font-bold uppercase tracking-[0.3em] text-electric/80 text-right hidden sm:block"
              aria-hidden
            >
              [ LIVE_DEMOS ]
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="relative z-10 bg-panel-bright border-2 border-cream/20 p-6 sm:p-8 shadow-[10px_10px_0_rgba(255,15,127,0.35)] lg:translate-x-6 lg:-translate-y-8"
            >
              <div className="flex items-end justify-between gap-4 mb-6 border-b-2 border-electric/40 pb-4">
                <p className="font-display font-bold text-electric uppercase tracking-[0.25em] text-xs">
                  Live demos
                </p>
                <span className="font-display text-[10px] font-bold text-cream/40 uppercase tracking-widest">01–02</span>
              </div>
              <div className="flex flex-col gap-4">
                {demos.map((demo) => (
                  <Link
                    key={demo.label}
                    to={demo.to}
                    className={`group flex items-start gap-4 border-2 border-cream/12 bg-panel p-4 ${demo.stripe} shadow-[5px_5px_0_#030306] transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_#030306] hover:border-electric/50`}
                  >
                    <div className="shrink-0 p-2.5 border-2 border-cream/20 bg-ink text-cream group-hover:bg-hot group-hover:text-ink group-hover:border-cream transition-colors">
                      <demo.icon size={22} strokeWidth={2.25} />
                    </div>
                    <div className="text-left min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-display font-bold text-cream uppercase tracking-[0.12em] text-sm">
                          {demo.label}
                        </span>
                        <ArrowRight
                          size={16}
                          className="text-cream/40 group-hover:text-electric group-hover:translate-x-1 transition-all shrink-0"
                          strokeWidth={2.5}
                        />
                      </div>
                      <span className="text-cream/60 text-sm font-medium block mt-1">{demo.description}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="hidden lg:block absolute -bottom-10 -left-8 w-[92%] h-20 bg-electric/25 border-2 border-ink z-0 rotate-[-5deg]"
              aria-hidden
            />
            <motion.div
              variants={itemVariants}
              className="hidden lg:block absolute top-1/2 -translate-y-1/2 -right-3 w-3 h-32 bg-hot/80 border-y-2 border-ink z-20"
              aria-hidden
            />
          </div>

          <motion.div variants={itemVariants} className="col-span-full flex justify-center pt-8 lg:pt-2">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-cream/35 hover:text-hot transition-colors cursor-default"
              aria-hidden
            >
              <ChevronDown size={36} strokeWidth={2.5} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
