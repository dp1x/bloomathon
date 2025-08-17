import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Discover from './pages/Discover'
import Simulate from './pages/Simulate'
import CheckAct from './pages/CheckAct'
import About from './pages/About'

function App() {
  return (
    <Router>
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 15%, #1e3a8a 40%, #0f172a 70%, #020617 100%)',
        color: 'white',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/simulate" element={<Simulate />} />
            <Route path="/check-act" element={<CheckAct />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
