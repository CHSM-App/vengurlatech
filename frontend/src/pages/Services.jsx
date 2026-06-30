import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Services() {
  useEffect(() => {
    window.scrollTo(0, 0)
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.section-animate').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const services = [
    { icon: '💻', title: 'Software Development', desc: 'Custom software solutions built with modern technologies, scalable architecture, and user-centric design principles.' },
    { icon: '🌐', title: 'Web Development', desc: 'Full-stack web development services including frontend, backend, and database design with responsive layouts.' },
    { icon: '📱', title: 'Mobile App Development', desc: 'iOS and Android app development with native performance and cross-platform compatibility.' },
  ]

  return (
    <div>
      <div style={{ background: 'linear-gradient(135deg, #dc143c, #ff4757)', color: 'white', padding: '8rem 0 4rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 700, marginBottom: '1rem' }}>Our Services</h1>
          <p style={{ fontSize: '1.25rem' }}>Comprehensive technology solutions for your business</p>
        </div>
      </div>
      <div style={{ background: '#f8f9fa', padding: '1rem 0', borderBottom: '1px solid #eee', fontSize: '0.9rem', color: '#666' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <Link to="/" style={{ color: '#dc143c', textDecoration: 'none' }}>Home</Link> &gt; Services
        </div>
      </div>
      <section className="section-animate" style={{ padding: '6rem 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {services.map(s => (
              <div key={s.title} className="service-card-top" style={{
                background: 'white', padding: '2.5rem 2rem', borderRadius: 20, textAlign: 'center',
                boxShadow: '0 8px 30px rgba(0,0,0,0.08)', border: '1px solid rgba(220,20,60,0.05)',
                position: 'relative', overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-12px)'; e.currentTarget.style.boxShadow = '0 25px 50px rgba(220,20,60,0.15)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)' }}
              >
                <div style={{ width: 80, height: 80, background: 'linear-gradient(135deg, rgba(220,20,60,0.1), rgba(255,71,87,0.1))', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '2rem' }}>
                  {s.icon}
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#1a1a1a', marginBottom: '1rem' }}>{s.title}</h3>
                <p style={{ color: '#666', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
