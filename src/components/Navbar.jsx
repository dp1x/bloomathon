import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/discover', label: 'Discover' },
    { path: '/simulate', label: 'Simulate' },
    { path: '/check-act', label: 'Check & Act' },
    { path: '/about', label: 'About' }
  ]

  return (
    <nav style={{ borderBottom: '1px solid #2e7d32', background: '#16232b', height: 60 }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', alignItems: 'center', height: '100%', padding: '0 32px' }}>
        {/* Left-aligned Title */}
        <div style={{ fontWeight: 700, fontSize: 24, letterSpacing: 1, color: '#b6e3b6' }}>
          (Dis)connected
        </div>
        {/* Right-aligned Nav */}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 36 }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                color: location.pathname === item.path ? '#b6e3b6' : '#e2e8f0',
                fontWeight: location.pathname === item.path ? 700 : 500,
                fontSize: 17,
                textDecoration: 'none',
                borderBottom: location.pathname === item.path ? '2px solid #b6e3b6' : '2px solid transparent',
                padding: '0 0 4px 0',
                transition: 'color 0.2s, border-bottom 0.2s',
                background: 'none',
                borderRadius: 0,
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar 