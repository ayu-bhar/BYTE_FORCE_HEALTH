import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';

const containerStyle = {
  width: '100%',
  height: '500px'
};

const Medicine = () => {
  const [center, setCenter] = useState(null);
  const [medicalShops, setMedicalShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  const [radius, setRadius] = useState(1500); // meters
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Get user location and nearby medical shops
  const fetchMedicalShops = async (lat, lng) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:3000/api/medical-shops', {
        params: { lat, lng, radius }
      });
      setMedicalShops(response.data);
    } catch (err) {
      console.error("Error fetching medical shops:", err);
      setError("Failed to fetch medical shops. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Get current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
          fetchMedicalShops(latitude, longitude);
        },
        (err) => {
          console.error("Error getting location:", err);
          setError("Couldn't get your location. Using default location.");
          // Fallback to default location (e.g., city center)
          const defaultLocation = { lat: 28.6139, lng: 77.2090 }; // Delhi coordinates
          setCenter(defaultLocation);
          fetchMedicalShops(defaultLocation.lat, defaultLocation.lng);
        }
      );
    }
  }, [radius]);

  return (
    <div className="medical-shops-finder">
      
      <div className="controls">
        <label>
          Search Radius (meters):
          <input
            type="range"
            min="500"
            max="5000"
            step="100"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
          />
          {radius}m
        </label>
        <button
          onClick={() => center && fetchMedicalShops(center.lat, center.lng)}
          className="my-1 cursor-pointer px-6 mx-5 py-2 bg-green-400 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition duration-200"
        >
          Refresh
        </button>
      </div>

      {error && <div className="error">{error}</div>}
      {loading && <div>Loading medical shops...</div>}

      {center && (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={14}
          >
            {/* Current location marker */}
            <Marker
              position={center}
              icon={{
                url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
              }}
            />
            
            {/* Medical shops markers */}
            {medicalShops.map((shop) => (
              <Marker
                key={shop.id}
                position={shop.location}
                onClick={() => setSelectedShop(shop)}
                icon={{
                  url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                }}
              />
            ))}

            {/* Selected shop info window */}
            {selectedShop && (
              <InfoWindow
                position={selectedShop.location}
                onCloseClick={() => setSelectedShop(null)}
              >
                <div className="shop-info">
                  <h3>{selectedShop.name}</h3>
                  <p>{selectedShop.address}</p>
                  {selectedShop.rating && (
                    <p>Rating: {selectedShop.rating} ★</p>
                  )}
                  {selectedShop.openNow !== undefined && (
                    <p>{selectedShop.openNow ? '🟢 Open Now' : '🔴 Closed'}</p>
                  )}
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${selectedShop.location.lat},${selectedShop.location.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Directions
                  </a>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      )}

      <div className="medical-shops-list-container bg-transparent shadow-md rounded-lg p-4 mt-6 max-h-80 overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">
          Nearby Medical Shops ({medicalShops.length})
        </h3>
        <ul className="space-y-3">
          {medicalShops.map((shop) => (
            <li
              key={shop.id}
              onClick={() => setSelectedShop(shop)}
              className="flex items-center p-3 border border-green-400 rounded-lg hover:bg-green-300 cursor-pointer"
            >
              {/* Open/Closed Indicator */}
              <div
                className={`w-4 h-4 rounded-full mr-4 ${
                  shop.openNow ? 'bg-green-500' : 'bg-red-500'
                }`}
                title={shop.openNow ? 'Open Now' : 'Closed'}
              ></div>

              {/* Shop Details */}
              <div>
                <strong className="block text-base font-medium text-gray-800">
                  {shop.name}
                </strong>
                <span className="text-sm text-gray-600">{shop.address}</span>
                {shop.rating && (
                  <span className="block text-sm text-yellow-500">
                    Rating: {shop.rating} ★
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Medicine;