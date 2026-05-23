# 🌾 Climate-Smart Agriculture Platform
### Kumbhathon 2026 | AI-Powered Farming for Maharashtra

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

> An AI-powered full-stack web platform helping Maharashtra farmers with smart crop planning, real-time weather intelligence, irrigation management, and pest risk prediction.

---

## 🚀 Live Demo

**Deployed on Render:** `https://kumbh-agri-smart.onrender.com`

---

## 📸 Features

| Feature | Description |
|---|---|
| 🔐 Auth System | JWT-based Register & Login for farmers |
| 🌤 Live Weather | Real-time weather via OpenWeatherMap API |
| 🌱 AI Crop Planning | Yield, profit & risk prediction per crop |
| 💧 Smart Irrigation | Soil moisture-based irrigation advisory |
| 🤖 AgriBot Chat | Smart farming chatbot (no API key needed) |
| 📊 Analytics | Chart.js growth & risk trend visualization |
| 📄 PDF Reports | Download crop planning reports |
| 🌍 Multi-language | English, Marathi, Hindi support |
| 🎨 Themes | Dark, Light, Green Gradient themes |
| 📱 Responsive | Mobile-first design |

---

## 🏗 Project Structure

```
kumbh-mela-climatebased/
├── backend/
│   ├── middleware/
│   │   └── auth.js          # JWT middleware
│   ├── routes/
│   │   ├── auth.js          # Register & Login
│   │   ├── weather.js       # Weather proxy API
│   │   ├── chat.js          # AgriBot chatbot
│   │   └── crop.js          # Crop planning logic
│   ├── db.js                # In-memory user store
│   ├── server.js            # Express entry point
│   ├── .env                 # Environment variables
│   └── package.json
├── api.js                   # Frontend API helper
├── index.html               # Landing page
├── login.html               # Farmer login
├── register.html            # Farmer registration
├── dashboard.html           # Main dashboard
├── crop_planning.html       # AI crop planner
├── weather.html             # Weather intelligence
├── irrigation.html          # Irrigation advisory
├── grapes.html              # Grapes crop page
├── onion.html               # Onion crop page
├── tomato.html              # Tomato crop page
├── render.yaml              # Render deploy config
├── package.json             # Root package.json
└── README.md
```

---

## ⚙️ API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register new farmer |
| POST | `/api/auth/login` | Login farmer, returns JWT |
| GET  | `/api/weather?city=Nashik` | Live weather data |
| POST | `/api/chat` | AgriBot chat response |
| POST | `/api/crop/plan` | AI crop plan & risk |
| GET  | `/api/crop/list` | List all supported crops |
| GET  | `/api/health` | Server health check |

---

## 🛠 Local Setup

### Prerequisites
- Node.js v18+
- npm

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/kumbh-mela-climatebased.git
cd kumbh-mela-climatebased
```

### 2. Install backend dependencies
```bash
cd backend
npm install
```

### 3. Configure environment variables
```bash
# backend/.env
PORT=5000
JWT_SECRET=your_secret_key_here
OPENWEATHER_API_KEY=your_openweather_key_here
OPENAI_API_KEY=your_openai_key_here   # optional
```

> **Get free OpenWeatherMap API key:** https://openweathermap.org/api
> The app works with simulated data if no API key is provided.

### 4. Start the server
```bash
node backend/server.js
```

### 5. Open in browser
```
http://localhost:5000
```

---

## ☁️ Deploy to Render (Free)

1. Push this repo to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your GitHub repo
4. Set these settings:
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `node backend/server.js`
5. Add environment variables:
   - `JWT_SECRET` → any random string
   - `OPENWEATHER_API_KEY` → your key (optional)
6. Click **Deploy** ✅

Or use the `render.yaml` file for one-click deploy.

---

## 🌱 Supported Crops

| Crop | Yield/Acre | Market Rate | Risk Level |
|---|---|---|---|
| 🍇 Grapes | 8 tons | ₹20,000/ton | Medium |
| 🧅 Onion | 10 tons | ₹18,000/ton | Low |
| 🍅 Tomato | 6 tons | ₹22,000/ton | High |
| 🌾 Wheat | 5 tons | ₹15,000/ton | Low |

---

## 🔧 Tech Stack

**Frontend:** HTML5, CSS3, Bootstrap 5, Chart.js, Font Awesome, Vanilla JS

**Backend:** Node.js, Express.js, JWT, bcryptjs, node-fetch

**APIs:** OpenWeatherMap (weather), Custom AgriBot (chat)

**Deploy:** Render.com

---

## 👨‍🌾 Team

Built for **Kumbhathon 2026** — Empowering Maharashtra Farmers with AI & Climate Intelligence.

---

## 📄 License

MIT License — Free to use and modify.
