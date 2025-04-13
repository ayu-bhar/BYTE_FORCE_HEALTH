import React, { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './styles/MobNav.css'
function MobileNavBar() {
  const navRef = useRef();
  const [open, setOpen] = useState(false);
  return (
    <div id = "mobNavBar">


      <div className="upper flex">
        <div className="up-left">
          <div className="logo flex-col">
            <svg width="50" height="60" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="20" y="50" width="80" height="20" rx="10" fill="#ef4444" />
              <rect x="50" y="20" width="20" height="80" rx="10" fill="#ef4444" />
            </svg>
            <h2>Health buddies</h2>
            <h3>We care for your health</h3>
          </div>
        </div>


        <div className="up-right flex">
          <NavLink>
            <lord-icon
              src="https://cdn.lordicon.com/nnzfcuqw.json"
              trigger="hover"
              stroke="bold"
              colors="primary:white,secondary:#ee6d66">
            </lord-icon>
          </NavLink>
          <NavLink>
            <lord-icon
              src="https://cdn.lordicon.com/papxnmwt.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#66a1ee,secondary:#e83a30">
            </lord-icon>
          </NavLink>
        </div>


      </div>


      <div className="left flex-col">
        <div className="show" onClick={() => setOpen(!open)}>
          <lord-icon
            src="https://cdn.lordicon.com/jectmwqf.json"
            trigger="hover"
            stroke="bold"
            colors="primary:#66a1ee,secondary:#9ce5f4">
          </lord-icon>
        </div>
        <nav ref={navRef} className={`mobnavBar flex-col ${open ? 'showL' : 'hideL'}`}>

          {/* { this seprates the logo} */}
          <NavLink to = "/profile">
            <div className="side flex">
          <lord-icon
              src="https://cdn.lordicon.com/kdduutaw.json"
              trigger="hover"
              colors="primary:#121331,secondary:#000000"
            >
            </lord-icon>
          </div>
          </NavLink>
          

          {/* { this seprates the logo and the content} */}

          <div className="content flex-col">
            <NavLink to = "/"><li>Home</li></NavLink>
            <NavLink to ="/hospital"><li>Hostpitals</li></NavLink>
            <NavLink to = "/bloodbank"><li>Blood banks</li></NavLink>
            <NavLink to = "/medicines"><li>Medicines</li></NavLink>
          </div>

          {/* { this seprates the content with the side} */}
          
        </nav>
      </div>
    </div>
  )
}
export default MobileNavBar
