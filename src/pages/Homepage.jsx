import React, { useState, useEffect } from 'react';
import './Homepage.css';
import { FaBars } from 'react-icons/fa';
import { RiCloseLine } from 'react-icons/ri';
import { FaSearch } from 'react-icons/fa';
import { SiGooglemaps } from "react-icons/si";
import { FaTemperatureHigh, FaWind } from "react-icons/fa";
import { MdVisibility } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";
import { RiCelsiusFill, RiFahrenheitFill } from "react-icons/ri";
import { TbWorldSearch } from "react-icons/tb";
import { FaSun, FaMoon, FaTwitter, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import { FaShareFromSquare } from "react-icons/fa6";
import { Link } from 'react-router-dom';

export default function Homepage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [city, setCity] = useState('');
  const [data, setData] = useState({});
  const [showWeatherData, setShowWeatherData] = useState(false);
  const [placeNotFound, setPlaceNotFound] = useState(false);
  const [temperatureUnit, setTemperatureUnit] = useState('metric');
  const [theme, setTheme] = useState('light');
  const [shareMenuOpen, setShareMenuOpen] = useState(false);


  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    console.log("theme toggled");
  };

  useEffect(() => {
    getCurrentLocationWeather();
  }, []);



  async function getCurrentLocationWeather() {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          await fetchWeatherDataByCoordinates(latitude, longitude);
          setShowWeatherData(true);
        });
      }
    } catch (error) {
      console.error('Error fetching current location weather:', error);
    }
  }

  async function fetchWeatherDataByCoordinates(latitude, longitude) {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${temperatureUnit}&appid=f5685377f1da8895a65d923c38d3c4a0`;
      const response = await fetch(url);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  async function fetchWeatherDataByCity() {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${temperatureUnit}&appid=f5685377f1da8895a65d923c38d3c4a0`;
      const response = await fetch(url);
      if (response.ok) {
        const jsonData = await response.json();
        setData(jsonData);
        setShowWeatherData(true);
        setPlaceNotFound(false);
      } else {
        setPlaceNotFound(true);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  function handleTemperatureUnitChange(unit) {
    setTemperatureUnit(unit);
    if (showWeatherData) {
      if (city === '') {
        getCurrentLocationWeather();
      } else {
        fetchWeatherDataByCity();
      }
    }
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      fetchWeatherDataByCity();
    }
  }

  const toggleShareMenu = () => {
    setShareMenuOpen(!shareMenuOpen);
  };

  const getShareLinks = () => {
    const message = `Check out the weather in ${data.name}! It's ${data.main.temp}° with ${data.weather[0].description}.`;
    const encodedMessage = encodeURIComponent(message);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedMessage}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedMessage}`;

    return { twitterUrl, facebookUrl, whatsappUrl };

  };

  return (
    <div className='page' >
      <div className={`app ${theme}`}>
     
        <div className="head-bar">
          <div>
            <img src="https://cdn-icons-png.flaticon.com/128/1163/1163763.png" alt="logo"></img>
          </div>

          <h1>WeatherToday</h1>
          <div className='temp-btn'>
            <button onClick={() => handleTemperatureUnitChange('metric')} className={temperatureUnit === 'metric' ? 'selected' : ''}><RiCelsiusFill /></button>
            <button onClick={() => handleTemperatureUnitChange('imperial')} className={temperatureUnit === 'imperial' ? 'selected' : ''}><RiFahrenheitFill /></button>
          </div>

          <div className='theme-switch-container'>
            <button onClick={toggleTheme}>
              {theme === 'light' ? <FaMoon /> : <FaSun color={theme === 'light' ? '#0000' : '	#FF0000'} />}
              theme
            </button>
          </div>

          <div className='popup'>
            <div className={`overlay-menu ${menuOpen ? 'open' : ''}`}>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li> <Link to="/hourly">Hourly</Link></li>
                <li> <Link to="/daily">Daily</Link></li>
                <li><Link to="/airQuality">AirQuality</Link></li>
              </ul>
              <button className="close-menu" onClick={toggleMenu}><RiCloseLine /></button>
            </div>
            <button className="menu-toggle" onClick={toggleMenu}><FaBars /></button>
          </div>

          <button onClick={toggleShareMenu} className='share-btn'>
            <FaShareFromSquare />
            share
          </button>
          {shareMenuOpen && (
            <div className="share-menu">
              <ul>
                <li><a href={getShareLinks().twitterUrl} target="_blank" rel="noopener noreferrer">Share on Twitter <FaTwitter /></a></li>
                <li><a href={getShareLinks().facebookUrl} target="_blank" rel="noopener noreferrer">Share on Facebook <FaFacebook /></a></li>
                <li><a href={getShareLinks().whatsappUrl} target="_blank" rel="noopener noreferrer">Share on WhatsApp <FaWhatsapp /></a></li>
              </ul>
            </div>
          )}
        </div>
        <div className='search-container'>
          <input
            type="search"
            placeholder='Search an area/location'
            className='search-bar'
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={handleKeyPress}
            value={city}
          />
          <button onClick={fetchWeatherDataByCity} className='btn-1'>
            <FaSearch />
          </button>
          <button onClick={getCurrentLocationWeather} className='btn-geolocation'>
            <SiGooglemaps /> Get Current Location
          </button>
        </div>
        {placeNotFound && (
          <div className='content-not-found'>
            <h2>Place not found, try another search.<TbWorldSearch /></h2>
          </div>
        )}
        {showWeatherData && !placeNotFound && (
          <div className='content'>
            <h1><SiGooglemaps /> location: {data?.name}</h1>
            <h1>Feels Like: {data?.main?.feels_like} °{temperatureUnit === 'metric' ? 'C' : 'F'}</h1>
            <hr />
            <h1><FaTemperatureHigh /> Temperature: {data?.main?.temp} °{temperatureUnit === 'metric' ? 'C' : 'F'}</h1>
            <hr />
            <h2><FaWind /> Wind Speed: {data?.wind?.speed} {temperatureUnit === 'metric' ? 'm/s' : 'mph'}
              <br /><MdVisibility /> Visibility: {data?.visibility} {temperatureUnit === 'metric' ? 'm' : 'mi'}
              <br /><WiHumidity /> Humidity: {data?.main?.humidity}%
            </h2>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
          </div>
        )}
      </div>
     
    </div>
  );
}
