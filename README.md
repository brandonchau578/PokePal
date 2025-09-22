An AI-powered Pokemon card chatbot that provides real-time card information, market pricing, and collecting advice.

## ✨ Features

- 🤖 **AI-Powered Chat** - Intelligent responses about Pokemon cards
- 💰 **Real-Time Pricing** - Current market values from multiple sources
- 🎴 **Card Database** - Comprehensive Pokemon card information
- 📱 **Responsive Design** - Works on desktop and mobile
- 🔍 **Set-Specific Search** - Find cards from specific sets
- 📈 **Investment Insights** - Collecting and investment advice

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- Python (v3.8+)
- OpenAI API Key
- Pokemon TCG API Key (optional)

### Installation

1. **Clone the repository**
git clone https://github.com/brandonchau578/PokePal.git
cd PokePal

2. Setup Backend

bashcd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

3. Create .env file with your API keys
echo "OPENAI_API_KEY=your_openai_key_here" > .env
echo "POKEMON_TCG_API_KEY=your_pokemon_tcg_key_here" >> .env

Setup Frontend

bashcd ../frontend
npm install

Run the Application

Terminal 1 (Backend):
bashcd backend
source venv/bin/activate
python app.py
Terminal 2 (Frontend):
bashcd frontend
npm start

Access the App


Frontend: http://localhost:3000
Backend API: http://localhost:5001

🛠️ Tech Stack
Backend

Flask - Python web framework
OpenAI API - AI-powered responses
Pokemon TCG API - Card data and pricing
CORS - Cross-origin resource sharing

Frontend

React - User interface
JSX - Component structure
CSS3 - Styling and animations
Lucide React - Icons
