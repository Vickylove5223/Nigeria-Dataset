const express = require('express');
const cors = require('cors');
const path = require('path');
const data = require('./data/nigeria-data.json');

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

app.listen(PORT, () => {
  console.log(`Nigeria Data API running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} for documentation`);
  console.log(`\nAPI Statistics:`);
  console.log(`- Total States: ${data.states.length}`);
  console.log(`- Total Tribes: ${data.tribes.length}`);
  console.log(`- Total Ethnic Groups: ${data.ethnicGroups.length}`);
  console.log(`- Total Religions: ${data.religions.length}`);
});
