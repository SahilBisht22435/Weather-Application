import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Hourly from './pages/Hourly';
import Daily from './pages/Daily';
import AirQuality from './pages/AirQuality.jsx';
// import Monthly from './pages/Monthly';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/hourly" element={<Hourly />} />
        <Route path="/daily" element={<Daily />} />
        {/* <Route path="/monthly" element={<Monthly />} /> */}
        <Route path='/airquality' element={<AirQuality/>}/>
      </Routes>
    </Router>
  );
}

export default App;
