import { useState, useEffect } from 'react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: 50,
        height: 50,
        background: 'linear-gradient(135deg, #dc143c, #ff4757)',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        cursor: 'pointer',
        fontSize: '1.25rem',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
        zIndex: 1000,
        boxShadow: '0 8px 25px rgba(220,20,60,0.3)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
      aria-label="Scroll to top"
    >
      ↑
    </button>
  )
}
