import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import SearchBar from "../components/Searchbar";
import Hospital from "./Hospital";
import Navbar from "../components/Navbar";
import '../components/styles/medical.css'
const Mainbloodbank = () => {
  //all the variables used in the following component

  const [location, setLocation] = useState(null); // User's current location
  const [query, setQuery] = useState("hospitals"); // Search query
  const [hospitals, setBloodbank] = useState([]); // Nearby hospitals
  const [selectedHospital, setSelectedBloodbank] = useState(null); // Selected hospital for InfoWindow
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
      searchNearbyBloodbank(query);
    }
  };

  // Get photo URL (optional handling for images)
  const getPhotoUrl = (photo) => {
    return photo
      ? photo.getUrl({ maxWidth: 400, maxHeight: 300 })
      : "default-hospital.jpg";
  };

  // Perform hospital search
  const searchNearbyBloodbank = (keyword) => {
    if (!mapRef.current || !window.google) return;
  
    const service = new window.google.maps.places.PlacesService(mapRef.current);
  
    const request = {
      location: location,
      radius: 5000,
      keyword: keyword || "bloodbank",
      type: "bloodbank",
    };
  
    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const detailedBloodbank = [];
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
                detailedBloodbank.push(result);
              }
              if (completed === results.length) {
                setBloodbank(detailedBloodbank);
              }
            }
          );
        });
      } else {
        console.error("Places request failed:", status);
        setBloodbank([]);
      }
    });
  };
  

  const handleSearch = (val) => {
    setQuery(val);
    if (location && mapRef.current) {
      searchNearbyBloodbank(val);
    }
  };

  const libraries = ["places"]; // Load Places Library

  return (
    <div className="overflow-x-hidden">
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
            {bloodbank.map((bloodbank, index) => (
              <Marker
                key={index}
                position={{
                  lat: bloodbank.geometry.location.lat(),
                  lng: bloodbank.geometry.location.lng(),
                }}
                onClick={() => setSelectedHospital({ ...hospital, fromMap: true })} // Open InfoWindow when a marker is clicked
              />
            ))}

            {/* InfoWindow for the selected hospital */}
            {selectedBloodbank && (
              <InfoWindow
                position={{
                  lat: selectedBloodbank.geometry.location.lat(),
                  lng: selectedBloodbank.geometry.location.lng(),
                }}
                onCloseClick={() => setSelectedHospital(null)} // Close InfoWindow on click
              >
                <div>
                  <h3>{selectedBloodbank.name}</h3>
                  <p>{selectedBloodbank.vicinity}</p>
                  <div className="flex items-center">
                    {/* Open/Closed Indicator */}
                    <div
                      className={`w-4 h-4 rounded-full mr-2 ${
                        selectedBloodbank.opening_hours?.open_now ? 'bg-green-500' : 'bg-red-500'
                      }`}
                      title={selectedBloodbank.opening_hours?.open_now ? 'Open Now' : 'Closed'}
                    ></div>
                    <span>
                      {selectedBloodbank.opening_hours?.open_now ? 'Open Now' : 'Closed'}
                    </span>
                  </div>
                  {/* Conditionally render the image only if selected from the map */}
                  {selectedBloodbank.fromMap && selectedBloodbank.photos?.[0] && (
                    <img
                      src={getPhotoUrl(selectedBloodbank.photos[0])}
                      alt={selectedBloodbank.name}
                      style={{ width: "100%", height: "auto" }}
                    />
                  )}
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        )}
      </LoadScript>

      {/* Hospital List */}
      <div className="hospitalList bg-transparent shadow-lg rounded-lg p-6 mt-6 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-200">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Nearby Bloodbank ({bloodbank.length})
        </h3>
        <ul className="space-y-4">
          {bloodbank.map((bloodbank, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-green-300 hover:shadow-md transition-shadow duration-200 cursor-pointer"
              onClick={() => setSelectedBloodbank(bloodbank)} // Set the selected hospital when clicked
            >
              {/* Left Section: Image and Details */}
              <div className="flex items-center">
                {/* Optional Image */}
                {bloodbank.photos?.[0] && (
                  <img
                    src={getPhotoUrl(bloodbank.photos[0])}
                    alt={bloodbank.name}
                    className="w-16 h-16 rounded-lg object-cover mr-4"
                  />
                )}

                {/* bloodbank Details */}
                <div>
                  <strong className="block text-lg font-medium text-gray-800">
                    {bloodbank.name}
                  </strong>
                  <span className="text-sm text-gray-600">{bloodbank.vicinity}</span>
                </div>
              </div>

              {/* Right Section: Open/Closed Indicator */}
              <div
                className={`w-5 h-5 rounded-full ${
                  bloodbank.opening_hours?.open_now ? 'bg-green-500' : 'bg-red-500'
                }`}
                title={bloodbank.opening_hours?.open_now ? 'Open Now' : 'Closed'}
              ></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Mainbloodbank;