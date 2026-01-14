import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AirQuality.css';
import { FaHome, FaClock, FaCalendarDay, FaCalendarAlt, FaSmog } from 'react-icons/fa';

const AirQuality = () => {
  const [airQuality, setAirQuality] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');
  const [coords, setCoords] = useState({ lat: '30.3165', lon: '78.0322' }); 

  const apiKey = 'f5685377f1da8895a65d923c38d3c4a0'; 

  useEffect(() => {
    if (coords.lat && coords.lon) {
      const fetchAirQualityData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/air_pollution?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}`
          );
          setAirQuality(response.data);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
          console.error('Error fetching the air quality data:', error.response ? error.response.data : error.message);
        }
      };

      fetchAirQualityData();
    }
  }, [coords, apiKey]);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      const { lat, lon } = response.data.coord;
      setCoords({ lat, lon });
    } catch (error) {
      setError(error);
      setLoading(false);
      console.error('Error fetching the coordinates:', error.response ? error.response.data : error.message);
    }
  };

  const Navbar = () => (
    <nav className="navbar">
      <ul className="nav-links">
        <li><a href="/"><FaHome /> Home</a></li>
        <li><a href="/hourly"><FaClock /> Hourly</a></li>
        <li><a href="/daily"><FaCalendarDay /> Daily</a></li>
        <li><a href='/airquality'><FaSmog /> Air Quality</a></li>
      </ul>
    </nav>
  );

  return (
    <div className="quality">
      <Navbar />
      <div className="air-quality-container">
        <h2>Air Quality Index for the Location</h2>
        <div className="search-bar">
          <input 
            type="text" 
            value={city} 
            onChange={(e) => setCity(e.target.value)} 
            placeholder="Enter city name" 
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        {loading && <div className="loading">Loading air quality data...</div>}
        {error && <div className="error">Error: {error.message}</div>}
        {airQuality && !loading && !error && (
          <div className="air-quality-data">
            <p className="aqi">Air Quality Index (AQI): {airQuality.list[0].main.aqi}</p>
            <h3>Components:</h3>
            <div className="components">
              <p>Concentration of CO: {airQuality.list[0].components.co} µg/m³</p>
              <p>Concentration of NO: {airQuality.list[0].components.no} µg/m³</p>
              <p>Concentration of NO2: {airQuality.list[0].components.no2} µg/m³</p>
              <p>Concentration of O3: {airQuality.list[0].components.o3} µg/m³</p>
              <p>Concentration of SO2: {airQuality.list[0].components.so2} µg/m³</p>
              <p>Concentration of PM2.5: {airQuality.list[0].components.pm2_5} µg/m³</p>
              <p>Concentration of PM10: {airQuality.list[0].components.pm10} µg/m³</p>
              <p>Concentration of NH3: {airQuality.list[0].components.nh3} µg/m³</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AirQuality;
