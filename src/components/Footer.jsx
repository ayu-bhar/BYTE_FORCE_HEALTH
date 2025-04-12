import React from 'react'
import './styles/Footer.css'
import { NavLink } from 'react-router-dom'
function Footer() {
    return (
        <>
            <footer className='footer'>
                <nav className="foot-navBar flex">
                    <div className="copyRight">
                        <p>© 2025 All rights reserved</p>
                        <p>Designed by <span className='name'>Byte Force</span></p>

                    </div>
                    
                    <div className="content flex">
                        <NavLink className={"emergency"}>
                            
                                <lord-icon
                                src="https://cdn.lordicon.com/nnzfcuqw.json"
                                trigger="hover"
                                stroke="bold"
                                colors="primary:#282c34,secondary:#ee6d66">
                            </lord-icon>                            
                        </NavLink>
                        <NavLink>Doctors</NavLink>
                        <NavLink>Operation Threaters</NavLink>

                    </div>

                </nav>
            </footer>
        </>
    )
}

export default Footer
