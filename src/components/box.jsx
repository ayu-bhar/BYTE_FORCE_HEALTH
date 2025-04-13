import React from 'react';
import './boox.css';
import { Link } from 'react-router-dom';

function Box() {
  return (
    <div
      className="my-5"
      style={{
        background: 'radial-gradient(circle, #e6ffe6, #a3ffa3)',
        padding: '20px',
        minHeight: '100vh',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Circles Section */}
      <div
        className="bbox"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          gap: '30px',
        }}
      >
        <div
          className="box flex-col items-center"
          style={{
            borderRadius: '50%',
            padding: '20px',
            boxShadow: '0 5px 10px rgba(0, 0, 0, 0.3)',
            transition: 'transform 0.3s',
            background: 'linear-gradient(to bottom, #e83a30, #ee6d66)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <div className="icon">
            <lord-icon
              id="drop"
              src="https://cdn.lordicon.com/btvefodi.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#ee6d66,secondary:#e83a30"
            ></lord-icon>
          </div>
          <h1
            className="center"
            style={{
              fontWeight: '800',
              background: 'linear-gradient(to right,rgb(184, 139, 136), #ee6d66)',

              color: 'crimson',
            }}
          >
            LETS DONATE
          </h1>
          <h1 className="center">YOUR BLOOD</h1>
        </div>
        <Link to="/medicines">
          <div
            className="box flex-col items-center"
            style={{
              borderRadius: '50%',
              padding: '20px',
              boxShadow: '0 5px 10px rgba(0, 0, 0, 0.3)',
              transition: 'transform 0.3s',
              background: 'linear-gradient(to bottom, #51cf66, #10b981)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <lord-icon
              id="drop"
              src="https://cdn.lordicon.com/fyutcuil.json"
              trigger="hover"
              stroke="bold"
            ></lord-icon>
            <h1 className="center">MEDICINE</h1>
            <h1 className="center">STORES</h1>
          </div>
        </Link>


        <Link
          to="/carecompass"
          className="box flex-col items-center"
          style={{
            borderRadius: '50%',
            padding: '20px',
            boxShadow: '0 5px 10px rgba(0, 0, 0, 0.3)',
            transition: 'transform 0.3s',
            background: 'linear-gradient(to bottom, #6a95ff, #4be1ec)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <div className="box flex-col items-center">
            <lord-icon
              id="drop"
              src="https://cdn.lordicon.com/vzomtgvp.json"
              trigger="hover"
              stroke="bold"
            ></lord-icon>
            <h1 className="center">CARE COMPASS</h1>
          </div>
        </Link>
      </div>

      {/* About Us Section */}
      <div
        style={{
          backgroundColor: 'cornsilk',
          fontSize: '20px',
          height: '100%',
          padding: '20px',
          marginTop: '20px',
          borderRadius: '12px',
          boxShadow: '0 5px 10px rgba(0, 0, 0, 0.3)',
        }}
        className="flex-col items-center"
      >
        <h1>
          <b>About Us</b>
        </h1>
        <p style={{ textAlign: 'justify' }}>
          Welcome to <b>Health Buddies</b>! Our mission is to make healthcare resources accessible, reliable, and quick to locate. Through our platform, you can effortlessly find nearby hospitals and blood banks, along with real-time updates on blood availability. In moments of urgency, every second matters—that’s why we also offer ambulance services to ensure timely and efficient access to medical care. Additionally, we are dedicated to promoting community well-being through awareness programs that educate and empower individuals on vital healthcare topics. Whether you're aiding a loved one, helping a stranger in need, or seeking to stay informed, we are here to guide and support you. Together, let's build a healthier, more connected community where help is always within reach.
        </p>
      </div>
    </div>
  );
}

export default Box;