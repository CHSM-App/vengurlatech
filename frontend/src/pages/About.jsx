import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0)
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.section-animate').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div>
      <div style={{ background: 'linear-gradient(135deg, #dc143c, #ff4757)', color: 'white', padding: '8rem 0 4rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 700, marginBottom: '1rem' }}>About VengurlaTech</h1>
          <p style={{ fontSize: '1.25rem' }}>Learn more about our company, mission, and values</p>
        </div>
      </div>
      <div style={{ background: '#f8f9fa', padding: '1rem 0', borderBottom: '1px solid #eee', fontSize: '0.9rem', color: '#666' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <Link to="/" style={{ color: '#dc143c', textDecoration: 'none' }}>Home</Link> &gt; About
        </div>
      </div>
      <section className="section-animate" style={{ padding: '6rem 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          {[
            { title: 'Our Story', text: "Founded with a vision to bridge the gap between technology and business success, VengurlaTech Private Limited has grown from a small startup to a recognized leader in the technology solutions industry. Our journey has been marked by continuous innovation, unwavering commitment to quality, and a passion for helping our clients achieve their digital transformation goals." },
            { title: 'Our Mission', text: "To empower businesses with innovative technology solutions that drive growth, enhance efficiency, and create sustainable competitive advantages in the digital marketplace." },
            { title: 'Our Vision', text: "To be the most trusted technology partner, known for delivering exceptional solutions that transform businesses and contribute to a digitally connected world." },
          ].map(section => (
            <div key={section.title} style={{ marginBottom: '4rem', textAlign: 'center' }}>
              <h2 style={{ fontSize: 'clamp(2rem,4vw,2.75rem)', fontWeight: 700, color: '#1a1a1a', marginBottom: '2rem' }}>
                {section.title.split(' ').map((word, i) => i === section.title.split(' ').length - 1
                  ? <span key={i} className="gradient-text">{word}</span>
                  : <span key={i}>{word} </span>
                )}
              </h2>
              <p style={{ fontSize: '1.125rem', lineHeight: 1.8, maxWidth: 800, margin: '0 auto', color: '#555' }}>{section.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
