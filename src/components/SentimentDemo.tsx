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
          className="inline-flex items-center space-x-2 text-gray-300 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 px-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Analyse Text <span className="text-emerald-400">Sentiment</span>
        </h1>
        <p className="text-gray-100 text-lg max-w-2xl mx-auto">
          Enter any text and watch a neural network analyse its emotional tone.
          This model was built from scratch using a simple recurrent neural network (GRU).
          As you will be able to see, it's not very accurate, and is a good stepping stone to a transformer model.
        </p>
      </motion.header>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="card p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Input Section */}
            <div className="flex-1 flex flex-col space-y-4">
              <div
                className="rounded-lg p-4 transition-all duration-300"
                style={{ backgroundColor: sentiment?.colour || 'rgb(204, 117, 4)' }}
              >
                <textarea
                  value={text}
                  onChange={handleTextChange}
                  placeholder="Enter your text here..."
                  className="w-full h-48 bg-gray-800 text-white rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                />
              </div>
              <motion.button
                onClick={clearText}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Trash2 size={18} />
                <span>Clear Text</span>
              </motion.button>
            </div>

            {/* Results Section */}
            <div className="w-full lg:w-72 bg-gray-800/50 rounded-lg p-6 border border-gray-700 flex flex-col">
              <h2 className="text-xl font-semibold text-white mb-4">Analysis</h2>
              
              {isAnalysing ? (
                <div className="flex-1 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
                </div>
              ) : sentiment ? (
                <div className="space-y-4">
                  <div className="text-center py-4">
                    <div
                      className="text-4xl font-bold mb-2"
                      style={{ color: sentiment.colour }}
                    >
                      {(sentiment.score * 100).toFixed(0)}%
                    </div>
                    <div className="text-xl text-gray-200">{sentiment.label}</div>
                  </div>

                  {/* Sentiment gauge */}
                  <div className="relative h-4 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full transition-all duration-300"
                      style={{
                        width: `${sentiment.score * 100}%`,
                        background: `linear-gradient(to right, #cf020c, #cc7504, #22c55e)`
                      }}
                    />
                    <motion.div
                      className="absolute top-1/2 w-3 h-3 bg-white rounded-full shadow-lg -translate-y-1/2"
                      animate={{ left: `calc(${sentiment.score * 100}% - 6px)` }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  </div>

                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Negative</span>
                    <span>Neutral</span>
                    <span>Positive</span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-400 text-sm">Enter text to analyse sentiment</p>
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
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Sparkles size={18} className="text-emerald-400" />
            Try an example
          </h3>
          <div className="flex flex-wrap gap-3">
            {exampleTexts.map((example, index) => (
              <motion.button
                key={index}
                onClick={() => handleExampleClick(example.text)}
                className="px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 hover:border-emerald-500/50 text-gray-300 rounded-lg text-sm transition-all"
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
          className="mt-8 text-center text-gray-400 text-sm"
        >
          <p>
            Built with a custom feedforward neural network in C++.
            <br />
            <Link to="/portfolio" className="text-emerald-400 hover:text-emerald-300 transition-colors">
              See more projects →
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default SentimentDemo

