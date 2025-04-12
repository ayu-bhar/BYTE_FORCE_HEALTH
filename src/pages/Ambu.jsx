import react from "react";
import Navbar from "../components/Navbar";
import "../components/styles/ambu.css";
import Footer from "../components/Footer";
import axios from "axios";
import { useEffect, useState } from "react";

function Ambu() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const lat = 25.618118;
        const lng = 85.172247;
        const type = "cafe";

        const response = await axios.get(
          `http://localhost:3000/api/places?lat=${lat}&lng=${lng}&type=${type}`
        );
        setPlaces(response.data);
      } catch (err) {
        console.error("Error fetching places:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  return;
  <div>
    <Navbar />

    <div style={{ padding: "2rem" }}>
      <h1>Nearby Cafes</h1>
      {loading ? (
        <p>Loading...</p>
      ) : places.length === 0 ? (
        <p>No places found.</p>
      ) : (
        <ul>
          {places.map((place) => (
            <li key={place.place_id}>
              <strong>{place.name}</strong> — {place.vicinity}
            </li>
          ))}
        </ul>
      )}
    </div>

    {/* <div className='ambuh flex-col items-center'>
                <h1><b>Ambulance service</b></h1>
                <h3>Rapid response and patient care,anytime and anywhere</h3>
               
            </div>


            <div className='ambuh flex-col items-center mb-5'>
                <div className='pok mb-4 mu-4 flex-col items-center'>
                    <h1><b>Emergency  Response</b></h1>
                    <p style={{fontSize:'20px'}}>Quick and efficient transportation to healthcare facilities during emergencies.
                    </p>
                    <h3>Contact Us +918674985947</h3>
                </div>
                <div className='pok mb-4 flex-col items-center'>
                <h1><b>Non-Emergency Transport</b></h1>
                <p style={{fontSize:'20px'}}>Safe and reliable transport for patients requiring routine visits or transfers.</p>
                <h3>Contact Us +918674985947</h3></div>
                <div className='pok flex-col items-center '>
                <h1><b>Special Care Ambulances</b></h1>
                <p style={{fontSize:'20px'}}>Equipped with advanced medical facilities to handle critical cases.</p>
                </div>
            </div> 
                <h3>Contact Us +918674985947</h3></div>
            </div>*/}

    <Footer />
  </div>;
}

export default Ambu;
