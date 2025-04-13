import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { LoadScript } from "@react-google-maps/api";

function Ambu() {
  const [ambulanceCounts, setAmbulanceCounts] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(pos);
          findNearbyHospitals(pos);
        },
        () => {
          setError("Geolocation service failed. Using default location.");
          // Default to a known location (e.g., Delhi)
          const defaultPos = { lat: 28.6139, lng: 77.2090 };
          setUserLocation(defaultPos);
          findNearbyHospitals(defaultPos);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  const findNearbyHospitals = (location) => {
    if (!window.google) {
      setError("Google Maps API not loaded");
      return;
    }

    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );

    service.nearbySearch(
      {
        location: location,
        radius: 5000, // 5km radius
        type: "hospital",
        keyword: "emergency",
      },
      (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          estimateAmbulanceCounts(results);
        } else {
          setError("Could not fetch hospital data");
        }
        setLoading(false);
      }
    );
  };

  const estimateAmbulanceCounts = (hospitals) => {
    const hospitalData = hospitals.map((hospital) => ({
      name: hospital.name,
      ambulances: Math.floor(Math.random() * 10) + 1, // Random ambulance count (1-10)
      phone: `+91${Math.floor(1000000000 + Math.random() * 9000000000)}`, // Random phone number
    }));

    setAmbulanceCounts(hospitalData);
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={["places"]}>
      <div className="bg-transparent min-h-screen flex flex-col">
        <Navbar />
        {/* Header Section */}
        <div className="ambuh flex flex-col items-center text-center py-10 bg-gradient-to-r from-blue-500 to-cyan-400 text-white">
          <h1 className="text-4xl font-bold mb-3">Ambulance Services</h1>
          <h3 className="text-lg font-medium">
            Rapid response and patient care, anytime and anywhere
          </h3>
          {userLocation && (
            <p className="text-sm mt-2">
              Showing results near your location: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
            </p>
          )}
        </div>

        {loading && (
          <div className="text-center py-10">
            <p>Loading ambulance availability data...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-10 text-red-500">
            <p>{error}</p>
          </div>
        )}

        {/* Services Section */}
        <div className="ambuh flex flex-col items-center py-10 space-y-8">
          {ambulanceCounts.map((hospital, index) => (
            <div key={index} className="pok bg-white shadow-lg rounded-lg p-6 w-11/12 md:w-3/4 lg:w-1/2 text-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-3">{hospital.name}</h1>
              <p className="text-green-600 font-semibold mb-2">
                Ambulances Available: {hospital.ambulances}
              </p>
              <p className="text-blue-500 font-semibold">
                Contact: {hospital.phone}
              </p>
            </div>
          ))}
        </div>

        <Footer />
      </div>
    </LoadScript>
  );
}

export default Ambu;