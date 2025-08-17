import { useState } from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMouseInFooter, setIsMouseInFooter] = useState(false)

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  const handleMouseEnter = () => {
    setIsMouseInFooter(true)
  }

  const handleMouseLeave = () => {
    setIsMouseInFooter(false)
  }

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/discover', label: 'Discover' },
    { path: '/simulate', label: 'Simulate' },
    { path: '/check-act', label: 'Check & Act' },
    { path: '/about', label: 'About' }
  ]

  return (
    <footer 
      style={{
        position: 'relative',
        borderTop: '2px solid #2e7d32',
        background: 'rgba(22, 35, 43, 0.67)',
        backdropFilter: 'blur(40px)',
        overflow: 'hidden'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Mouse follow light effect */}
      <div
        style={{
          position: 'absolute',
          top: mousePosition.y - 100,
          left: mousePosition.x - 100,
          width: 200,
          height: 200,
          background: 'radial-gradient(circle, rgba(182, 227, 182, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          transition: 'opacity 0.3s ease',
          zIndex: 1,
          opacity: isMouseInFooter ? 1 : 0
        }}
      />
      
      <div style={{ 
        maxWidth: 1400, 
        margin: '0 auto', 
        padding: '24px 32px',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: 24,
          marginBottom: 20
        }}>
          {/* Brand Section */}
          <div>
            <h3 style={{ 
              fontWeight: 700, 
              fontSize: 18, 
              letterSpacing: 1, 
              color: '#b6e3b6',
              marginBottom: 12
            }}>
              (Dis)connected
            </h3>
            <p style={{ 
              color: '#cbd5e1', 
              fontSize: 13, 
              lineHeight: 1.5,
              marginBottom: 12
            }}>
              Examining how social media overuse harms youth cognition and mental health, and exploring recovery strategies.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 style={{ 
              fontWeight: 600, 
              fontSize: 15, 
              color: '#e2e8f0',
              marginBottom: 12
            }}>
              Navigation
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    color: '#cbd5e1',
                    fontSize: 13,
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    fontWeight: 400
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#b6e3b6'}
                  onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer


