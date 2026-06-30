import { useEffect } from 'react'
import { Link } from 'react-router-dom'

function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    document.querySelectorAll('.section-animate').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

const cardStyle = {
  background: 'white',
  padding: '2rem 1.5rem',
  borderRadius: 20,
  textAlign: 'center',
  boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
  border: '1px solid rgba(220,20,60,0.1)',
  transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
  cursor: 'default',
}

export default function Home() {
  useScrollAnimation()

  return (
    <div>
      {/* Hero */}
      <section style={{
        height: '100vh',
        background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(220,20,60,0.05) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="hero-rotate" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
        <div style={{ maxWidth: 900, zIndex: 2, position: 'relative', padding: '0 2rem' }}>
          <h1 className="animate-fadeInUp-delay1" style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', marginBottom: '1.5rem', fontWeight: 700, color: '#1a1a1a' }}>
            <span className="gradient-text">VengurlaTech</span> Private Limited
          </h1>
          <p className="animate-fadeInUp-delay2" style={{ fontSize: 'clamp(1.1rem,2.5vw,1.5rem)', marginBottom: '3rem', color: '#666' }}>
            Pioneering Innovation in Technology Solutions for Modern Businesses
          </p>
          <div className="animate-fadeInUp-delay3" style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/services" style={{
              padding: '1rem 2rem', borderRadius: 50, textDecoration: 'none', fontWeight: 600,
              background: 'linear-gradient(135deg, #dc143c, #ff4757)', color: 'white',
              transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
            }}
              onMouseEnter={e => { e.target.style.transform = 'translateY(-3px)'; e.target.style.boxShadow = '0 15px 35px rgba(220,20,60,0.3)' }}
              onMouseLeave={e => { e.target.style.transform = ''; e.target.style.boxShadow = '' }}
            >Explore Services</Link>
            <Link to="/contact" style={{
              padding: '1rem 2rem', borderRadius: 50, textDecoration: 'none', fontWeight: 600,
              background: 'transparent', color: '#dc143c', border: '2px solid #dc143c',
              transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
            }}
              onMouseEnter={e => { e.target.style.background = '#dc143c'; e.target.style.color = 'white'; e.target.style.transform = 'translateY(-3px)' }}
              onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#dc143c'; e.target.style.transform = '' }}
            >Get In Touch</Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section-animate" style={{ padding: '6rem 0', background: 'linear-gradient(135deg, #fafafa 0%, rgba(220,20,60,0.02) 100%)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(2rem,4vw,2.75rem)', fontWeight: 700, color: '#1a1a1a', marginBottom: '1rem' }}>
              About <span className="gradient-text">VengurlaTech</span>
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#666', maxWidth: 600, margin: '0 auto' }}>Your trusted partner in digital transformation and technology excellence</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div style={{ fontSize: '1.125rem', lineHeight: 1.8, color: '#555' }}>
              <p style={{ marginBottom: '1.5rem' }}>VengurlaTech Private Limited is a forward-thinking technology company dedicated to delivering cutting-edge solutions that transform businesses and drive innovation.</p>
              <p style={{ marginBottom: '1.5rem' }}>With our expertise in software development, digital transformation, and emerging technologies, we help organizations achieve their goals in the digital age.</p>
              <p>Our commitment to excellence and customer satisfaction has made us a trusted partner for businesses across various industries.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
              {[
                { num: '2+', label: 'Projects Completed' },
                { num: '5+', label: 'Happy Clients' },
                { num: '1+', label: 'Years Experience' },
                { num: '24/7', label: 'Support' },
              ].map(stat => (
                <div key={stat.label} style={cardStyle}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(220,20,60,0.15)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)' }}
                >
                  <div className="gradient-text" style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>{stat.num}</div>
                  <div style={{ color: '#666', fontWeight: 500 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-animate" style={{ padding: '6rem 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(2rem,4vw,2.75rem)', fontWeight: 700, color: '#1a1a1a', marginBottom: '1rem' }}>
              Our <span className="gradient-text">Services</span>
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#666', maxWidth: 600, margin: '0 auto' }}>Comprehensive technology solutions tailored to your business needs</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {[
              { icon: '💻', title: 'Software Development', desc: 'Custom software solutions tailored to your business needs with cutting-edge technologies and best practices.' },
              { icon: '🌐', title: 'Web Development', desc: 'Responsive and dynamic websites that provide exceptional user experiences across all devices.' },
              { icon: '📱', title: 'Mobile App Development', desc: 'Native and cross-platform mobile applications that engage users and drive business growth.' },
            ].map(s => (
              <div key={s.title} className="service-card-top" style={{
                background: 'white', padding: '2.5rem 2rem', borderRadius: 20, textAlign: 'center',
                boxShadow: '0 8px 30px rgba(0,0,0,0.08)', border: '1px solid rgba(220,20,60,0.05)',
                position: 'relative', overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-12px)'; e.currentTarget.style.boxShadow = '0 25px 50px rgba(220,20,60,0.15)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)' }}
              >
                <div style={{ width: 80, height: 80, background: 'linear-gradient(135deg, rgba(220,20,60,0.1), rgba(255,71,87,0.1))', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '2rem', transition: 'all 0.3s ease' }}>
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
