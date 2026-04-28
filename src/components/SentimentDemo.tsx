import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Trash2, Loader2, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

interface SentimentResult {
  score: number
  label: string
  colour: string
}

function interpolateColour(colour1: number[], colour2: number[], factor: number): string {
  const result = colour1.slice()
  for (let i = 0; i < 3; i++) {
    result[i] = Math.round(result[i] + factor * (colour2[i] - colour1[i]))
  }
  return `rgb(${result[0]}, ${result[1]}, ${result[2]})`
}

function getSentimentColour(sentiment: number): string {
  if (sentiment < 0.5) {
    return interpolateColour([204, 117, 4], [207, 2, 12], 1 - sentiment * 2)
  } else {
    return interpolateColour([204, 117, 4], [34, 197, 94], (sentiment - 0.5) * 2)
  }
}

function interpretSentiment(sentiment: number): string {
  if (sentiment >= 0.75) return 'Very Positive'
  if (sentiment >= 0.6) return 'Positive'
  if (sentiment >= 0.4) return 'Neutral'
  if (sentiment >= 0.25) return 'Negative'
  return 'Very Negative'
}

const exampleTexts = [
  { text: "I absolutely love this product! It's the best thing I've ever bought.", label: "Very Positive" },
  { text: "The service was okay, nothing special but not bad either.", label: "Neutral" },
  { text: "Terrible experience. Would not recommend to anyone.", label: "Very Negative" },
  { text: "Great weather today, feeling happy and energetic!", label: "Positive" },
  { text: "This is disappointing, expected much better quality.", label: "Negative" },
]

function SentimentDemo() {
  const [text, setText] = useState('')
  const [sentiment, setSentiment] = useState<SentimentResult | null>(null)
  const [isAnalysing, setIsAnalysing] = useState(false)

  const analyseSentiment = useCallback(async (inputText: string) => {
    if (!inputText.trim()) {
      setSentiment({
        score: 0.5,
        label: 'Neutral',
        colour: getSentimentColour(0.5)
      })
      return
    }

    setIsAnalysing(true)

    try {
      const response = await fetch('https://maxkendall.com/sentiment_demo/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: inputText })
      })

      const data = await response.json()
      const score = data.score

      setSentiment({
        score,
        label: interpretSentiment(score),
        colour: getSentimentColour(score)
      })
    } catch (error) {
      console.error('Analysis error:', error)
      setSentiment(null)
    } finally {
      setIsAnalysing(false)
    }
  }, [])

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value
    setText(newText)
    analyseSentiment(newText)
  }

  const handleExampleClick = (exampleText: string) => {
    setText(exampleText)
    analyseSentiment(exampleText)
  }

  const clearText = () => {
    setText('')
    setSentiment({
      score: 0.5,
      label: 'Neutral',
      colour: getSentimentColour(0.5)
    })
  }

  return (
    <div className="pt-20 pb-16 min-h-screen">
      {/* Back button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-display font-bold text-xs uppercase tracking-[0.2em] text-cream/55 hover:text-hot transition-colors group"
        >
          <ArrowLeft size={20} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to home</span>
        </Link>
      </div>

      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 px-4"
      >
        <p className="tech-bracket font-display text-hot text-xs font-bold uppercase tracking-[0.35em] mb-4">GRU / API</p>
        <h1 className="font-display font-bold text-4xl md:text-5xl text-cream mb-4 uppercase tracking-tight">
          Analyse text <span className="text-electric">sentiment</span>
        </h1>
        <p className="text-cream/75 text-lg max-w-2xl mx-auto font-semibold border-l-4 border-electric pl-5 text-left">
          Enter any text and watch a neural network analyse its emotional tone.
          This model was built from scratch using a simple recurrent neural network (GRU).
          As you will be able to see, it&apos;s not very accurate, and is a good stepping stone to a transformer model.
        </p>
      </motion.header>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="card p-6 sm:p-8 border-2 border-hot/35 bg-panel-bright/20">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 flex flex-col gap-4">
              <div
                className="p-3 border-2 border-ink transition-all duration-300 shadow-[4px_4px_0_#030306]"
                style={{ backgroundColor: sentiment?.colour || 'rgb(204, 117, 4)' }}
              >
                <textarea
                  value={text}
                  onChange={handleTextChange}
                  placeholder="Enter your text here..."
                  className="w-full h-48 bg-panel text-cream border-2 border-cream/15 p-4 resize-none focus:outline-none focus:border-electric font-medium placeholder:text-cream/35"
                />
              </div>
              <motion.button
                type="button"
                onClick={clearText}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-panel border-2 border-cream/25 text-cream font-display font-bold text-xs uppercase tracking-[0.15em] hover:bg-hot hover:text-ink hover:border-cream transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Trash2 size={18} strokeWidth={2.25} />
                <span>Clear text</span>
              </motion.button>
            </div>

            <div className="w-full lg:w-72 bg-panel border-2 border-cream/15 p-6 flex flex-col shadow-[6px_6px_0_rgba(0,242,255,0.2)]">
              <h2 className="font-display font-bold text-sm uppercase tracking-[0.2em] text-electric mb-4">Analysis</h2>

              {isAnalysing ? (
                <div className="flex-1 flex items-center justify-center py-8">
                  <Loader2 className="w-8 h-8 text-electric animate-spin" strokeWidth={2.5} />
                </div>
              ) : sentiment ? (
                <div className="space-y-4">
                  <div className="text-center py-4 border-2 border-cream/10 bg-ink/50">
                    <div
                      className="font-display text-4xl font-bold mb-2 tabular-nums"
                      style={{ color: sentiment.colour }}
                    >
                      {(sentiment.score * 100).toFixed(0)}%
                    </div>
                    <div className="text-lg text-cream/90 font-semibold">{sentiment.label}</div>
                  </div>

                  <div className="relative h-5 bg-ink border-2 border-cream/20 overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 transition-all duration-300 border-r-2 border-cream/40"
                      style={{
                        width: `${sentiment.score * 100}%`,
                        backgroundColor: sentiment.colour,
                      }}
                    />
                    <motion.div
                      className="absolute top-1/2 w-3 h-3 bg-cream border-2 border-ink -translate-y-1/2"
                      animate={{ left: `calc(${sentiment.score * 100}% - 6px)` }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  </div>

                  <div className="flex justify-between text-[10px] font-display font-bold uppercase tracking-wider text-cream/45">
                    <span>Negative</span>
                    <span>Neutral</span>
                    <span>Positive</span>
                  </div>
                </div>
              ) : (
                <p className="text-cream/50 text-sm font-medium">Enter text to analyse sentiment</p>
              )}
            </div>
          </div>
        </div>

        {/* Example texts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <h3 className="font-display font-bold text-cream mb-4 flex items-center gap-2 uppercase tracking-wide text-sm">
            <Sparkles size={18} className="text-hot shrink-0" strokeWidth={2.25} />
            Try an example
          </h3>
          <div className="flex flex-wrap gap-3">
            {exampleTexts.map((example, index) => (
              <motion.button
                key={index}
                type="button"
                onClick={() => handleExampleClick(example.text)}
                className="px-4 py-2 bg-panel border-2 border-cream/20 text-cream/85 text-sm font-semibold hover:border-electric hover:text-electric transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {example.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Info section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-cream/50 text-sm font-medium"
        >
          <p>
            Built with a custom feedforward neural network in C++.
            <br />
            <Link
              to="/portfolio"
              className="font-display font-bold text-electric hover:text-hot transition-colors uppercase tracking-wide text-xs"
            >
              See more projects →
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default SentimentDemo

