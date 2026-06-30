import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const values = [
  {
    icon: '🚀',
    title: 'Innovation First',
    desc: 'We encourage creative thinking and bold ideas. Every team member has the freedom to experiment, learn, and push boundaries.',
  },
  {
    icon: '🤝',
    title: 'Collaborative Culture',
    desc: 'We believe great work happens together. Our teams are built on trust, open communication, and mutual respect.',
  },
  {
    icon: '📈',
    title: 'Growth Mindset',
    desc: 'We invest in our people. From mentorship to upskilling, we provide the tools and opportunities to grow your career.',
  },
  {
    icon: '⚖️',
    title: 'Work-Life Balance',
    desc: 'We respect your time and well-being. Flexible schedules and a healthy work environment are core to how we operate.',
  },
]

const perks = [
  { icon: '💡', label: 'Learning & Development' },
  { icon: '🏥', label: 'Health & Wellness' },
  { icon: '🕐', label: 'Flexible Working Hours' },
  { icon: '🌍', label: 'Remote-Friendly' },
  { icon: '🎯', label: 'Performance Bonuses' },
  { icon: '👥', label: 'Mentorship Programs' },
  { icon: '🎉', label: 'Team Events & Retreats' },
  { icon: '📚', label: 'Paid Certifications' },
]

