import React from 'react'
import './boox.css'
import { Link } from 'react-router-dom'

function Box() {
    return (
        <div className='my-5'>
            <div className="bbox" style={{ display: 'flex', alignItems: 'center', }}>
                <div className='box flex-col items-center'>
                    <div className="icon">
                        <lord-icon id="drop"
                            src="https://cdn.lordicon.com/btvefodi.json"
                            trigger="hover"
                            stroke="bold"
                            colors="primary:#ee6d66,secondary:#e83a30">
                        </lord-icon>
                    </div>
                    <h1 className='center'>LETS DONATE</h1>
                    <h1 className='center'>YOUR BLOOD</h1>


                </div>
                <div className='box flex-col items-center'>
                    <lord-icon id="drop"
                        src="https://cdn.lordicon.com/fyutcuil.json"
                        trigger="hover"
                        stroke="bold">
                    </lord-icon>
                    <h1 className='center'> MEDICINES</h1>
                    <h1 className='center'> DELIVERY</h1>
                </div>
                <Link to='/carecompass' className='box flex-col items-center'>
                    <div className='box flex-col items-center'>
                        <lord-icon id="drop"
                            src="https://cdn.lordicon.com/vzomtgvp.json"
                            trigger="hover"
                            stroke="bold"
                        >

                        </lord-icon>
                        <h1 className='center'>CARE COMPAS</h1>
                    </div>
                </Link>
            </div>
            <div>
                <h1><b>About Us</b></h1>
                <p>Welcome to <b>Health Buddies</b>! Our mission is to make healthcare resources accessible, reliable, and quick to locate. Through our platform, you can effortlessly find nearby hospitals and blood banks, along with real-time updates on blood availability.
                    In moments of urgency, every second matters—that’s why we also offer ambulance services to ensure timely and efficient access to medical care. Additionally, we are dedicated to promoting community well-being through awareness programs that educate and empower individuals on vital healthcare topics.
                    Whether you're aiding a loved one, helping a stranger in need, or seeking to stay informed, we are here to guide and support you. Together, let's build a healthier, more connected community where help is always within reach.
                </p>
            </div>
        </div>



    )
}

export default Box
