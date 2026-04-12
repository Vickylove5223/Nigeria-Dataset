# Quick Start Guide

Get your Nigeria Data API running in 5 minutes!

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Start the Server

```bash
npm start
```

You should see:
```
Nigeria Data API running on port 3000
Visit http://localhost:3000 for documentation

API Statistics:
- Total States: 37
- Total Tribes: 22
- Total Ethnic Groups: 3
- Total Religions: 3
```

## Step 3: Test the API

Open your browser or use curl:

```bash
# Get all states
curl http://localhost:3000/api/states

# Get Lagos state
curl http://localhost:3000/api/states/Lagos

# Get all LGAs in Kano
curl http://localhost:3000/api/lgas/Kano

# Get all tribes
curl http://localhost:3000/api/tribes
```

## Step 4: Use in Your Project

### JavaScript/React
```javascript
const fetchStates = async () => {
  const response = await fetch('http://localhost:3000/api/states');
  const states = await response.json();
  console.log(states);
};
```

### Python
```python
import requests

response = requests.get('http://localhost:3000/api/states')
states = response.json()
print(states)
```

### PHP
```php
$response = file_get_contents('http://localhost:3000/api/states');
$states = json_decode($response, true);
print_r($states);
```

## Step 5: Deploy (Optional)

Make your API public so others can use it:

1. Push to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_URL
git push -u origin main
```

2. Deploy to Render (free):
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repo
   - Click "Create Web Service"

3. Your API is now live! Share the URL with others.

## Common Use Cases

### State Dropdown in HTML
```html
<select id="state-select">
  <option value="">Select State</option>
</select>

<script>
fetch('http://localhost:3000/api/states')
  .then(res => res.json())
  .then(states => {
    const select = document.getElementById('state-select');
    states.forEach(state => {
      const option = document.createElement('option');
      option.value = state.name;
      option.textContent = state.name;
      select.appendChild(option);
    });
  });
</script>
```

### LGA Dropdown Based on State
```javascript
async function loadLGAs(stateName) {
  const response = await fetch(`http://localhost:3000/api/lgas/${stateName}`);
  const lgas = await response.json();
  
  const select = document.getElementById('lga-select');
  select.innerHTML = '<option value="">Select LGA</option>';
  
  lgas.forEach(lga => {
    const option = document.createElement('option');
    option.value = lga.name;
    option.textContent = lga.name;
    select.appendChild(option);
  });
}
```

### React Component
```jsx
import { useState, useEffect } from 'react';

function StateSelector() {
  const [states, setStates] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:3000/api/states')
      .then(res => res.json())
      .then(data => setStates(data));
  }, []);
  
  return (
    <select>
      <option value="">Select State</option>
      {states.map(state => (
        <option key={state.id} value={state.name}>
          {state.name}
        </option>
      ))}
    </select>
  );
}
```

## Next Steps

- Read [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for complete API reference
- See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment options
- Check [CONTRIBUTING.md](CONTRIBUTING.md) to add data or features
- Add state logos by updating the `logo` field in `data/nigeria-data.json`

## Need Help?

- Check the [README.md](README.md) for detailed information
- Open an issue on GitHub
- Review the example code above

## Tips

1. **CORS is enabled** - You can call this API from any domain
2. **No authentication needed** - It's completely free
3. **Case-insensitive** - `/api/states/lagos` works the same as `/api/states/Lagos`
4. **774 LGAs included** - Complete data for all Nigerian local governments
5. **Add your own data** - The JSON file is easy to edit

Happy coding! 🇳🇬
