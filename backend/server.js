require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, '..')));

// API Routes
app.use('/api/auth',    require('./routes/auth'));
app.use('/api/weather', require('./routes/weather'));
app.use('/api/chat',    require('./routes/chat'));
app.use('/api/crop',    require('./routes/crop'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'OK', project: 'Kumbh Mela Climate-Smart Agriculture', version: '1.0.0' }));

// Fallback to index.html for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🌾 AgriSmart Server running on http://localhost:${PORT}`));
