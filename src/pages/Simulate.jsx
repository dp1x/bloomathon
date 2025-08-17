import { useState, useEffect, useRef } from 'react'

const TRIGRAMS = [
  'XQF', 'BRK', 'LMP', 'ZJD', 'CTY', 'VNW', 'HSO', 'GRA', 'PTE', 'MKL'
]

function getRandomTrigram() {
  return TRIGRAMS[Math.floor(Math.random() * TRIGRAMS.length)]
}

export default function Simulate() {
  const [phase, setPhase] = useState('start') // start, show, distract, recall, result
  const [trigram, setTrigram] = useState('')
  const [userInput, setUserInput] = useState('')
  const [result, setResult] = useState(null)
  const [countdown, setCountdown] = useState(6)
  const [score, setScore] = useState(0)
  const [totalAttempts, setTotalAttempts] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (phase === 'show') {
      const newTrigram = getRandomTrigram()
      setTrigram(newTrigram)
      setUserInput('')
      setResult(null)
      setTimeout(() => setPhase('distract'), 2000)
    }
    
    if (phase === 'distract') {
      setCountdown(6)
      intervalRef.current = setInterval(() => {
        setCountdown(c => {
          if (c <= 1) {
            clearInterval(intervalRef.current)
            setPhase('recall')
            return 0
          }
          return c - 1
        })
      }, 1000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [phase])

  const handleStart = () => {
    setPhase('show')
    setScore(0)
    setTotalAttempts(0)
  }

  const handleInputChange = (e) => {
    setUserInput(e.target.value.toUpperCase())
  }

  const handleSubmit = () => {
    const isCorrect = userInput === trigram
    setResult(isCorrect)
    if (isCorrect) setScore(score + 1)
    setTotalAttempts(totalAttempts + 1)
    setPhase('result')
  }

  const handleNext = () => setPhase('show')

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 py-24">
      <div className="max-w-2xl w-full text-center">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl font-bold text-white mb-6">
            Test Your Working Memory Under Social Media Distraction
          </h1>
          <p className="text-xl text-gray-300 italic">
            See how constant notifications make it harder to remember.
          </p>
        </div>

        {/* Start Phase */}
        {phase === 'start' && (
          <div className="bg-slate-800/50 p-16 rounded-lg border border-amber-800/30">
            <h2 className="text-3xl text-white mb-8">
              Ready to Test Your Memory?
            </h2>
            <p className="text-lg text-gray-300 mb-10">
              You'll see a trigram to memorize, then face distractions, and finally try to recall what you saw.
            </p>
            <button
              onClick={handleStart}
              className="text-white px-16 py-5 rounded-xl text-xl font-bold transition-all duration-300 shadow-2xl transform hover:scale-105"
              style={{
                backgroundColor: '#047857',
                border: '2px solid #10b981',
                boxShadow: '0 25px 50px -12px rgba(16, 185, 129, 0.5)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#065f46'
                e.target.style.boxShadow = '0 25px 50px -12px rgba(5, 95, 70, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#047857'
                e.target.style.boxShadow = '0 25px 50px -12px rgba(16, 185, 129, 0.5)'
              }}
            >
              Start Test
            </button>
          </div>
        )}

        {/* Score Display - Only show after game starts */}
        {phase !== 'start' && (
          <div className="mb-12 flex justify-center space-x-8 text-white">
            <div className="bg-slate-800/50 px-6 py-3 rounded-lg">
              <div className="text-2xl font-bold text-green-400">{score}</div>
              <div className="text-sm text-gray-400">Correct</div>
            </div>
            <div className="bg-slate-800/50 px-6 py-3 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">{totalAttempts}</div>
              <div className="text-sm text-gray-400">Attempts</div>
            </div>
          </div>
        )}

        {/* Game Phases */}
        {phase === 'show' && (
          <div className="bg-slate-800/50 p-16 rounded-lg border border-amber-800/30">
            <div className="text-8xl font-mono font-bold text-white mb-8">
              {trigram}
            </div>
            <p className="text-xl text-gray-300">
              Memorize this trigram
            </p>
            <div className="mt-8 text-sm text-gray-400">
              You have 2 seconds to memorize...
            </div>
          </div>
        )}

        {phase === 'distract' && (
          <div className="bg-slate-800/50 p-16 rounded-lg border border-amber-800/30 relative">
            <div className="text-center mb-10">
              <p className="text-2xl text-white mb-6">
                Distraction Phase
              </p>
              <p className="text-xl text-gray-300">
                Count backwards by 3 from <span className="text-yellow-400 font-bold">{countdown * 3 + 18}</span>
              </p>
              <div className="text-6xl font-bold text-red-400 mt-6">
                {countdown}
              </div>
            </div>

            {/* Clean, Legible Fake Notification */}
            <div 
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                width: '256px',
                backgroundColor: '#1d4ed8',
                color: 'white',
                padding: '16px',
                borderRadius: '8px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                border: '1px solid #3b82f6',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <div style={{ width: '12px', height: '12px', backgroundColor: 'white', borderRadius: '50%' }}></div>
                <span style={{ fontSize: '14px', fontWeight: '600' }}>New Notification</span>
              </div>
              <p style={{ fontSize: '14px', fontWeight: '500', margin: '0' }}>
                Someone liked your post!
              </p>
              <p style={{ fontSize: '12px', color: '#93c5fd', margin: '4px 0 0 0' }}>
                Just now
              </p>
            </div>

            {/* Clean, Legible Additional Distraction */}
            <div 
              style={{
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                width: '192px',
                backgroundColor: '#059669',
                color: 'white',
                padding: '12px',
                borderRadius: '8px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                border: '1px solid #10b981',
                animation: 'bounce 1s infinite'
              }}
            >
              <div style={{ fontSize: '14px' }}>
                <strong style={{ display: 'block' }}>Message from Alex</strong>
                <p style={{ fontSize: '12px', margin: '4px 0 0 0' }}>Hey, check this out!</p>
              </div>
            </div>
          </div>
        )}

        {phase === 'recall' && (
          <div className="bg-slate-800/50 p-16 rounded-lg border border-amber-800/30">
            <h2 className="text-3xl text-white mb-8">
              Enter the trigram you remembered:
            </h2>
            <input
              type="text"
              maxLength={3}
              value={userInput}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className="w-32 h-16 text-4xl font-mono font-bold text-center text-white border-2 border-green-500/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400/30 uppercase placeholder-gray-400"
              style={{
                backgroundColor: '#374151',
                borderColor: '#10b981'
              }}
              autoFocus
              placeholder="ABC"
            />
            <div className="mt-8">
              <button
                onClick={handleSubmit}
                className="text-white px-10 py-4 rounded-xl text-lg font-bold transition-all duration-300 transform hover:scale-105"
                style={{
                  backgroundColor: '#047857',
                  border: '2px solid #10b981',
                  boxShadow: '0 20px 25px -5px rgba(16, 185, 129, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#065f46'
                  e.target.style.boxShadow = '0 20px 25px -5px rgba(5, 95, 70, 0.3)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#047857'
                  e.target.style.boxShadow = '0 20px 25px -5px rgba(16, 185, 129, 0.3)'
                }}
              >
                Submit Answer
              </button>
            </div>
          </div>
        )}

        {phase === 'result' && (
          <div className="bg-slate-800/50 p-16 rounded-lg border border-amber-800/30">
            {result ? (
              <div className="text-center">
                <h2 className="text-4xl font-bold text-green-400 mb-6">
                  Correct! 🎉
                </h2>
                <p className="text-xl text-white mb-4">
                  You remembered the trigram: <span className="font-mono font-bold text-green-400">{trigram}</span>
                </p>
                <p className="text-gray-300">
                  Your working memory is strong even under distraction!
                </p>
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-4xl font-bold text-red-400 mb-6">
                  Incorrect 😔
                </h2>
                <p className="text-xl text-white mb-4">
                  The trigram was: <span className="font-mono font-bold text-red-400">{trigram}</span>
                </p>
                <p className="text-gray-300">
                  You entered: <span className="font-mono font-bold text-gray-400">{userInput || '(nothing)'}</span>
                </p>
                <p className="text-gray-300 mt-4">
                  Social media distractions can significantly impact memory retention.
                </p>
              </div>
            )}
            
            <div className="mt-10">
              <button
                onClick={handleNext}
                className="text-white px-10 py-4 rounded-xl text-lg font-bold transition-all duration-300 transform hover:scale-105"
                style={{
                  backgroundColor: '#1d4ed8',
                  border: '2px solid #3b82f6',
                  boxShadow: '0 20px 25px -5px rgba(59, 130, 246, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#1e40af'
                  e.target.style.boxShadow = '0 20px 25px -5px rgba(30, 64, 175, 0.3)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#1d4ed8'
                  e.target.style.boxShadow = '0 20px 25px -5px rgba(59, 130, 246, 0.3)'
                }}
              >
                Try Another Trigram
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 