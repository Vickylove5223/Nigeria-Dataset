const express = require('express');
const cors = require('cors');
const path = require('path');
const data = require('./data/nigeria-data.json');
const postalCodes = require('./data/postal-codes.json');
const logosData = require('./data/state-logos.json');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Home route - serve HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Get all states
app.get('/api/states', (req, res) => {
  res.json(data.states);
});

// Get specific state by name
app.get('/api/states/:name', (req, res) => {
  const state = data.states.find(s => 
    s.name.toLowerCase() === req.params.name.toLowerCase()
  );
  if (state) {
    res.json(state);
  } else {
    res.status(404).json({ error: 'State not found' });
  }
});

// Get logo for a specific state (shortcut via /api/states/:name/logo)
app.get('/api/states/:name/logo', (req, res) => {
  const state = data.states.find(s =>
    s.name.toLowerCase() === req.params.name.toLowerCase()
  );
  if (state && state.logo) {
    res.json({ state: state.name, logo: state.logo });
  } else if (state) {
    res.status(404).json({ error: `No logo available for: ${req.params.name}` });
  } else {
    res.status(404).json({ error: 'State not found' });
  }
});

// Get all LGAs (flattened from all states)
app.get('/api/lgas', (req, res) => {
  const allLgas = [];
  data.states.forEach(state => {
    state.lgas.forEach(lga => {
      allLgas.push({ name: lga, state: state.name });
    });
  });
  res.json(allLgas);
});

// Get LGAs by state
app.get('/api/lgas/:state', (req, res) => {
  const state = data.states.find(s => 
    s.name.toLowerCase() === req.params.state.toLowerCase()
  );
  if (state) {
    const lgas = state.lgas.map(lga => ({ name: lga, state: state.name }));
    res.json(lgas);
  } else {
    res.status(404).json({ error: 'State not found' });
  }
});

// Get regions
app.get('/api/regions', (req, res) => {
  const regions = [...new Set(data.states.map(s => s.region))];
  res.json(regions);
});

// Get states by region
app.get('/api/regions/:region', (req, res) => {
  const states = data.states.filter(s => 
    s.region.toLowerCase() === req.params.region.toLowerCase()
  );
  if (states.length > 0) {
    res.json(states);
  } else {
    res.status(404).json({ error: 'No states found for this region' });
  }
});

// Get all tribes
app.get('/api/tribes', (req, res) => {
  res.json(data.tribes);
});

// Get all ethnic groups
app.get('/api/ethnic-groups', (req, res) => {
  res.json(data.ethnicGroups);
});

// Get all religions
app.get('/api/religions', (req, res) => {
  res.json(data.religions);
});

// Get API metadata
app.get('/api/metadata', (req, res) => {
  res.json(data.metadata);
});

// Search endpoint
app.get('/api/search', (req, res) => {
  const query = req.query.q?.toLowerCase();
  if (!query) {
    return res.status(400).json({ error: 'Query parameter "q" is required' });
  }

  const results = {
    states: data.states.filter(s => 
      s.name.toLowerCase().includes(query) || 
      s.capital.toLowerCase().includes(query)
    ),
    tribes: data.tribes.filter(t => 
      t.name.toLowerCase().includes(query)
    )
  };

  res.json(results);
});

// Postal Codes API Endpoints

// Get all postal codes
app.get('/api/postal-codes', (req, res) => {
  res.json(postalCodes);
});

// Get postal codes by state
app.get('/api/postal-codes/state/:state', (req, res) => {
  const state = postalCodes.states.find(s => 
    s.name.toLowerCase() === req.params.state.toLowerCase()
  );
  if (state) {
    res.json(state);
  } else {
    res.status(404).json({ error: 'State not found' });
  }
});

// Get postal codes by state and LGA
app.get('/api/postal-codes/state/:state/lga/:lga', (req, res) => {
  const state = postalCodes.states.find(s => 
    s.name.toLowerCase() === req.params.state.toLowerCase()
  );
  if (!state) {
    return res.status(404).json({ error: 'State not found' });
  }

  const lga = state.lgas.find(l => 
    l.name.toLowerCase() === req.params.lga.toLowerCase()
  );
  if (lga) {
    res.json(lga);
  } else {
    res.status(404).json({ error: 'LGA not found' });
  }
});

