import React, { useState, useEffect } from 'react';
import './Daily.css'
import axios from 'axios';
import { FaHome, FaClock, FaCalendarDay, FaCalendarAlt, FaSmog } from 'react-icons/fa';

const Daily = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = 'dc94403de01040cb80025029242705'; 
  const CITY = 'Kotdwara'; 

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${CITY}&days=10`); 
        setWeatherData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  const Navbar = () => (
    <nav className="navbar">
      <ul className="nav-links">
        <li><a href="/"><FaHome /> Home</a></li>
        <li><a href="/hourly"><FaClock /> Hourly</a></li>
        <li><a href="/daily"><FaCalendarDay /> Daily</a></li>
        <li><a href='/airquality'><FaSmog /> AirQuality</a></li>
      </ul>
    </nav>
  );

  return (
    <div className='daily_data'>
       
      <div className="weather-container"><Navbar />
        <h2 className="title">Upcoming Days Weather Forecast for {CITY}</h2>
        {weatherData && (
          <ul className="weather-list">
            {weatherData.forecast.forecastday.map((dayData, index) => (
              <li key={index} className="weather-item">
                <p className="date">Date: {dayData.date}</p>
                <p className="temperature">Max Temperature: {dayData.day.maxtemp_c}°C</p>
                <p className="temperature">Min Temperature: {dayData.day.mintemp_c}°C</p>
                <p className="condition">{dayData.day.condition.text}</p>
                <img src={dayData.day.condition.icon} alt={dayData.day.condition.text} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Daily;
