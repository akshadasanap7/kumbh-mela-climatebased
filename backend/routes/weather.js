const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

// GET /api/weather?city=Nashik
router.get('/', async (req, res) => {
  const city = req.query.city || 'Nashik';
  const apiKey = process.env.OPENWEATHER_API_KEY;

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) return res.status(400).json({ error: data.message });

    res.json({
      city: data.name,
      temp: data.main.temp,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      wind: data.wind.speed,
      rain: data.rain ? data.rain['1h'] || 0 : 0,
      uv: Math.floor(Math.random() * 8) + 1, // UV not in free tier, simulated
      icon: data.weather[0].icon
    });
  } catch (err) {
    // Fallback simulated data if API key not set
    res.json({
      city,
      temp: Math.floor(Math.random() * 15) + 25,
      humidity: Math.floor(Math.random() * 40) + 40,
      description: 'partly cloudy',
      wind: Math.floor(Math.random() * 20) + 5,
      rain: Math.floor(Math.random() * 30),
      uv: Math.floor(Math.random() * 8) + 1,
      icon: '02d',
      simulated: true
    });
  }
});

module.exports = router;
