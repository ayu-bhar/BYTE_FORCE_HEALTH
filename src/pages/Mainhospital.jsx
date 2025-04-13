import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import SearchBar from "../components/Searchbar";
import Navbar from "../components/Navbar";
import '../components/styles/medical.css';

const Mainhospital = () => {
  const [location, setLocation] = useState(null);
  const [query, setQuery] = useState("hospitals");
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const mapRef = useRef(null);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

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

  const handleMapLoad = (map) => {
    mapRef.current = map;
    if (location && query) {
      searchNearbyHospitals(query);
    }
  };

  const getPhotoUrl = (photo) => {
    return photo
      ? photo.getUrl({ maxWidth: 400, maxHeight: 300 })
      : "default-hospital.jpg";
  };

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
              fields: ["name", "vicinity", "geometry", "photos", "opening_hours", "website"],
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

  const handleBooking = (hospital) => {
    setSelectedHospital({ ...hospital, fromBooking: true });
  };

  const libraries = ["places"];

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <SearchBar onSearch={handleSearch} />

      <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
        {location && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={location}
            zoom={13}
            onLoad={handleMapLoad}
          >
            <Marker
              position={location}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              }}
              title="You are here"
            />

            {hospitals.map((hospital, index) => (
              <Marker
                key={index}
                position={{
                  lat: hospital.geometry.location.lat(),
                  lng: hospital.geometry.location.lng(),
                }}
                onClick={() => setSelectedHospital({ ...hospital, fromMap: true })}
              />
            ))}

            {selectedHospital?.fromMap && (
              <InfoWindow
                position={{
                  lat: selectedHospital.geometry.location.lat(),
                  lng: selectedHospital.geometry.location.lng(),
                }}
                onCloseClick={() => setSelectedHospital(null)}
              >
                <div>
                  <h3>{selectedHospital.name}</h3>
                  <p>{selectedHospital.vicinity}</p>
                  <div className="flex items-center">
                    <div
                      className={`w-4 h-4 rounded-full mr-2 ${
                        selectedHospital.opening_hours?.open_now ? 'bg-green-500' : 'bg-red-500'
                      }`}
                      title={selectedHospital.opening_hours?.open_now ? 'Open Now' : 'Closed'}
                    ></div>
                    <span>
                      {selectedHospital.opening_hours?.open_now ? 'Open Now' : 'Closed'}
                    </span>
                  </div>
                  {selectedHospital.photos?.[0] && (
                    <img
                      src={getPhotoUrl(selectedHospital.photos[0])}
                      alt={selectedHospital.name}
                      style={{ width: "100%", height: "auto" }}
                    />
                  )}
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        )}
      </LoadScript>

      <div className="hospitalList bg-transparent shadow-lg rounded-lg p-6 mt-6 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-200">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Nearby Hospitals ({hospitals.length})
        </h3>
        <ul className="space-y-4">
          {hospitals.map((hospital, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-green-300 hover:shadow-md transition-shadow duration-200 cursor-pointer"
              onClick={() => setSelectedHospital(hospital)}
            >
              <div className="flex items-center">
                {hospital.photos?.[0] && (
                  <img
                    src={getPhotoUrl(hospital.photos[0])}
                    alt={hospital.name}
                    className="w-16 h-16 rounded-lg object-cover mr-4"
                  />
                )}
                <div>
                  <strong className="block text-lg font-medium text-gray-800">
                    {hospital.name}
                  </strong>
                  <span className="text-sm text-gray-600">{hospital.vicinity}</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div
                  className={`w-5 h-5 rounded-full ${
                    hospital.opening_hours?.open_now ? 'bg-green-500' : 'bg-red-500'
                  }`}
                  title={hospital.opening_hours?.open_now ? 'Open Now' : 'Closed'}
                ></div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBooking(hospital);
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                >
                  Book Now
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {selectedHospital?.fromBooking && (
        <div className="relative mt-8 p-6 border rounded-lg shadow-md bg-white max-w-2xl mx-auto">
          <button
            onClick={() => setSelectedHospital(null)}
            className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-lg"
          >
            ✕
          </button>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Booking Details: {selectedHospital.name}
          </h2>
          <p className="text-gray-700 mb-2">Address: {selectedHospital.vicinity}</p>
          <p className="text-gray-700 mb-4">
            Status: {selectedHospital.opening_hours?.open_now ? 'Open Now' : 'Closed'}
          </p>
          {selectedHospital.photos?.[0] && (
            <img
              src={getPhotoUrl(selectedHospital.photos[0])}
              alt={selectedHospital.name}
              className="w-full max-w-md rounded-md"
            />
          )}
          <button
            onClick={() => alert("Booking Confirmed!")}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
          >
            Confirm Booking
          </button>
        </div>
      )}
    </div>
  );
};

export default Mainhospital;
