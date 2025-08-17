import { useState } from 'react'

const FlipCard = ({ question, explanation }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div 
      className="bg-slate-800 border border-amber-800/30 rounded-lg cursor-pointer transition-all duration-300"
      onClick={() => setIsExpanded(!isExpanded)}
      style={{ 
        background: isExpanded 
          ? 'linear-gradient(135deg, #4caf50 0%, #388e3c 50%, #2e7d32 100%)'
          : 'rgba(30, 41, 59, 0.8)',
        border: '1px solid rgba(139, 69, 19, 0.3)',
        borderRadius: '8px',
        padding: '40px'
      }}
    >
      <div className="text-center">
        <h3 className="text-white text-lg font-medium mb-4">
          {question}
        </h3>
        
        {isExpanded && (
          <div className="mt-6">
            <p className="text-white text-sm leading-relaxed">
              {explanation}
            </p>
          </div>
        )}
        
        <div className="mt-6 text-xs text-gray-300">
          {isExpanded ? 'Click to collapse' : 'Click to expand'}
        </div>
      </div>
    </div>
  )
}

export default FlipCard 