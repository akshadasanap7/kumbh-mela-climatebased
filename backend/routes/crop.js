const express = require('express');
const router = express.Router();

const cropData = {
  Grapes:  { yieldPerAcre: 8,  marketRate: 20000, baseRisk: 50, sowing: 'October - November', water: '600-800mm', fertilizer: 'NPK 19:19:19 + Potassium' },
  Onion:   { yieldPerAcre: 10, marketRate: 18000, baseRisk: 35, sowing: 'November - December', water: '350-550mm', fertilizer: 'NPK 10:26:26 + Sulphur' },
  Tomato:  { yieldPerAcre: 6,  marketRate: 22000, baseRisk: 60, sowing: 'June - July',         water: '400-600mm', fertilizer: 'NPK 12:32:16 + Calcium' },
  Wheat:   { yieldPerAcre: 5,  marketRate: 15000, baseRisk: 25, sowing: 'November - December', water: '450-650mm', fertilizer: 'Urea + DAP' },
};

// POST /api/crop/plan
router.post('/plan', (req, res) => {
  const { crop, area, investment, temp, humidity, soilMoisture } = req.body;
  const data = cropData[crop];
  if (!data) return res.status(400).json({ error: 'Invalid crop' });

  let risk = data.baseRisk;
  if (temp > 38) risk += 20;
  if (humidity > 85) risk += 10;
  if (soilMoisture < 30) risk += 15;
  if (soilMoisture > 80) risk += 10;
  if (investment < area * 15000) risk += 15;
  risk = Math.min(risk, 95);

  const expectedYield = area * data.yieldPerAcre;
  const revenue = expectedYield * data.marketRate;
  const profit = revenue - investment;

  const advice = risk < 40
    ? 'Conditions are stable. Maintain irrigation and pest monitoring.'
    : risk < 70
    ? 'Moderate risk detected. Improve soil moisture and monitor weather closely.'
    : 'High risk! Increase irrigation, apply protective measures to reduce losses.';

  res.json({
    crop, area, investment,
    expectedYield: `${expectedYield} tons`,
    revenue: `₹${revenue.toLocaleString('en-IN')}`,
    profit: `₹${profit.toLocaleString('en-IN')}`,
    riskScore: risk,
    riskLevel: risk < 40 ? 'Low' : risk < 70 ? 'Moderate' : 'High',
    sowingSeason: data.sowing,
    waterRequirement: data.water,
    fertilizer: data.fertilizer,
    advice
  });
});

// GET /api/crop/list
router.get('/list', (req, res) => {
  res.json(Object.keys(cropData).map(name => ({ name, ...cropData[name] })));
});

module.exports = router;