export default function Career() {
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
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #dc143c, #ff4757)',
        color: 'white', padding: '8rem 0 5rem', textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* decorative circles */}
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 }}>
          <span style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 50, padding: '0.4rem 1.2rem', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '1.5rem' }}>
            JOIN OUR TEAM
          </span>
          <h1 style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 700, marginBottom: '1.5rem', lineHeight: 1.2 }}>
            Build Your Career at Vengurla Tech
          </h1>
          <p style={{ fontSize: '1.2rem', lineHeight: 1.8, opacity: 0.9, marginBottom: '2.5rem' }}>
            We're a team of passionate technologists solving real-world problems. If you're driven by curiosity and want to make a meaningful impact, we'd love to hear from you.
          </p>
          {/* <a
            href="mailto:hr@vengurlatech.com"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'white', color: '#dc143c', padding: '0.9rem 2rem',
              borderRadius: 50, fontWeight: 700, fontSize: '1rem', textDecoration: 'none',
              boxShadow: '0 8px 30px rgba(0,0,0,0.15)', transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.2)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)' }}
          >
            ✉️ Send Your Resume
          </a> */}
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{ background: '#f8f9fa', padding: '1rem 0', borderBottom: '1px solid #eee', fontSize: '0.9rem', color: '#666' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <Link to="/" style={{ color: '#dc143c', textDecoration: 'none' }}>Home</Link> &gt; Careers
        </div>
      </div>

      {/* Current Openings */}
      <section className="section-animate" style={{ padding: '5rem 0 0' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.75rem)', fontWeight: 700, color: '#1a1a1a', marginBottom: '0.75rem' }}>
              Current <span className="gradient-text">Openings</span>
            </h2>
            <p style={{ color: '#666', fontSize: '1.05rem' }}>We're hiring — come build with us.</p>
          </div>

          {/* Job card */}
          <div style={{
            background: 'white', borderRadius: 20, border: '1px solid rgba(220,20,60,0.12)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.07)', overflow: 'hidden',
          }}>
            {/* Header */}
            <div style={{ padding: '2rem 2.5rem', borderBottom: '1px solid #f0f0f0' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                    <span style={{
                      background: '#fef2f2', color: '#dc143c',
                      border: '1px solid rgba(220,20,60,0.2)', borderRadius: 50,
                      padding: '0.25rem 0.9rem', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.04em',
                    }}>HIRING NOW</span>
                    <span style={{ color: '#999', fontSize: '0.83rem' }}>Posted: 30 Jun 2025 &nbsp;·&nbsp; 1 Opening &nbsp;·&nbsp;</span>
                  </div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '0.75rem' }}>
                    Sales & Marketing Executive
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', color: '#555', fontSize: '0.9rem' }}>
                    <span>📍 Sindhudurg, Maharashtra</span>
                    <span>🕐 0 – 3 Years Experience</span>
                    {/* <span>💰 ₹1.2 – 3 LPA</span> */}
                    <span>💼 Full-time, Permanent</span>
                  </div>
                </div>

                {/* Apply CTA */}
                <a
                  href="mailto:hr@vengurlatech.com?subject=Application%20—%20Sales%20%26%20Marketing%20Executive"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0,
                    background: 'linear-gradient(135deg, #dc143c, #ff4757)',
                    color: 'white', padding: '0.85rem 1.75rem',
                    borderRadius: 50, fontWeight: 600, fontSize: '0.95rem',
                    textDecoration: 'none', whiteSpace: 'nowrap',
                    boxShadow: '0 4px 16px rgba(220,20,60,0.3)', transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(220,20,60,0.4)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 16px rgba(220,20,60,0.3)' }}
                >
                  ✉️ Apply via Email
                </a>
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: '2rem 2.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>

              {/* Responsibilities */}
              <div>
                <h4 style={{ color: '#1a1a1a', fontWeight: 700, fontSize: '1rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #fef2f2' }}>
                  Responsibilities
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {[
                    'Lead generation through social media & competitor analysis',
                    'Generate leads, close deals, handle clients, and do field work',
                    'Negotiate contracts and communicate effectively with clients',
                    'Acquire new customers, manage follow-ups, and drive brand promotion',
                  ].map(item => (
                    <li key={item} style={{ display: 'flex', gap: '0.6rem', color: '#555', fontSize: '0.92rem', lineHeight: 1.6 }}>
                      <span style={{ color: '#dc143c', fontWeight: 700, flexShrink: 0 }}>→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Role details */}
              <div>
                <h4 style={{ color: '#1a1a1a', fontWeight: 700, fontSize: '1rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #fef2f2' }}>
                  Role Details
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.92rem' }}>
                  {[
                    ['Role', 'Product Marketing'],
                    ['Industry', 'IT Services & Consulting'],
                    ['Department', 'Marketing & Communication'],
                    ['Category', 'Marketing'],
                    ['Education', 'Any Graduate'],
                  ].map(([label, val]) => (
                    <div key={label} style={{ display: 'flex', gap: '0.5rem' }}>
                      <span style={{ color: '#999', minWidth: 100 }}>{label}:</span>
                      <span style={{ color: '#333', fontWeight: 500 }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Key Skills */}
            <div style={{ padding: '0 2.5rem 2rem' }}>
              <h4 style={{ color: '#1a1a1a', fontWeight: 700, fontSize: '1rem', marginBottom: '1rem' }}>Key Skills</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['Field Marketing', 'Digital Marketing', 'Social Media Marketing', 'Lead Generation', 'Negotiation', 'Client Acquisition', 'Brand Promotion', 'Competitor Analysis', 'Business Development', 'Client Handling', 'Communication Skills', 'Presentation Skills', 'Sales', 'Field Work', 'Follow Ups', 'Marathi', 'Hindi', 'English'].map(skill => (
                  <span key={skill} style={{
                    background: '#f8f9fa', border: '1px solid #e5e7eb',
                    borderRadius: 50, padding: '0.3rem 0.9rem',
                    fontSize: '0.82rem', color: '#444', fontWeight: 500,
                  }}>{skill}</span>
                ))}
              </div>
            </div>

            {/* Footer strip */}
            <div style={{ background: '#f8f9fa', borderTop: '1px solid #eee', padding: '1rem 2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: '#666' }}>
                Send your resume with subject line <strong>"Application — Sales & Marketing Executive"</strong>
              </span>
              <a href="mailto:hr@vengurlatech.com?subject=Application%20—%20Sales%20%26%20Marketing%20Executive" style={{ fontSize: '0.85rem', color: '#dc143c', fontWeight: 600, textDecoration: 'none' }}>
                hr@vengurlatech.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why VengurlaTech */}
      <section className="section-animate" style={{ padding: '6rem 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.75rem)', fontWeight: 700, color: '#1a1a1a', marginBottom: '1rem' }}>
              Why Work With <span className="gradient-text">Us</span>
            </h2>
            <p style={{ color: '#666', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto' }}>
              We're building a workplace where talented individuals can do the best work of their careers.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            {values.map(v => (
              <div
                key={v.title}
                style={{
                  background: 'white', padding: '2.5rem 2rem', borderRadius: 20,
                  boxShadow: '0 4px 24px rgba(0,0,0,0.07)', border: '1px solid rgba(220,20,60,0.06)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(220,20,60,0.12)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.07)' }}
              >
                <div style={{
                  width: 56, height: 56, borderRadius: 16, fontSize: '1.5rem',
                  background: 'linear-gradient(135deg, rgba(220,20,60,0.1), rgba(255,71,87,0.1))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem',
                }}>
                  {v.icon}
                </div>
                <h3 style={{ color: '#1a1a1a', fontWeight: 700, marginBottom: '0.75rem', fontSize: '1.1rem' }}>{v.title}</h3>
                <p style={{ color: '#666', lineHeight: 1.7, margin: 0, fontSize: '0.95rem' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="section-animate" style={{ padding: '5rem 0', background: '#f8f9fa' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.75rem)', fontWeight: 700, color: '#1a1a1a', marginBottom: '1rem' }}>
              Perks & <span className="gradient-text">Benefits</span>
            </h2>
            <p style={{ color: '#666', fontSize: '1.1rem' }}>We take care of our people — inside and outside of work.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem' }}>
            {perks.map(p => (
              <div
                key={p.label}
                style={{
                  background: 'white', borderRadius: 16, padding: '1.75rem 1.25rem',
                  textAlign: 'center', border: '1px solid #eee',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.05)', transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#dc143c'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(220,20,60,0.1)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#eee'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)' }}
              >
                <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>{p.icon}</div>
                <p style={{ color: '#333', fontWeight: 600, fontSize: '0.9rem', margin: 0 }}>{p.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring process */}
      <section className="section-animate" style={{ padding: '6rem 0' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.75rem)', fontWeight: 700, color: '#1a1a1a', marginBottom: '1rem' }}>
              Our Hiring <span className="gradient-text">Process</span>
            </h2>
            <p style={{ color: '#666', fontSize: '1.1rem' }}>Simple, transparent, and respectful of your time.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { step: '01', title: 'Send Your Resume', desc: 'Email your resume and a brief introduction to hr@vengurlatech.com. Tell us what you\'re passionate about and what kind of role interests you.' },
              { step: '02', title: 'Initial Screening', desc: 'Our HR team reviews your profile. If there\'s a potential fit, we\'ll reach out to schedule a quick introductory call within 5–7 business days.' },
              { step: '03', title: 'Technical Discussion', desc: 'A conversation with the relevant team lead to understand your skills, experience, and approach to problem-solving.' },
              { step: '04', title: 'Final Interview', desc: 'A final discussion with senior leadership to ensure mutual alignment on role expectations, culture, and growth path.' },
              { step: '05', title: 'Offer & Onboarding', desc: 'If selected, we\'ll extend an offer and guide you through a smooth onboarding experience to set you up for success from day one.' },
            ].map((item, i) => (
              <div
                key={item.step}
                style={{
                  display: 'flex', gap: '2rem', alignItems: 'flex-start',
                  background: 'white', padding: '2rem', borderRadius: 16,
                  boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid rgba(220,20,60,0.06)',
                }}
              >
                <div style={{
                  flexShrink: 0, width: 52, height: 52, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #dc143c, #ff4757)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontWeight: 700, fontSize: '0.85rem',
                }}>
                  {item.step}
                </div>
                <div>
                  <h3 style={{ color: '#1a1a1a', fontWeight: 700, marginBottom: '0.5rem', fontSize: '1.05rem' }}>{item.title}</h3>
                  <p style={{ color: '#666', margin: 0, lineHeight: 1.7, fontSize: '0.95rem' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-animate" style={{ padding: '5rem 0', background: 'linear-gradient(135deg, #dc143c, #ff4757)' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 2rem', textAlign: 'center', color: 'white' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.75rem)', fontWeight: 700, marginBottom: '1rem' }}>
            Don't See the Right Role?
          </h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.8, marginBottom: '2.5rem' }}>
            We're always on the lookout for exceptional talent. Send us your resume and let us know how you can contribute — we'll keep your profile on file and reach out when the right opportunity opens up.
          </p>
          <a
            href="mailto:hr@vengurlatech.com?subject=Career%20Enquiry%20—%20VengurlaTech"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              background: 'white', color: '#dc143c', padding: '1rem 2.5rem',
              borderRadius: 50, fontWeight: 700, fontSize: '1.05rem', textDecoration: 'none',
              boxShadow: '0 8px 30px rgba(0,0,0,0.15)', transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 14px 40px rgba(0,0,0,0.2)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)' }}
          >
            ✉️ hr@vengurlatech.com
          </a>
          <p style={{ marginTop: '1.5rem', opacity: 0.75, fontSize: '0.9rem' }}>
            We typically respond within 5–7 business days.
          </p>
        </div>
      </section>
    </div>
  )
}
