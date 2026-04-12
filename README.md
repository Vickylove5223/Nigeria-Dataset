# Nigeria Data API 🇳🇬

A free, open-source REST API providing comprehensive data about Nigeria including all 37 states, 774 local governments, tribes, ethnic groups, religions, and more.

## 🚀 Quick Start

### Installation

```bash
npm install
npm start
```

The API will run on `http://localhost:3000`

## 📚 API Endpoints

### Base URL
```
http://localhost:3000
```

### Available Endpoints

#### 1. Get All States
```
GET /api/states
```
Returns all 37 states (36 + FCT) with capitals, slogans, regions, creation dates, and LGAs.

**Response Example:**
```json
[
  {
    "id": 1,
    "name": "Abia",
    "capital": "Umuahia",
    "slogan": "God's Own State",
    "region": "South East",
    "created": "1991",
    "logo": "",
    "lgas": ["Aba North", "Aba South", ...]
  }
]
```

#### 2. Get Specific State
```
GET /api/states/:name
```
Example: `/api/states/Lagos`

#### 3. Get All Local Governments (LGAs)
```
GET /api/lgas
```
Returns all 774 LGAs with their states.

#### 4. Get LGAs by State
```
GET /api/lgas/:state
```
Example: `/api/lgas/Lagos`

#### 5. Get All Regions
```
GET /api/regions
```
Returns the 6 geopolitical zones: North West, North East, North Central, South West, South East, South South.

#### 6. Get States by Region
```
GET /api/regions/:region
```
Example: `/api/regions/South West`

#### 7. Get All Tribes
```
GET /api/tribes
```
Returns 20+ major Nigerian tribes with population percentages and states.

#### 8. Get Ethnic Groups
```
GET /api/ethnic-groups
```
Returns ethnic group classifications (Niger-Congo, Afro-Asiatic, Nilo-Saharan).

#### 9. Get Religions
```
GET /api/religions
```
Returns religious demographics with percentages and predominant regions.

#### 10. Get API Metadata
```
GET /api/metadata
```
Returns API version, statistics, and information.

#### 11. Search
```
GET /api/search?q=lagos
```
Search across states, capitals, and tribes.

## 📖 Usage Examples

### JavaScript (Fetch)
```javascript
// Get all states
fetch('http://localhost:3000/api/states')
  .then(res => res.json())
  .then(data => console.log(data));

// Get Lagos state info
fetch('http://localhost:3000/api/states/Lagos')
  .then(res => res.json())
  .then(data => console.log(data));

// Get all LGAs in Kano
fetch('http://localhost:3000/api/lgas/Kano')
  .then(res => res.json())
  .then(data => console.log(data));
```

### Python
```python
import requests

# Get all tribes
response = requests.get('http://localhost:3000/api/tribes')
tribes = response.json()
print(tribes)

# Search for states
response = requests.get('http://localhost:3000/api/search?q=lagos')
results = response.json()
print(results)
```

### cURL
```bash
# Get all states
curl http://localhost:3000/api/states

# Get regions
curl http://localhost:3000/api/regions

# Get South West states
curl http://localhost:3000/api/regions/South%20West
```

## 🌐 Deploy to Production

### Deploy to Render (Free)
1. Push this code to GitHub
2. Go to [render.com](https://render.com)
3. Create a new Web Service
4. Connect your GitHub repository
5. Use these settings:
   - Build Command: `npm install`
   - Start Command: `npm start`
6. Deploy!

Your API will be live at: `https://your-app-name.onrender.com`

### Deploy to Railway (Free)
1. Push to GitHub
2. Go to [railway.app](https://railway.app)
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway auto-detects Node.js and deploys

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

## 📦 Data Included

- 37 States (36 + FCT Abuja)
- 774 Local Government Areas (complete list)
- State capitals, slogans, and creation dates
- 6 Geopolitical regions
- 20+ Major tribes with population data
- 3 Ethnic group classifications
- Religious demographics with percentages
- State logos (field available for future addition)

## 🔧 Adding State Logos

State logos can be added by updating the `logo` field in `data/nigeria-data.json`:

```json
{
  "id": 25,
  "name": "Lagos",
  "logo": "https://your-cdn.com/lagos-logo.png"
}
```

## 🤝 Contributing

Want to add more LGAs, wards, state logos, or data? 

1. Fork this repository
2. Edit `data/nigeria-data.json`
3. Submit a pull request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📄 License

MIT License - Free to use for any project, commercial or personal!

See [LICENSE](LICENSE) for details.

## 🔗 Public Access

Once deployed, share your API URL with anyone:
```
https://your-api-url.com/api/states
```

No authentication required. Completely free!

## 📚 Additional Documentation

- [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - Complete API reference
- [QUICKSTART.md](QUICKSTART.md) - Get started in 5 minutes
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deploy to production
- [GIT_SETUP.md](GIT_SETUP.md) - Push to GitHub and deploy
- [CHECKLIST.md](CHECKLIST.md) - Pre-deployment checklist
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines

## 💡 Use Cases

- Mobile apps needing Nigerian location data
- Web forms with state/LGA dropdowns
- Educational projects
- Research and analytics
- Government applications
- E-commerce delivery systems
- Demographics studies
- GIS and mapping tools

## ⚡ Features

- Fast and lightweight
- CORS enabled (works from any domain)
- RESTful design
- JSON responses
- No rate limits
- No authentication needed
- Free forever
- Complete data (all 774 LGAs)
- Well documented
- Easy to deploy
- Easy to contribute

## 🌟 Star This Repo

If you find this useful, please star the repository on GitHub!

## 📧 Support

- Open an issue on GitHub
- Check the documentation
- Review example code

## 🙏 Acknowledgments

Data consolidated from multiple verified Nigerian sources and community contributions.

## 📊 Statistics

- 37 States (36 + FCT)
- 774 Local Government Areas
- 22+ Major Tribes
- 3 Ethnic Group Classifications
- 3 Major Religions
- 6 Geopolitical Regions

---

Made with ❤️ for Nigerian developers

**Ready to deploy? See [GIT_SETUP.md](GIT_SETUP.md) to get started!**
