import { useReducedMotion } from 'framer-motion'

const TICKER_ITEMS = [
  'Max Kendall',
  'Software engineer',
  'Rust & systems',
  'Machine learning',
  'Python & ML',
  'Maths nerd',
  'React & TypeScript',
  'Codex > Claude',
  'United Kingdom',
]

function segmentRow(suffix: string) {
  return TICKER_ITEMS.map((label, index) => (
    <span
      key={`${label}-${suffix}`}
      className={`inline-flex items-center shrink-0 font-display font-bold text-[11px] sm:text-xs uppercase tracking-[0.28em] ${
        index % 2 === 0 ? 'text-electric' : 'text-hot'
      }`}
    >
      <span className="text-cream/25 mx-5 sm:mx-8 select-none" aria-hidden>
        //
      </span>
      {label}
    </span>
  ))
}

function TickerTape() {
  const reduceMotion = useReducedMotion()

  return (
    <div
      className="relative z-40 mt-16 md:mt-[4.5rem] border-y-2 border-electric/35 bg-surface overflow-hidden py-2.5"
      aria-hidden
    >
      {reduceMotion ? (
        <div className="flex flex-wrap justify-center gap-x-1 gap-y-2 px-4 py-0.5">
          {segmentRow('static')}
        </div>
      ) : (
        <div className="ticker-track flex w-max">
          <div className="flex shrink-0 items-center">{segmentRow('a')}</div>
          <div className="flex shrink-0 items-center">{segmentRow('b')}</div>
        </div>
      )}
    </div>
  )
}

export default TickerTape
