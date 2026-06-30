import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background: '#1a1a1a', color: 'white', padding: '4rem 0 2rem', marginTop: '4rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '2rem' }}>
          <div>
            <h3 style={{ color: '#dc143c', marginBottom: '1.5rem', fontSize: '1.25rem' }}>Vengurla Tech</h3>
            <p style={{ color: '#ccc', lineHeight: 1.6 }}>Pioneering Innovation in Technology Solutions. We help businesses transform digitally and achieve their goals with cutting-edge technology.</p>
          </div>
          <div>
            <h3 style={{ color: '#dc143c', marginBottom: '1.5rem', fontSize: '1.25rem' }}>Quick Links</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[['/', 'Home'], ['/about', 'About'], ['/services', 'Services'], ['/contact', 'Contact'], ['/careers', 'Careers']].map(([to, label]) => (
                <li key={to} style={{ marginBottom: '0.75rem' }}>
                  <Link to={to} style={{ color: '#ccc', textDecoration: 'none', transition: 'color 0.3s' }}
                    onMouseEnter={e => e.target.style.color = '#dc143c'}
                    onMouseLeave={e => e.target.style.color = '#ccc'}
                  >{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 style={{ color: '#dc143c', marginBottom: '1.5rem', fontSize: '1.25rem' }}>Services</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['Software Development', 'Web Development', 'Mobile Apps'].map(s => (
                <li key={s} style={{ marginBottom: '0.75rem' }}>
                  <Link to="/services" style={{ color: '#ccc', textDecoration: 'none' }}
                    onMouseEnter={e => e.target.style.color = '#dc143c'}
                    onMouseLeave={e => e.target.style.color = '#ccc'}
                  >{s}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 style={{ color: '#dc143c', marginBottom: '1.5rem', fontSize: '1.25rem' }}>Contact Info</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '0.75rem', color: '#ccc' }}>📍 Vengurla, Maharashtra, India</li>
              <li style={{ marginBottom: '0.75rem', color: '#ccc' }}>📞 +91 94049 34978</li>
              <li style={{ marginBottom: '0.75rem', color: '#ccc' }}>✉️ support@vengurlatech.com</li>
            </ul>
          </div>
        </div>
        <div style={{ textAlign: 'center', paddingTop: '2rem', borderTop: '1px solid #333', color: '#888' }}>
          <p>© 2025 VengurlaTech Private Limited. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  )
}
