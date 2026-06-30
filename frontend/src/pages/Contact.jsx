import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', subject: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'loading' | 'success'
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.section-animate').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 4000)
  }

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/whatsapp/send-contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:    form.name,
          email:   form.email,
          company: form.company || 'N/A',
          subject: form.subject,
          message: form.message,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setStatus(null)
        showNotification(data.error || 'Failed to send message. Please try again.', 'error')
        return
      }

      setStatus('success')
      showNotification('Message sent successfully! We will get back to you soon.')
      setTimeout(() => {
        setForm({ name: '', email: '', phone: '', company: '', subject: '', message: '' })
        setStatus(null)
      }, 2000)
    } catch {
      setStatus(null)
      showNotification('Network error. Please try again.', 'error')
    }
  }

  const inputStyle = {
    width: '100%', padding: '1rem 1.25rem', border: '2px solid #eee', borderRadius: 12,
    fontSize: '1rem', background: '#fafafa', outline: 'none', transition: 'all 0.3s ease',
    fontFamily: 'inherit', boxSizing: 'border-box',
  }

  const infoCards = [
    { icon: '📍', title: 'Our Office', info: 'Vengurla, Maharashtra, India\nPin Code: 416516' },
    { icon: '📞', title: 'Phone', info: '+91 9422229951' },
    { icon: '✉️', title: 'Email', info: 'support@vengurlatech.com' },
    { icon: '🕒', title: 'Business Hours', info: 'Mon - Fri: 9:00 AM - 6:00 PM\nSat: 10:00 AM - 4:00 PM' },
  ]

  return (
    <div>
      {/* Notification */}
      {notification && (
        <div style={{
          position: 'fixed', top: 20, right: 20, zIndex: 10000,
          background: notification.type === 'success' ? 'linear-gradient(135deg, #00b894, #00a085)' : 'linear-gradient(135deg, #dc143c, #ff4757)',
          color: 'white', padding: '1rem 1.5rem', borderRadius: 10,
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)', fontWeight: 500, maxWidth: 300,
          animation: 'fadeInUp 0.4s ease',
        }}>
          {notification.message}
        </div>
      )}

      <div style={{ background: 'linear-gradient(135deg, #dc143c, #ff4757)', color: 'white', padding: '8rem 0 4rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 700, marginBottom: '1rem' }}>Contact Us</h1>
          <p style={{ fontSize: '1.25rem' }}>Get in touch with us for any inquiries or collaborations</p>
        </div>
      </div>
      <div style={{ background: '#f8f9fa', padding: '1rem 0', borderBottom: '1px solid #eee', fontSize: '0.9rem', color: '#666' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <Link to="/" style={{ color: '#dc143c', textDecoration: 'none' }}>Home</Link> &gt; Contact
        </div>
      </div>

      <section className="section-animate" style={{ padding: '6rem 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'start' }}>
            {/* Form */}
            <div style={{ background: 'white', padding: '3rem', borderRadius: 20, boxShadow: '0 8px 30px rgba(0,0,0,0.08)', border: '1px solid rgba(220,20,60,0.05)' }}>
              <h3 style={{ color: '#dc143c', marginBottom: '1.5rem', fontSize: '1.5rem' }}>Send us a Message</h3>

              <form onSubmit={handleSubmit}>
                {[
                  { label: 'Full Name', name: 'name', type: 'text', required: true },
                  { label: 'Email Address', name: 'email', type: 'email', required: true },
                  { label: 'Phone Number', name: 'phone', type: 'tel', required: false },
                  { label: 'Company', name: 'company', type: 'text', required: false },
                  { label: 'Subject', name: 'subject', type: 'text', required: true },
                ].map(field => (
                  <div key={field.name} style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.75rem', color: '#1a1a1a', fontWeight: 500 }}>
                      {field.label} {field.required && <span style={{ color: '#dc143c' }}>*</span>}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={form[field.name]}
                      onChange={handleChange}
                      required={field.required}
                      style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = '#dc143c'; e.target.style.background = 'white'; e.target.style.boxShadow = '0 0 0 3px rgba(220,20,60,0.1)' }}
                      onBlur={e => { e.target.style.borderColor = '#eee'; e.target.style.background = '#fafafa'; e.target.style.boxShadow = 'none' }}
                    />
                  </div>
                ))}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.75rem', color: '#1a1a1a', fontWeight: 500 }}>
                    Message <span style={{ color: '#dc143c' }}>*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    style={{ ...inputStyle, resize: 'vertical' }}
                    onFocus={e => { e.target.style.borderColor = '#dc143c'; e.target.style.background = 'white'; e.target.style.boxShadow = '0 0 0 3px rgba(220,20,60,0.1)' }}
                    onBlur={e => { e.target.style.borderColor = '#eee'; e.target.style.background = '#fafafa'; e.target.style.boxShadow = 'none' }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  style={{
                    width: '100%', padding: '1rem 2rem', border: 'none', borderRadius: 50,
                    cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                    fontWeight: 600, fontSize: '1rem', fontFamily: 'inherit',
                    background: status === 'success'
                      ? 'linear-gradient(135deg, #00b894, #00a085)'
                      : 'linear-gradient(135deg, #dc143c, #ff4757)',
                    color: 'white',
                    opacity: status === 'loading' ? 0.7 : 1,
                    transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  }}
                  onMouseEnter={e => { if (status !== 'loading') { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(220,20,60,0.3)' } }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
                >
                  {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Info cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {infoCards.map(card => (
                <div key={card.title} style={{
                  background: 'white', padding: '2rem', borderRadius: 15,
                  boxShadow: '0 8px 30px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: '1.5rem',
                  border: '1px solid rgba(220,20,60,0.05)', transition: 'all 0.3s ease',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(220,20,60,0.1)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)' }}
                >
                  <div style={{ width: 60, height: 60, background: 'linear-gradient(135deg, rgba(220,20,60,0.1), rgba(255,71,87,0.1))', borderRadius: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
                    {card.icon}
                  </div>
                  <div>
                    <h4 style={{ color: '#1a1a1a', marginBottom: '0.5rem' }}>{card.title}</h4>
                    <p style={{ color: '#666', whiteSpace: 'pre-line', margin: 0 }}>{card.info}</p>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