// Get postal code by town
app.get('/api/postal-codes/town/:town', (req, res) => {
  const townQuery = req.params.town.toLowerCase();
  const results = [];

  postalCodes.states.forEach(state => {
    state.lgas.forEach(lga => {
      lga.towns.forEach(town => {
        if (town.name.toLowerCase().includes(townQuery)) {
          results.push({
            town: town.name,
            postalCode: town.postalCode,
            lga: lga.name,
            state: state.name
          });
        }
      });
    });
  });

  if (results.length > 0) {
    res.json(results);
  } else {
    res.status(404).json({ error: 'Town not found' });
  }
});

// Reverse lookup: Get town by postal code
app.get('/api/postal-codes/lookup/:postalCode', (req, res) => {
  const code = req.params.postalCode;
  
  let result = null;
  postalCodes.states.forEach(state => {
    state.lgas.forEach(lga => {
      lga.towns.forEach(town => {
        if (town.postalCode === code) {
          result = {
            town: town.name,
            postalCode: town.postalCode,
            lga: lga.name,
            state: state.name,
            region: state.region
          };
        }
      });
    });
  });

  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ error: 'Postal code not found' });
  }
});

// ─── Logos API Endpoints ────────────────────────────────────────────────────

// Get all state logos
app.get('/api/logos', (req, res) => {
  const logos = data.states.map(s => ({
    state: s.name,
    logo: s.logo || null
  }));
  res.json(logos);
});

// Get list of states that have logos (must come before /:state to avoid conflict)
app.get('/api/logos/available/states', (req, res) => {
  const states = data.states
    .filter(s => s.logo)
    .map(s => s.name);
  res.json({ count: states.length, states });
});

// Get logo for a specific state
app.get('/api/logos/:state', (req, res) => {
  const stateName = req.params.state.toLowerCase();
  const state = data.states.find(s =>
    s.name.toLowerCase() === stateName
  );
  if (state && state.logo) {
    res.json({ state: state.name, logo: state.logo });
  } else if (state) {
    res.status(404).json({ error: `No logo available for state: ${req.params.state}` });
  } else {
    res.status(404).json({ error: `State not found: ${req.params.state}` });
  }
});

// Proxy: fetch and stream the logo image for a specific state
app.get('/api/logos/:state/image', async (req, res) => {
  const stateName = req.params.state.toLowerCase();
  const state = data.states.find(s =>
    s.name.toLowerCase() === stateName
  );
  if (!state || !state.logo) {
    return res.status(404).json({ error: `Logo not found for state: ${req.params.state}` });
  }

  // If logo is a URL, proxy it; if base64, decode and send
  const logo = state.logo;
  if (logo.startsWith('data:image')) {
    const matches = logo.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    if (matches) {
      const contentType = matches[1];
      const buffer = Buffer.from(matches[2], 'base64');
      res.setHeader('Content-Type', contentType);
      res.setHeader('Cache-Control', 'public, max-age=86400');
      return res.send(buffer);
    }
  }

  try {
    const https = require('https');
    const http = require('http');
    const urlModule = require('url');
    const parsed = urlModule.parse(logo);
    const protocol = parsed.protocol === 'https:' ? https : http;
    const request = protocol.get(logo, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return res.redirect(response.headers.location);
      }
      res.setHeader('Content-Type', response.headers['content-type'] || 'image/png');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      response.pipe(res);
    });
    request.on('error', () => {
      res.status(502).json({ error: 'Failed to fetch logo image' });
    });
  } catch (e) {
    res.status(500).json({ error: 'Server error fetching logo' });
  }
});

// ─────────────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`Nigeria Data API running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} for documentation`);
  console.log(`\nAPI Statistics:`);
  console.log(`- Total States: ${data.states.length}`);
  console.log(`- Total LGAs: ${data.states.reduce((sum, s) => sum + s.lgas.length, 0)}`);
  console.log(`- Total Towns: ${data.states.reduce((sum, s) => sum + s.lgas.reduce((lgaSum, lga) => lgaSum + (lga.towns ? lga.towns.length : 0), 0), 0)}`);
  console.log(`- Total Tribes: ${data.tribes.length}`);
  console.log(`- Total Ethnic Groups: ${data.ethnicGroups.length}`);
  console.log(`- Total Religions: ${data.religions.length}`);
  console.log(`\nPostal Codes:`);
  console.log(`- States with postal codes: ${postalCodes.states.length}`);
  console.log(`- Total LGAs with postal codes: ${postalCodes.states.reduce((sum, s) => sum + s.lgas.length, 0)}`);
  console.log(`- Total towns with postal codes: ${postalCodes.states.reduce((sum, s) => sum + s.lgas.reduce((lgaSum, lga) => lgaSum + lga.towns.length, 0), 0)}`);
});
