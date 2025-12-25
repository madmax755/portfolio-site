import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Trash2, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'

// Extend window to include the Module
declare global {
  interface Window {
    Module: {
      onRuntimeInitialized?: () => void
      locateFile?: (path: string) => string
      loadModel?: (path: string) => boolean
      predict?: (input: { push_back: (n: number) => void, delete: () => void }) => { get: (i: number) => number, delete?: () => void }
      VectorFloat?: new () => { push_back: (n: number) => void, delete: () => void }
    }
  }
}

interface Prediction {
  digit: number
  probability: number
}

function CNNDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModelLoaded, setIsModelLoaded] = useState(false)
  const lastPos = useRef<{ x: number | null; y: number | null }>({ x: null, y: null })

  // Load WASM module
  useEffect(() => {
    // Configure Module before loading script - Emscripten needs locateFile to find .wasm and .data files
    window.Module = {
      locateFile: (path: string) => {
        // Tell Emscripten where to find the .wasm and .data files
        return `/wasm/${path}`
      },
      onRuntimeInitialized: () => {
        console.log('WASM module loaded')
        console.log('Module keys:', Object.keys(window.Module))
        console.log('loadModel exists:', !!window.Module.loadModel)
        console.log('VectorFloat exists:', !!window.Module.VectorFloat)
        console.log('predict exists:', !!window.Module.predict)
        
        try {
          const result = window.Module.loadModel?.('flatmodel_large.bin')
          console.log('loadModel result:', result)
          if (result) {
            console.log('Model loaded successfully')
            setIsModelLoaded(true)
            setIsLoading(false)
          } else {
            console.error('Failed to load model - loadModel returned false')
            setIsLoading(false)
          }
        } catch (e) {
          console.error('Error loading model:', e)
          setIsLoading(false)
        }
      }
    }

    const script = document.createElement('script')
    script.src = '/wasm/cnn_wasm.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  // Initialise canvas - runs when loading finishes and canvas is visible
  useEffect(() => {
    if (isLoading) return
    
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.imageSmoothingEnabled = false
    // Keep canvas transparent - don't fill with black
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }, [isLoading])

  const snapToGrid = (x: number, y: number) => {
    const gridSize = 10
    return {
      x: Math.floor(x / gridSize) * gridSize,
      y: Math.floor(y / gridSize) * gridSize
    }
  }

  const predictDigit = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || !isModelLoaded || !window.Module.VectorFloat || !window.Module.predict) return

    const tempCanvas = document.createElement('canvas')
    tempCanvas.width = 28
    tempCanvas.height = 28
    const tempCtx = tempCanvas.getContext('2d')
    if (!tempCtx) return

    tempCtx.drawImage(canvas, 0, 0, 28, 28)
    const imageData = tempCtx.getImageData(0, 0, 28, 28).data

    try {
      const inputVector = new window.Module.VectorFloat()
      for (let i = 0; i < imageData.length; i += 4) {
        const value = (imageData[i] + imageData[i + 1] + imageData[i + 2]) / (3 * 255.0)
        inputVector.push_back(value)
      }

      const result = window.Module.predict(inputVector)
      inputVector.delete()

      const newPredictions: Prediction[] = []
      for (let i = 0; i < 10; i++) {
        newPredictions.push({ digit: i, probability: result.get(i) })
      }

      if (result.delete) {
        result.delete()
      }

      setPredictions(newPredictions)
    } catch (error) {
      console.error('Prediction error:', error)
    }
  }, [isModelLoaded])

  const drawPixel = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const pos = snapToGrid(x, y)
    const { x: lastX, y: lastY } = lastPos.current

    if (lastX !== null && lastY !== null) {
      const dx = pos.x - lastX
      const dy = pos.y - lastY
      const distance = Math.sqrt(dx * dx + dy * dy)
      const steps = Math.max(Math.floor(distance / 10), 1)

      for (let i = 0; i < steps; i++) {
        const t = i / steps
        const ix = Math.round(lastX + dx * t)
        const iy = Math.round(lastY + dy * t)

        ctx.fillStyle = 'white'
        ctx.fillRect(ix, iy, 10, 10)

        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
        ctx.fillRect(ix - 10, iy, 10, 10)
        ctx.fillRect(ix + 10, iy, 10, 10)
        ctx.fillRect(ix, iy - 10, 10, 10)
        ctx.fillRect(ix, iy + 10, 10, 10)

        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
        ctx.fillRect(ix - 10, iy - 10, 10, 10)
        ctx.fillRect(ix + 10, iy - 10, 10, 10)
        ctx.fillRect(ix - 10, iy + 10, 10, 10)
        ctx.fillRect(ix + 10, iy + 10, 10, 10)
      }
    } else {
      ctx.fillStyle = 'white'
      ctx.fillRect(pos.x, pos.y, 10, 10)

      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
      ctx.fillRect(pos.x - 10, pos.y, 10, 10)
      ctx.fillRect(pos.x + 10, pos.y, 10, 10)
      ctx.fillRect(pos.x, pos.y - 10, 10, 10)
      ctx.fillRect(pos.x, pos.y + 10, 10, 10)

      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
      ctx.fillRect(pos.x - 10, pos.y - 10, 10, 10)
      ctx.fillRect(pos.x + 10, pos.y - 10, 10, 10)
      ctx.fillRect(pos.x - 10, pos.y + 10, 10, 10)
      ctx.fillRect(pos.x + 10, pos.y + 10, 10, 10)
    }

    lastPos.current = { x: pos.x, y: pos.y }
    predictDigit()
  }, [predictDigit])

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    if ('touches' in e) {
      const touch = e.touches[0]
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY
      }
    }

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    }
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    lastPos.current = { x: null, y: null }
    const { x, y } = getCanvasCoords(e)
    drawPixel(x, y)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const { x, y } = getCanvasCoords(e)
    drawPixel(x, y)
  }

  const handleMouseUp = () => {
    setIsDrawing(false)
    lastPos.current = { x: null, y: null }
    predictDigit()
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    setIsDrawing(true)
    lastPos.current = { x: null, y: null }
    const { x, y } = getCanvasCoords(e)
    drawPixel(x, y)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    if (!isDrawing) return
    const { x, y } = getCanvasCoords(e)
    drawPixel(x, y)
  }

  const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    setIsDrawing(false)
    lastPos.current = { x: null, y: null }
    predictDigit()
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    predictDigit()
  }

  return (
    <div className="pt-20 pb-16 min-h-screen">
      {/* Back button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 md:mb-8">
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
        className="text-center md:mb-12 px-4"
      >
        <h1 className="text-4xl py-4 md:py-0 md:text-5xl font-bold text-white mb-4">
          Draw a <span className="text-emerald-400">Digit</span>
        </h1>
        <p className="hidden md:flex text-gray-100 text-lg max-w-2xl mx-auto">
          Draw a digit (0-9) on the canvas below and watch the CNN classify it in real-time.
          This model was built from scratch in C++ and compiled to WebAssembly.
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
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="w-12 h-12 text-emerald-400 animate-spin mb-4" />
              <p className="text-gray-300">Loading neural network model...</p>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-stretch justify-center">
              {/* Canvas Section */}
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  width={280}
                  height={280}
                  className="border-2 border-gray-600 rounded-lg cursor-crosshair touch-none"
                  style={{ width: '280px', height: '280px' }}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                />
                <motion.button
                  onClick={clearCanvas}
                  className="absolute top-2 right-2 p-2 bg-gray-800/80 hover:bg-red-500/80 text-gray-300 hover:text-white rounded-lg transition-colors backdrop-blur-sm"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Clear Canvas"
                >
                  <Trash2 size={18} />
                </motion.button>
              </div>

              {/* Predictions Section */}
              <div className="w-[280px] h-[284px] bg-gray-800/50 rounded-lg p-4 border border-gray-700 flex flex-col">
                <h2 className="text-lg font-semibold text-white mb-2">Predictions</h2>
                <div className="flex-1 flex flex-col justify-between">
                  {predictions.length === 0 ? (
                    <p className="text-gray-400 text-sm">Draw a digit to see predictions</p>
                  ) : (
                    predictions.map((pred) => (
                      <div key={pred.digit} className="flex items-center gap-2">
                        <span className="w-5 text-gray-300 font-mono text-sm">{pred.digit}:</span>
                        <div className="flex-1 bg-gray-700 rounded-sm h-4 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-sm"
                            style={{ width: `${Math.max(pred.probability * 100, 1)}%` }}
                          />
                        </div>
                        <span className="w-12 text-right text-gray-300 font-mono text-xs">
                          {(pred.probability * 100).toFixed(1)}%
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Info section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center text-gray-400 text-sm"
        >
          <p>
            Built with a custom CNN library in C++, compiled to WebAssembly for browser execution.
            <br />
            <Link to="/blog/cnn-backpropagation" className="text-emerald-400 hover:text-emerald-300 transition-colors">
              Read about the maths behind this →
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default CNNDemo

