import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/VT_logo.png'

const links = [
  { to: '/',        label: 'Home' },
  { to: '/about',   label: 'About' },
  { to: '/services',label: 'Services' },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const location = useLocation()
  const menuRef  = useRef(null)

  // Scroll state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [location])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Close on outside click
  useEffect(() => {
    if (!menuOpen) return
    const handler = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [menuOpen])

  // Close on Escape
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  const isActive = to => to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

  return (
    <>
      {/* Outer strip — full width, transparent, just for positioning */}
      <div className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4">
        <nav
          aria-label="Main navigation"
          className={[
            'w-full max-w-4xl transition-all duration-300',
            'flex items-center justify-between px-4 py-2.5 rounded-full',
            scrolled
              ? 'backdrop-blur-md bg-white/85 shadow-[0_8px_32px_rgba(0,0,0,0.10)] border border-red-100/60'
              : 'bg-white/60 backdrop-blur-sm border border-white/40 shadow-[0_4px_20px_rgba(0,0,0,0.06)]',
          ].join(' ')}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img src={logo} alt="VengurlaTech" className="h-9 w-auto" />
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
            {links.map(link => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={[
                    'text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-200',
                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500',
                    isActive(link.to)
                      ? 'text-red-600 bg-red-50'
                      : 'text-gray-700 hover:text-red-600 hover:bg-red-50/60',
                  ].join(' ')}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA pill + hamburger */}
          <div className="flex items-center gap-2">
            {/* CTA */}
            <Link
              to="/contact"
              className={[
                'hidden md:inline-flex items-center px-5 py-2 rounded-full text-sm font-semibold',
                'bg-red-600 text-white hover:bg-red-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-200',
                'transition-all duration-200',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500',
              ].join(' ')}
            >
              Contact Us
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-full hover:bg-red-50 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-red-500"
            >
              <span className={[
                'block w-5 h-0.5 bg-red-600 rounded transition-all duration-300 motion-reduce:transition-none',
                menuOpen ? 'translate-y-1.5 rotate-45' : '-translate-y-0.5',
              ].join(' ')} />
              <span className={[
                'block w-5 h-0.5 bg-red-600 rounded transition-all duration-300 motion-reduce:transition-none my-1',
                menuOpen ? 'opacity-0 scale-x-0' : 'opacity-100',
              ].join(' ')} />
              <span className={[
                'block w-5 h-0.5 bg-red-600 rounded transition-all duration-300 motion-reduce:transition-none',
                menuOpen ? '-translate-y-1.5 -rotate-45' : 'translate-y-0.5',
              ].join(' ')} />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile overlay */}
      <div
        className={[
          'fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden',
          'transition-opacity duration-300 motion-reduce:transition-none',
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
        aria-hidden="true"
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={[
          'fixed top-0 inset-x-0 z-50 md:hidden',
          'bg-white/95 backdrop-blur-md shadow-xl border-b border-red-100',
          'transition-all duration-300 motion-reduce:transition-none',
          menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none',
        ].join(' ')}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <img src={logo} alt="VengurlaTech" className="h-9 w-auto" />
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors focus-visible:outline-2 focus-visible:outline-red-500"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="1" y1="1" x2="17" y2="17" /><line x1="17" y1="1" x2="1" y2="17" />
            </svg>
          </button>
        </div>

        {/* Links */}
        <nav className="px-6 py-4 flex flex-col gap-1">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={[
                'py-3 px-4 rounded-xl text-base font-medium transition-colors duration-150',
                'focus-visible:outline-2 focus-visible:outline-red-500',
                isActive(link.to)
                  ? 'text-red-600 bg-red-50'
                  : 'text-gray-700 hover:text-red-600 hover:bg-red-50',
              ].join(' ')}
            >
              {link.label}
            </Link>
          ))}

          {/* CTA at bottom */}
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-4 py-3 px-4 rounded-full text-base font-semibold text-center text-white bg-red-600 hover:bg-red-700 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-red-500"
          >
            Contact Us
          </Link>
        </nav>
      </div>
    </>
  )
}
