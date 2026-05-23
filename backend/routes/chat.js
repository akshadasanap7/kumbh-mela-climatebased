const express = require('express');
const router = express.Router();

const cropKnowledge = {
  grapes: { water: '600-800mm/season', fertilizer: 'NPK 19:19:19, Potassium', pest: 'Downy Mildew, Mealybug', season: 'Oct-Nov planting' },
  onion: { water: '350-550mm/season', fertilizer: 'NPK 10:26:26, Sulphur', pest: 'Thrips, Purple Blotch', season: 'Nov-Dec planting' },
  tomato: { water: '400-600mm/season', fertilizer: 'NPK 12:32:16, Calcium', pest: 'Fruit Borer, Leaf Curl Virus', season: 'Jun-Jul planting' },
  wheat: { water: '450-650mm/season', fertilizer: 'Urea, DAP', pest: 'Rust, Aphids', season: 'Nov-Dec planting' },
};

function generateReply(message) {
  const msg = message.toLowerCase();

  // Crop specific
  for (const [crop, info] of Object.entries(cropKnowledge)) {
    if (msg.includes(crop)) {
      if (msg.includes('water') || msg.includes('irrigation')) return `For ${crop}: Water requirement is ${info.water}. Use drip irrigation for best results.`;
      if (msg.includes('fertilizer') || msg.includes('nutrient')) return `For ${crop}: Recommended fertilizers are ${info.fertilizer}.`;
      if (msg.includes('pest') || msg.includes('disease')) return `For ${crop}: Watch out for ${info.pest}. Use integrated pest management.`;
      if (msg.includes('season') || msg.includes('sow') || msg.includes('plant')) return `For ${crop}: Best planting season is ${info.season}.`;
      return `${crop.charAt(0).toUpperCase() + crop.slice(1)} Info → Water: ${info.water} | Fertilizer: ${info.fertilizer} | Pest: ${info.pest} | Season: ${info.season}`;
    }
  }

  // General queries
  if (msg.includes('weather') || msg.includes('rain') || msg.includes('climate')) return '🌦 Check the Weather Intelligence page for real-time climate data and risk alerts for your region.';
  if (msg.includes('soil') || msg.includes('moisture')) return '🌱 Ideal soil moisture for most crops is 40-70%. Use drip irrigation to maintain optimal levels.';
  if (msg.includes('profit') || msg.includes('income') || msg.includes('money')) return '💰 Grapes yield ₹1.5-2L/acre, Onion ₹80K-1.2L/acre, Tomato ₹60K-1L/acre depending on market rates.';
  if (msg.includes('irrigation')) return '💧 Drip irrigation saves 30-50% water vs flood irrigation. Recommended for all Nashik crops.';
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('namaste')) return '🙏 Namaste! I am AgriBot, your smart farming assistant. Ask me about crops, irrigation, weather, or pest control!';
  if (msg.includes('help')) return '🤖 I can help with: crop planning, irrigation advice, pest control, fertilizer recommendations, weather risks, and profit estimation.';

  return '🌾 I specialize in Maharashtra farming. Ask me about Grapes, Onion, Tomato, irrigation, soil health, or weather risks!';
}

// POST /api/chat
router.post('/', (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message required' });
  const reply = generateReply(message);
  res.json({ reply });
});

module.exports = router;
