import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import SearchBar from "../components/Searchbar";
import Hospital from "./Hospital";
import Navbar from "../components/Navbar";

const Mainhospital = () => {
  //all the variables used in the following component

  const [location, setLocation] = useState(null); // User's current location
  const [query, setQuery] = useState("hospitals"); // Search query
  const [hospitals, setHospitals] = useState([]); // Nearby hospitals
  const [selectedHospital, setSelectedHospital] = useState(null); // Selected hospital for InfoWindow
  const mapRef = useRef(null); // Map reference
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // Google Maps API key
  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  // Getting user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => console.error("Location error:", error)
    );
  }, []);

  // Handle map load
  const handleMapLoad = (map) => {
    mapRef.current = map;
    if (location && query) {
      searchNearbyHospitals(query);
    }
  };

  // Get photo URL (optional handling for images)
  const getPhotoUrl = (photo) => {
    return photo
      ? photo.getUrl({ maxWidth: 400, maxHeight: 300 })
      : "default-hospital.jpg";
  };

  // Perform hospital search
  const searchNearbyHospitals = (keyword) => {
    if (!mapRef.current || !window.google) return;
  
    const service = new window.google.maps.places.PlacesService(mapRef.current);
  
    const request = {
      location: location,
      radius: 5000,
      keyword: keyword || "hospital",
      type: "hospital",
    };
  
    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const detailedHospitals = [];
        let completed = 0;
  
        results.forEach((place) => {
          service.getDetails(
            {
              placeId: place.place_id,
              fields: [
                "name",
                "vicinity",
                "geometry",
                "photos",
                "opening_hours",
                "website",
              ],
            },
            (result, status) => {
              completed++;
              if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                detailedHospitals.push(result);
              }
              if (completed === results.length) {
                setHospitals(detailedHospitals);
              }
            }
          );
        });
      } else {
        console.error("Places request failed:", status);
        setHospitals([]);
      }
    });
  };
  

  const handleSearch = (val) => {
    setQuery(val);
    if (location && mapRef.current) {
      searchNearbyHospitals(val);
    }
  };

  const libraries = ["places"]; // Load Places Library

  return (
    <div>
      <Navbar/>
      
      <SearchBar onSearch={handleSearch} />

      {/* Load Maps JavaScript SDK */}
      <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
        {location && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={location}
            zoom={13}
            onLoad={handleMapLoad}
          >
            {/* Marker for User's Location */}
            <Marker
              position={location}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png", // Custom icon for user's location
              }}
              title="You are here"
            />

            {/* Display markers for hospitals */}
            {hospitals.map((hospital, index) => (
              <Marker
                key={index}
                position={{
                  lat: hospital.geometry.location.lat(),
                  lng: hospital.geometry.location.lng(),
                }}
                onClick={() => setSelectedHospital(hospital)} // Open InfoWindow when a marker is clicked
              />
            ))}

            {/* InfoWindow for the selected hospital */}
            {selectedHospital && (
              <InfoWindow
                position={{
                  lat: selectedHospital.geometry.location.lat(),
                  lng: selectedHospital.geometry.location.lng(),
                }}
                onCloseClick={() => setSelectedHospital(null)} // Close InfoWindow on click
              >
                <div>
                  <h3>{selectedHospital.name}</h3>
                  <p>{selectedHospital.vicinity}</p>
                  <img
                    src={getPhotoUrl(selectedHospital.photos?.[0])}
                    alt={selectedHospital.name}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        )}
      </LoadScript>

      <div className="hospitalList">
        {/* Display a list of hospitals */}
        {hospitals.map((hospital, index) => (
          <Hospital
            key={index}
            data={hospital}
            imgUrl={getPhotoUrl(hospital.photos?.[0])}
          />
        ))}
      </div>
    </div>
  );
};

export default Mainhospital;
