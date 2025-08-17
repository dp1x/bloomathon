import { motion } from 'framer-motion'
import FlipCard from '../components/FlipCard'

const Discover = () => {
  const symptoms = [
    {
      id: 1,
      question: "Do you feel anxious when you can't check your phone?",
      explanation: "This is a sign of digital dependency - your brain has become conditioned to expect constant stimulation."
    },
    {
      id: 2,
      question: "Do you lose track of time when scrolling?",
      explanation: "Time blindness is a common symptom of digital overstimulation, where hours feel like minutes."
    },
    {
      id: 3,
      question: "Do you feel restless or bored without digital stimulation?",
      explanation: "Your brain has become accustomed to constant dopamine hits, making normal activities feel less rewarding."
    }
  ]

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '120px 32px', position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <motion.div 
          style={{ textAlign: 'center', marginBottom: 96 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: 'white',
            marginBottom: 32
          }}>
            Discover the{' '}
            <span style={{
              background: 'linear-gradient(135deg, #81c784 0%, #4caf50 50%, #2e7d32 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Signs
            </span>
          </h1>
          <p style={{ 
            fontSize: '1.125rem', 
            lineHeight: 1.7, 
            fontWeight: 400, 
            color: '#cbd5e1', 
            maxWidth: '64rem', 
            margin: '0 auto' 
          }}>
            Learn to recognize the symptoms of digital overstimulation and understand how they affect your mental health.
          </p>
        </motion.div>

        {/* Flip Cards Section */}
        <div style={{ marginBottom: 128 }}>
          <motion.h2 
            style={{ 
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
              color: 'white',
              marginBottom: 64,
              textAlign: 'center'
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Do you experience this?
          </motion.h2>
          <div style={{ 
            display: 'grid', 
            gap: 32, 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
          }}>
            {symptoms.map((symptom, index) => (
              <motion.div
                key={symptom.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                whileHover={{ scale: 1.02 }}
              >
                <FlipCard
                  question={symptom.question}
                  explanation={symptom.explanation}
                />
              </motion.div>
            ))}
          </div>
        </div>


      </div>
    </div>
  )
}

export default Discover 