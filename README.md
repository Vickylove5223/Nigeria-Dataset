<div align="center">

# 🇳🇬 Nigeria Dataset

**A free, open-source dataset and REST API for Nigerian geographic and demographic data.**

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![States](https://img.shields.io/badge/States-37-brightgreen)](https://github.com/Vickylove5223/Nigeria-Dataset)
[![LGAs](https://img.shields.io/badge/LGAs-774-blue)](https://github.com/Vickylove5223/Nigeria-Dataset)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Vickylove5223/Nigeria-Dataset/pulls)
[![Maintained](https://img.shields.io/badge/Maintained-yes-green.svg)](https://github.com/Vickylove5223/Nigeria-Dataset)

**[🌐 View Live Demo](https://vickylove5223.github.io/Nigeria-Dataset/)** · **[📊 Explore Data](https://vickylove5223.github.io/Nigeria-Dataset/)** · **[📖 API Docs](#-api-endpoints)**

Built by [Ifeoluwa Ajetomobi](https://ifeoluwaajetomobi.framer.website/) · UI/UX Designer & SEO Expert

</div>

---

## 🎨 Interactive Data Explorer

**[👉 Explore the data visually](https://vickylove5223.github.io/Nigeria-Dataset/)**

Browse all Nigerian states, LGAs, tribes, ethnic groups, and religions in an interactive web interface. No coding required — perfect for researchers, students, and anyone who wants to explore Nigerian data.

<div align="center">
  <a href="https://vickylove5223.github.io/Nigeria-Dataset/">
    <img src="https://img.shields.io/badge/🌐_Live_Demo-Visit_Explorer-008751?style=for-the-badge" alt="Live Demo"/>
  </a>
</div>

---

## 📖 Description

**Nigeria Dataset** is a comprehensive, structured, and ready-to-use dataset covering all Nigerian states, local government areas (LGAs), geopolitical regions, tribes, ethnic groups, and religions. It is available both as a raw JSON dataset and as a REST API you can self-host or deploy for free.

This dataset is ideal for:
- Developers building Nigerian apps that need location dropdowns
- Researchers and data analysts studying Nigerian demographics
- Civic tech, GIS, and mapping projects
- Educational platforms and e-learning tools
- E-commerce platforms needing delivery location data
- Government and NGO applications

---

## 📦 Dataset Contents

| Dataset | Records | Description |
|---|---|---|
| States | 37 | All 36 states + FCT Abuja |
| Local Govt Areas (LGAs) | 774 | Complete list for all states |
| Geopolitical Regions | 6 | North West, North East, North Central, South West, South East, South South |
| Tribes | 22+ | Major tribes with population % and states |
| Ethnic Groups | 3 | Niger-Congo, Afro-Asiatic, Nilo-Saharan |
| Religions | 3 | Islam, Christianity, Traditional — with % and regions |

### State Fields
```json
{
  "id": 25,
  "name": "Lagos",
  "capital": "Ikeja",
  "slogan": "Centre of Excellence",
  "region": "South West",
  "created": "1967",
  "logo": "",
  "lgas": ["Agege", "Alimosho", "Ikeja", "Ikorodu", "Lagos Island", "..."]
}
```

### Tribe Fields
```json
{
  "name": "Yoruba",
  "region": "South West",
  "population": "~21%",
  "states": ["Lagos", "Oyo", "Ogun", "Ondo", "Osun", "Ekiti", "Kwara", "Kogi"]
}
```

---

## 🗂️ File Structure

```
Nigeria-Dataset/
├── data/
│   └── nigeria-data.json     ← Main dataset (states, LGAs, tribes, religions)
├── public/
│   └── index.html            ← Interactive data explorer UI
├── server.js                 ← Express REST API server
├── package.json
├── vercel.json               ← Vercel deployment config
└── README.md
```

---

## 🚀 Quick Start

### Use the raw JSON directly

```js
// Fetch from your deployed URL or raw GitHub
fetch('https://raw.githubusercontent.com/Vickylove5223/Nigeria-Dataset/main/data/nigeria-data.json')
  .then(res => res.json())
  .then(data => console.log(data.states));
```

### Run the API locally

```bash
git clone https://github.com/Vickylove5223/Nigeria-Dataset.git
cd Nigeria-Dataset
npm install
npm start
# API running at http://localhost:3000
```

---

## ⚡ API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/states` | All 37 states with LGAs |
| GET | `/api/states/:name` | Single state by name |
| GET | `/api/lgas` | All 774 LGAs |
| GET | `/api/lgas/:state` | LGAs for a specific state |
| GET | `/api/regions` | All 6 geopolitical zones |
| GET | `/api/regions/:region` | States in a region |
| GET | `/api/tribes` | All major tribes |
| GET | `/api/ethnic-groups` | Ethnic group classifications |
| GET | `/api/religions` | Religious demographics |
| GET | `/api/search?q=` | Search states, capitals, tribes |
| GET | `/api/metadata` | Dataset statistics |

### Example Responses

```bash
# Get all states
GET /api/states

# Get Lagos
GET /api/states/Lagos

# Get all LGAs in Kano
GET /api/lgas/Kano

# Get South West states
GET /api/regions/South West

# Search
GET /api/search?q=abuja
```

---

## 💻 Usage Examples

### JavaScript / React
```js
// State dropdown
const res = await fetch('YOUR_API_URL/api/states');
const states = await res.json();

// LGA dropdown based on selected state
const res = await fetch(`YOUR_API_URL/api/lgas/${selectedState}`);
const lgas = await res.json();
```

### Python
```python
import requests

states = requests.get('YOUR_API_URL/api/states').json()
tribes = requests.get('YOUR_API_URL/api/tribes').json()
```

### PHP
```php
$states = json_decode(file_get_contents('YOUR_API_URL/api/states'), true);
```

---

## 🌐 Deploy for Free

### Render (Recommended)
1. Fork this repo
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your fork
4. Build command: `npm install` · Start command: `npm start`
5. Deploy — your API is live

### Railway
1. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
2. Select this repo — auto-deploys

### Vercel
```bash
npm i -g vercel
vercel
```

---

## 🤝 Contributing

Contributions are welcome and appreciated.

**Ways to contribute:**
- Add missing or incorrect LGA names
- Add state logos (update the `logo` field with a URL)
- Add wards and polling units data
- Fix typos or data errors
- Improve documentation

**Steps:**
1. Fork the repository
2. Create a branch: `git checkout -b fix/state-name`
3. Edit `data/nigeria-data.json`
4. Commit: `git commit -m "Fix: corrected LGA name in Kano"`
5. Push and open a Pull Request

Please include a source/reference for any data changes.

---

## 📄 License

This project is licensed under the **MIT License** — free to use for personal, commercial, academic, and government projects.

```
MIT License

Copyright (c) 2025 Ifeoluwa Ajetomobi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

See [LICENSE](LICENSE) for the full text.

---

## 🙏 Data Sources

Data consolidated and verified from multiple community and government sources:
- Nigerian government administrative records
- INEC (Independent National Electoral Commission) LGA data
- National Bureau of Statistics demographic data
- Community-maintained Nigerian developer datasets

---

## 👨‍💻 Author

**Ifeoluwa Ajetomobi**

UI/UX Designer · AI Senior Dev · WordPress Web Designer · SEO Content Writer

> *"I design with purpose — blending beautiful user interfaces with great user experience to deliver applications that look great and are easy to use."*

- 🌐 Portfolio: [ifeoluwaajetomobi.framer.website](https://ifeoluwaajetomobi.framer.website/)
- 💼 GitHub: [github.com/Vickylove5223](https://github.com/Vickylove5223)

---

<div align="center">

⭐ If this dataset helped you, please **star the repo** — it helps others find it!

</div>
