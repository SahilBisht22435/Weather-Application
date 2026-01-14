// f5685377f1da8895a65d923c38d3c4a0
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Hourly.css';
import { FaHome, FaClock, FaCalendarDay, FaCalendarAlt, FaSmog } from 'react-icons/fa'; 

const Hourly = () => {
    const [hourlyData, setHourlyData] = useState([]);
    const [locationError, setLocationError] = useState('');

    useEffect(() => {
        const fetchWeather = async (latitude, longitude) => {
            const apiKey = 'f5685377f1da8895a65d923c38d3c4a0';
            const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=f5685377f1da8895a65d923c38d3c4a0&units=metric`;
    
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setHourlyData(data.list.slice(0, 8)); 
            } catch (error) {
                console.error('Error fetching data:', error);
                setLocationError('Failed to fetch weather data.');
            }
        };
    
        const getLocation = () => {
            if (!navigator.geolocation) {
                setLocationError('Geolocation is not supported by your browser');
                return;
            }
    
            navigator.geolocation.getCurrentPosition((position) => {
                fetchWeather(position.coords.latitude, position.coords.longitude);
            }, () => {
                setLocationError('Unable to retrieve your location');
            });
        };
    
        getLocation();
    }, []);
    

    return (
        <div className='container'>
              <header className="head1-bar">
                <Link to="/" className="nav-link"><FaHome /> Home</Link>
                <Link to="/hourly" className="nav-link"><FaClock /> Hourly</Link>
                <Link to="/daily" className="nav-link"><FaCalendarDay /> Daily</Link>
                <Link to="/airquality" className="nav-link"><FaSmog /> AirQuality</Link>
            </header>
        <div className="forecast-container">    
        {locationError && <p>{locationError}</p>}
        {hourlyData.length > 0 ? hourlyData.map((hour, index) => (
            <div key={index} className="forecast-item">
                <h2>{new Date(hour.dt * 1000).getHours()}:00</h2>
                <img src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`} alt={hour.weather[0].description} />
                <div className="temp">{hour.main.temp.toFixed(1)}°C</div>
                <div className="description">{hour.weather[0].description}</div>
                <div className="wind">Wind: {hour.wind.speed} m/s</div>
                {hour.wind.gust && <div className="gust">Gust: {hour.wind.gust} m/s</div>}
                <div className="humidity">Humidity: {hour.main.humidity}%</div>
                <div className="visibility">Visibility: {hour.visibility / 1000} km</div>
            </div>
        )) : <p>Loading forecast...</p>}
    </div></div>
    );
};

export default Hourly;
