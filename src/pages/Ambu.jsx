import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Ambu() {
  return (
    <div className="bg-transparent min-h-screen flex flex-col">
      <Navbar />
      {/* Header Section */}
      <div className="ambuh flex flex-col items-center text-center py-10 bg-gradient-to-r from-blue-500 to-cyan-400 text-white">
        <h1 className="text-4xl font-bold mb-3">Ambulance Services</h1>
        <h3 className="text-lg font-medium">
          Rapid response and patient care, anytime and anywhere
        </h3>
      </div>

      {/* Services Section */}
      <div className="ambuh flex flex-col items-center py-10 space-y-8">
        {/* Emergency Response */}
        <div className="pok bg-white shadow-lg rounded-lg p-6 w-11/12 md:w-3/4 lg:w-1/2 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            Emergency Response
          </h1>
          <p className="text-gray-600 text-lg mb-4">
            Quick and efficient transportation to healthcare facilities during
            emergencies.
          </p>
          <h3 >
            <span className="text-blue-500 font-semibold text-lg">Contact Us: </span><span className="text-red-500 font-semibold text-lg">+91867498XXXX</span>
            
          </h3>
        </div>

        {/* Non-Emergency Transport */}
        <div className="pok bg-white shadow-lg rounded-lg p-6 w-11/12 md:w-3/4 lg:w-1/2 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            Non-Emergency Transport
          </h1>
          <p className="text-gray-600 text-lg mb-4">
            Safe and reliable transport for patients requiring routine visits or
            transfers.
          </p>
          <h3 >
            <span className="text-blue-500 font-semibold text-lg">Contact Us: </span><span className="text-red-500 font-semibold text-lg">+91867498XXXX</span>
            
          </h3>
        </div>

        {/* Special Care Ambulances */}
        <div className="pok bg-white shadow-lg rounded-lg p-6 w-11/12 md:w-3/4 lg:w-1/2 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            Special Care Ambulances
          </h1>
          <p className="text-gray-600 text-lg mb-4">
            Equipped with advanced medical facilities to handle critical cases.
          </p>
          <h3 >
            <span className="text-blue-500 font-semibold text-lg">Contact Us: </span><span className="text-red-500 font-semibold text-lg">+91867498XXXX</span>
            
          </h3>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Ambu;
