import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const Home = () => {
  const headlineWords = "Infinite scroll takes a toll on the soul".split(" ")
  
  // Tooltip state variables
  const [showTooltip1, setShowTooltip1] = useState(false)
  const [showTooltip2, setShowTooltip2] = useState(false)
  const [showTooltip3, setShowTooltip3] = useState(false)

  // Close tooltip when clicking outside
  const closeTooltip = (tooltipNumber) => {
    switch(tooltipNumber) {
      case 1:
        setShowTooltip1(false)
        break
      case 2:
        setShowTooltip2(false)
        break
      case 3:
        setShowTooltip3(false)
        break
      default:
        break
    }
  }

  // Handle clicks outside tooltips
  const handleClickOutside = (e, tooltipNumber) => {
    // Don't close if clicking inside the tooltip content
    if (e.target.closest('.tooltip-content')) {
      return
    }
    // Don't close if clicking the "i" button itself
    if (e.target.closest('.tooltip-button')) {
      return
    }
    closeTooltip(tooltipNumber)
  }

  // Add click outside listener when tooltip is open
  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (showTooltip1) handleClickOutside(e, 1)
      if (showTooltip2) handleClickOutside(e, 2)
      if (showTooltip3) handleClickOutside(e, 3)
    }

    if (showTooltip1 || showTooltip2 || showTooltip3) {
      document.addEventListener('click', handleDocumentClick)
    }

    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [showTooltip1, showTooltip2, showTooltip3])

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Hero Section */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '120px 32px', position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center' }}>
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ marginBottom: 64 }}
          >
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'white',
              marginBottom: 32,
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1rem'
            }}>
              {headlineWords.map((word, index) => (
                <motion.span
                  key={index}
                  style={{ 
                    display: 'inline-block',
                    cursor: 'pointer'
                  }}
                  whileHover={{
                    textShadow: '0 0 8px rgba(255, 215, 0, 0.4)'
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>
            
            <p style={{ 
              fontSize: '1.125rem', 
              lineHeight: 1.7, 
              fontWeight: 400, 
              color: '#e2e8f0', 
              maxWidth: '64rem', 
              margin: '0 auto 32px auto' 
            }}>
              We spend hours inside screens that look like the world, but slowly forget what it feels like to live in it.
            </p>
            
            <p style={{ 
              fontSize: '1.125rem', 
              lineHeight: 1.7, 
              fontWeight: 400, 
              color: '#e2e8f0', 
              maxWidth: '64rem', 
              margin: '0 auto' 
            }}>
              Discover how digital media is rewiring young minds and learn to take back control of your attention, focus, and mental well-being.
            </p>
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 32, 
              justifyContent: 'center', 
              alignItems: 'center', 
              marginBottom: 96 
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Link to="/discover">
              <motion.button 
                style={{
                  background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #4caf50 100%)',
                  color: 'white',
                  fontWeight: 600,
                  padding: '20px 40px',
                  borderRadius: 12,
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.125rem',
                  boxShadow: '0 8px 32px rgba(76, 175, 80, 0.3)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Discover the Problem
              </motion.button>
            </Link>
            
            <Link to="/simulate">
              <motion.button 
                style={{
                  background: 'linear-gradient(135deg, rgba(129, 199, 132, 0.1) 0%, rgba(76, 175, 80, 0.2) 100%)',
                  color: '#e8f5e8',
                  fontWeight: 600,
                  padding: '20px 40px',
                  borderRadius: 12,
                  border: '1px solid rgba(129, 199, 132, 0.3)',
                  cursor: 'pointer',
                  fontSize: '1.125rem',
                  backdropFilter: 'blur(10px)'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                See the Simulation
              </motion.button>
            </Link>
          </motion.div>
        </div>
        
        {/* Stats Section */}
        <motion.div 
          style={{ 
            display: 'grid', 
            gap: 32, 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            marginTop: 80
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.div 
            style={{
              background: 'linear-gradient(135deg, rgba(15, 32, 39, 0.8) 0%, rgba(32, 58, 67, 0.6) 100%)',
              borderRadius: 20,
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              padding: 32,
              border: '1px solid rgba(129, 199, 132, 0.2)',
              backdropFilter: 'blur(20px)',
              textAlign: 'center',
              position: 'relative'
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Source Tooltip */}
            <div style={{
              position: 'absolute',
              top: 16,
              right: 16,
              zIndex: 10
            }}>
              <div
                className="tooltip-button"
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: '#6b7280',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: 12,
                  color: 'white',
                  fontWeight: 'bold',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#b6e3b6'
                  e.target.style.color = '#1e1b4b'
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#6b7280'
                  e.target.style.color = 'white'
                }}
                onClick={() => setShowTooltip1(!showTooltip1)}
              >
                i
              </div>
              
              {/* Tooltip Content */}
              <div
                className="tooltip-content"
                style={{
                  position: 'absolute',
                  top: 30,
                  right: 0,
                  background: 'rgba(15, 32, 39, 0.95)',
                  border: '1px solid rgba(129, 199, 132, 0.3)',
                  borderRadius: 8,
                  padding: '12px 16px',
                  width: 'max-content',
                  maxWidth: 280,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                  backdropFilter: 'blur(20px)',
                  opacity: showTooltip1 ? 1 : 0,
                  visibility: showTooltip1 ? 'visible' : 'hidden',
                  transform: showTooltip1 ? 'translateY(0)' : 'translateY(-10px)',
                  transition: 'all 0.2s ease',
                  zIndex: 20
                }}
              >
                <div style={{ color: '#e2e8f0', fontSize: 13, marginBottom: 8 }}>
                  Source: Newport Academy
                </div>
                <a
                  href="https://www.newportacademy.com/resources/well-being/effect-of-social-media-on-teenagers/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#b6e3b6',
                    textDecoration: 'underline',
                    fontSize: 12,
                    display: 'block'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#4caf50'}
                  onMouseLeave={(e) => e.target.style.color = '#b6e3b6'}
                >
                  View Research →
                </a>
              </div>
            </div>
            
            <div style={{ 
              fontSize: 'clamp(2rem, 4vw, 3.5rem)', 
              fontWeight: 700, 
              lineHeight: 1.2, 
              letterSpacing: '-0.01em',
              color: '#4caf50',
              marginBottom: 16
            }}>
              2x
            </div>
            <h3 style={{ 
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', 
              fontWeight: 600, 
              lineHeight: 1.3,
              color: 'white',
              marginBottom: 16
            }}>
              More Likely to be Diagnosed with Depression
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.6 }}>
              Youth on social media for over 7 hours daily are more than twice as likely to be diagnosed with depression compared to those with only one hour of use.
            </p>
          </motion.div>

          <motion.div 
            style={{
              background: 'linear-gradient(135deg, rgba(15, 32, 39, 0.8) 0%, rgba(32, 58, 67, 0.6) 100%)',
              borderRadius: 20,
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              padding: 32,
              border: '1px solid rgba(129, 199, 132, 0.2)',
              backdropFilter: 'blur(20px)',
              textAlign: 'center',
              position: 'relative'
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Source Tooltip */}
            <div style={{
              position: 'absolute',
              top: 16,
              right: 16,
              zIndex: 10
            }}>
              <div
                className="tooltip-button"
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: '#6b7280',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: 12,
                  color: 'white',
                  fontWeight: 'bold',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#b6e3b6'
                  e.target.style.color = '#1e1b4b'
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#6b7280'
                  e.target.style.color = 'white'
                }}
                onClick={() => setShowTooltip2(!showTooltip2)}
              >
                i
              </div>
              
              {/* Tooltip Content */}
              <div
                className="tooltip-content"
                style={{
                  position: 'absolute',
                  top: 30,
                  right: 0,
                  background: 'rgba(15, 32, 39, 0.95)',
                  border: '1px solid rgba(129, 199, 132, 0.3)',
                  borderRadius: 8,
                  padding: '12px 16px',
                  width: 'max-content',
                  maxWidth: 280,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                  backdropFilter: 'blur(20px)',
                  opacity: showTooltip2 ? 1 : 0,
                  visibility: showTooltip2 ? 'visible' : 'hidden',
                  transform: showTooltip2 ? 'translateY(0)' : 'translateY(-10px)',
                  transition: 'all 0.2s ease',
                  zIndex: 20
                }}
              >
                <div style={{ color: '#e2e8f0', fontSize: 13, marginBottom: 8 }}>
                  Source: BMC Psychiatry
                </div>
                <a
                  href="https://bmcpsychiatry.biomedcentral.com/articles/10.1186/s12888-022-04238-x"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#b6e3b6',
                    textDecoration: 'underline',
                    fontSize: 12,
                    display: 'block'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#4caf50'}
                  onMouseLeave={(e) => e.target.style.color = '#b6e3b6'}
                >
                  View Research →
                </a>
              </div>
            </div>
            
            <div style={{ 
              fontSize: 'clamp(2rem, 4vw, 3.5rem)', 
              fontWeight: 700, 
              lineHeight: 1.2, 
              letterSpacing: '-0.01em',
              color: '#4caf50',
              marginBottom: 16
            }}>
              2.5x
            </div>
            <h3 style={{ 
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', 
              fontWeight: 600, 
              lineHeight: 1.3,
              color: 'white',
              marginBottom: 16
            }}>
              More Likely to Have Suicidal Ideation
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.6 }}>
              Adolescents who experienced cyberbullying are 2.5 times more likely to have suicidal thoughts than their peers.
            </p>
          </motion.div>

          <motion.div 
            style={{
              background: 'linear-gradient(135deg, rgba(15, 32, 39, 0.8) 0%, rgba(32, 58, 67, 0.6) 100%)',
              borderRadius: 20,
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              padding: 32,
              border: '1px solid rgba(129, 199, 132, 0.2)',
              backdropFilter: 'blur(20px)',
              textAlign: 'center',
              position: 'relative'
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Source Tooltip */}
            <div style={{
              position: 'absolute',
              top: 16,
              right: 16,
              zIndex: 10
            }}>
              <div
                className="tooltip-button"
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: '#6b7280',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: 12,
                  color: 'white',
                  fontWeight: 'bold',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#b6e3b6'
                  e.target.style.color = '#1e1b4b'
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#6b7280'
                  e.target.style.color = 'white'
                }}
                onClick={() => setShowTooltip3(!showTooltip3)}
              >
                i
              </div>
              
              {/* Tooltip Content */}
              <div
                className="tooltip-content"
                style={{
                  position: 'absolute',
                  top: 30,
                  right: 0,
                  background: 'rgba(15, 32, 39, 0.95)',
                  border: '1px solid rgba(129, 199, 132, 0.3)',
                  borderRadius: 8,
                  padding: '12px 16px',
                  width: 'max-content',
                  maxWidth: 280,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                  backdropFilter: 'blur(20px)',
                  opacity: showTooltip3 ? 1 : 0,
                  visibility: showTooltip3 ? 'visible' : 'hidden',
                  transform: showTooltip3 ? 'translateY(0)' : 'translateY(-10px)',
                  transition: 'all 0.2s ease',
                  zIndex: 20
                }}
              >
                <div style={{ color: '#e2e8f0', fontSize: 13, marginBottom: 8 }}>
                  Source: HHS Youth Mental Health Advisory
                </div>
                <a
                  href="https://www.hhs.gov/sites/default/files/sg-youth-mental-health-social-media-advisory.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#b6e3b6',
                    textDecoration: 'underline',
                    fontSize: 12,
                    display: 'block'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#4caf50'}
                  onMouseLeave={(e) => e.target.style.color = '#b6e3b6'}
                >
                  View Research →
                </a>
              </div>
            </div>
            
            <div style={{ 
              fontSize: 'clamp(2rem, 4vw, 3.5rem)', 
              fontWeight: 700, 
              lineHeight: 1.2, 
              letterSpacing: '-0.01em',
              color: '#4caf50',
              marginBottom: 16
            }}>
              +300,000
            </div>
            <h3 style={{ 
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', 
              fontWeight: 600, 
              lineHeight: 1.3,
              color: 'white',
              marginBottom: 16
            }}>
              Potential New Cases of Depression
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.6 }}>
              The introduction of a single social media platform at U.S. colleges was linked to a surge in mental health issues, potentially contributing to over 300,000 new cases of depression among students.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Home 