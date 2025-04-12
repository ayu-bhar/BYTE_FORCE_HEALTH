import React from "react";
import Navbar from "../components/Navbar";


function Care() {
    return (
        <div style={{
            fontFamily: 'Arial, sans-serif',
            background: 'linear-gradient(to bottom, #a8e6cf, #dcedc1)', // Green gradient remains for the background
            padding: '20px',
            minHeight: '100vh'
        }}>
            <Navbar />
            <div style={{
                margin: '40px auto',
                maxWidth: '800px',
                textAlign: 'center',
                padding: '30px',
                borderRadius: '15px',
                backgroundColor: '#ffffff',
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
                border: '1px solid #e2e8f0'
            }}>
                {/* Title */}
                <h1 style={{
                    fontSize: '40px',
                    fontWeight: 'bold',
                    marginBottom: '25px',
                    textShadow: '3px 3px 5px #a0aec0', // Adjusted shadow for title
                    color: '#1a202c'
                }}>
                    CareCompass
                </h1>

                {/* Mission Section */}
                <p style={{
                    fontSize: '18px',
                    lineHeight: '1.8',
                    color: '#4a5568',
                    marginBottom: '30px',
                    textAlign: 'justify'
                }}>
                    Welcome to <b>Health Buddies</b>! At CareCompass, we believe that awareness is the key to a healthier and happier life. Our mission is to educate and empower communities to take proactive steps toward well-being by providing practical health tips and resources.
                </p>

                {/* Key Highlights Section */}
                <div style={{ textAlign: 'left', fontSize: '16px', marginBottom: '25px' }}>
                    <h2 style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        marginBottom: '15px',
                        color: '#2d3748'
                    }}>
                        Highlights:
                    </h2>
                    <ul style={{
                        listStyleType: 'square',
                        paddingLeft: '25px',
                        lineHeight: '1.8',
                        color: '#4a5568' // Neutral color for list items
                    }}>
                        <li><b>Emergency Preparedness:</b> Guidance for managing medical emergencies efficiently.</li>
                        <li><b>Basic First Aid:</b> Quick tips to handle emergencies like CPR and treating wounds.</li>
                        <li><b>Healthy Lifestyle Tips:</b> Insights for balanced nutrition, exercise, and mental well-being.</li>
                        <li><b>Daily Hygiene Habits:</b> Simple practices for maintaining cleanliness and health.</li>
                    </ul>
                </div>

                {/* First Aid Section */}
                <div style={{ textAlign: 'left', fontSize: '16px', marginBottom: '25px' }}>
                    <h2 style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        marginBottom: '15px',
                        color: '#2d3748'
                    }}>
                        Basic First Aid:
                    </h2>
                    <ul style={{
                        listStyleType: 'circle',
                        paddingLeft: '25px',
                        lineHeight: '1.8',
                        color: '#4a5568'
                    }}>
                        <li>Perform the 3 Cs: Check your surroundings, Call for help, and Care for the injured.</li>
                        <li>Check for responsiveness and breathing.</li>
                        <li>Stop bleeding and clean wounds carefully.</li>
                        <li>Stay calm and act efficiently.</li>
                    </ul>
                </div>

                {/* Call to Action Section */}
                <div style={{
                    padding: '20px',
                    borderRadius: '10px',
                    backgroundColor: '#b2f0d5', // Vibrant green background for call-to-action remains
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center',
                    border: '1px solid #88d498'
                }}>
                    <h2 style={{
                        fontSize: '22px',
                        fontWeight: 'bold',
                        marginBottom: '10px',
                        color: '#2563eb'
                    }}>
                        Join Us!
                    </h2>
                    <p style={{
                        fontSize: '16px',
                        lineHeight: '1.8',
                        color: '#4a5568'
                    }}>
                        Together, we can spread awareness and build a community that prioritizes health and preparedness. Join us in making a difference for a better tomorrow!
                    </p>
                </div>
            </div>
           
        </div>
    );
}

export default Care;