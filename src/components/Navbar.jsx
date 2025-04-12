import React from 'react';
import { NavLink } from 'react-router-dom';
import Dropdown from './Dropdown';

function Navbar() {
  const store = localStorage.getItem('isAuthenticated');
  let storen = "";
  if (store === 'true') {
    storen = JSON.parse(localStorage.getItem('user')).Name;
  }
  return (
    <div>
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px',
          background: 'linear-gradient(to right, #f3f4f6, #e2e8f0)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          borderRadius: '12px',
        }}
      >
        <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
          <svg
            width="90"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="20" y="50" width="80" height="20" rx="10" fill="url(#grad1)" />
            <rect x="50" y="20" width="20" height="80" rx="10" fill="url(#grad2)" />
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#66a1ee', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#e83a30', stopOpacity: 1 }} />
              </linearGradient>
              <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#66a1ee', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#4be1ec', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
          </svg>
          <div style={{ textAlign: 'center' }}>
            <h1
              style={{
                fontSize: '2.5rem',
                fontWeight: '800',
                background: 'linear-gradient(to right, #66a1ee, #e83a30)',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Health Buddies
            </h1>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '600' }}>We care for your health</h2>
          </div>
        </div>

        {/* Navigation Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <NavLink
            to="/"
            style={{
              fontSize: '1.2rem',
              textDecoration: 'none',
              color: '#444',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#ff6b6b')}
            onMouseLeave={(e) => (e.target.style.color = '#444')}
          >
            Home
          </NavLink>
          <NavLink
            to="/hospital"
            style={{
              fontSize: '1.2rem',
              textDecoration: 'none',
              color: '#444',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#4be1ec')}
            onMouseLeave={(e) => (e.target.style.color = '#444')}
          >
            Hospitals
          </NavLink>
          <NavLink
            to="/"
            style={{
              fontSize: '1.2rem',
              textDecoration: 'none',
              color: '#444',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#51cf66')}
            onMouseLeave={(e) => (e.target.style.color = '#444')}
          >
            Blood Banks
          </NavLink>
          <NavLink
            to="/medicines"
            style={{
              fontSize: '1.2rem',
              textDecoration: 'none',
              color: '#444',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#f783ac')}
            onMouseLeave={(e) => (e.target.style.color = '#444')}
          >
            Medicines
          </NavLink>
          <Dropdown />
          <NavLink to="/ambulance">
            <lord-icon
              src="https://cdn.lordicon.com/papxnmwt.json"
              trigger="hover"
              colors="primary:#66a1ee,secondary:#e83a30"
            ></lord-icon>
          </NavLink>
        </div>

        {/* Side Profile */}
        <div style={{ display: 'flex', alignItems: 'center', float: 'right' }}>
          <NavLink to="/profile" style={{ display: 'flex', alignItems: 'center' }}>
            <lord-icon
              src="https://cdn.lordicon.com/rzsnbiaw.json"
              trigger="hover"
              colors="primary:#4be1ec,secondary:#9cf4a7"
            ></lord-icon>
            {store === 'true' && (
              <p style={{ fontSize: '1rem', fontWeight: 'bold', color: '#10b981', marginLeft: '8px' }}>
                {storen}
              </p>
            )}
          </NavLink>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
