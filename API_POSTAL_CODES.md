# Nigerian Postal Codes API Documentation

## Overview
Complete API endpoints for accessing Nigerian postal codes organized by state, LGA, and town. All postal codes follow the official NIPOST 6-digit format.

## Base URL
```
http://localhost:3000/api
```

## Postal Code Format
- **Format**: 6-digit numeric code (RRDDTTT)
- **RR**: Postal Region (1st digit)
- **DD**: District/Sorting District (2nd-3rd digits)
- **TTT**: Town/Delivery Location (last 3 digits)

## Endpoints

### 1. Get All Postal Codes
Returns the complete postal codes database for all states, LGAs, and towns.

**Request:**
```bash
GET /api/postal-codes
```

**Response:**
```json
{
  "metadata": {
    "version": "1.0.0",
    "totalStates": 37,
    "totalLGAs": 774,
    "postalCodeFormat": "6-digit numeric code (RRDDTTT)"
  },
  "states": [...]
}
```

---

### 2. Get Postal Codes by State
Returns all LGAs and towns with postal codes for a specific state.

**Request:**
```bash
GET /api/postal-codes/state/:state
```

**Parameters:**
- `state` (string, required): State name (e.g., "Lagos", "Kano", "Abia")

**Example:**
```bash
GET /api/postal-codes/state/Lagos
```

**Response:**
```json
{
  "id": 25,
  "name": "Lagos",
  "capital": "Ikeja",
  "region": "South West",
  "basePostalCode": "100001",
  "lgas": [
    {
      "name": "Agege",
      "basePostalCode": "100000",
      "towns": [
        {
          "name": "Agege",
          "postalCode": "100000"
        }
      ]
    }
  ]
}
```

---

### 3. Get Postal Codes by State and LGA
Returns all towns with postal codes for a specific LGA within a state.

**Request:**
```bash
GET /api/postal-codes/state/:state/lga/:lga
```

**Parameters:**
- `state` (string, required): State name
- `lga` (string, required): LGA name

**Example:**
```bash
GET /api/postal-codes/state/Lagos/lga/Agege
```

**Response:**
```json
{
  "name": "Agege",
  "basePostalCode": "100000",
  "towns": [
    {
      "name": "Agege",
      "postalCode": "100000"
    },
    {
      "name": "Pen Cinema",
      "postalCode": "100001"
    }
  ]
}
```

---

### 4. Search Postal Codes by Town
Find postal codes for towns matching a search query.

**Request:**
```bash
GET /api/postal-codes/town/:town
```

**Parameters:**
- `town` (string, required): Town name or partial name

**Example:**
```bash
GET /api/postal-codes/town/Aba
```

**Response:**
```json
[
  {
    "town": "Aba",
    "postalCode": "440100",
    "lga": "Aba South",
    "state": "Abia"
  },
  {
    "town": "Abaji",
    "postalCode": "905101",
    "lga": "Abaji",
    "state": "FCT"
  }
]
```

---

### 5. Reverse Lookup: Get Town by Postal Code
Find the town, LGA, and state for a specific postal code.

**Request:**
```bash
GET /api/postal-codes/lookup/:postalCode
```

**Parameters:**
- `postalCode` (string, required): 6-digit postal code

**Example:**
```bash
GET /api/postal-codes/lookup/100001
```

**Response:**
```json
{
  "town": "Ikeja",
  "postalCode": "100001",
  "lga": "Ikeja",
  "state": "Lagos",
  "region": "South West"
}
```

---

## Usage Examples

### JavaScript/Node.js

```javascript
// Get all postal codes
fetch('http://localhost:3000/api/postal-codes')
  .then(res => res.json())
  .then(data => console.log(data));

// Get postal codes for Lagos state
fetch('http://localhost:3000/api/postal-codes/state/Lagos')
  .then(res => res.json())
  .then(data => console.log(data));

// Search for towns named "Aba"
fetch('http://localhost:3000/api/postal-codes/town/Aba')
  .then(res => res.json())
  .then(data => console.log(data));

// Reverse lookup postal code
fetch('http://localhost:3000/api/postal-codes/lookup/100001')
  .then(res => res.json())
  .then(data => console.log(data));
```

### cURL

```bash
# Get all postal codes
curl http://localhost:3000/api/postal-codes

# Get postal codes for a state
curl http://localhost:3000/api/postal-codes/state/Lagos

# Search for a town
curl http://localhost:3000/api/postal-codes/town/Aba

# Reverse lookup
curl http://localhost:3000/api/postal-codes/lookup/100001
```

### Python

```python
import requests

# Get postal codes for Lagos
response = requests.get('http://localhost:3000/api/postal-codes/state/Lagos')
data = response.json()
print(data)

# Search for towns
response = requests.get('http://localhost:3000/api/postal-codes/town/Aba')
towns = response.json()
for town in towns:
    print(f"{town['town']}: {town['postalCode']}")

# Reverse lookup
response = requests.get('http://localhost:3000/api/postal-codes/lookup/100001')
location = response.json()
print(f"{location['town']}, {location['lga']}, {location['state']}")
```

---

## Postal Code Regions

| Region | Digit | States |
|--------|-------|--------|
| South West | 1 | Lagos, Ogun, Osun, Oyo, Ekiti, Ondo |
| North Central | 2 | Kwara, Kogi, Niger, Nasarawa, Plateau, FCT |
| South South | 3 | Delta, Edo, Rivers, Bayelsa, Cross River, Akwa Ibom |
| South East | 4 | Abia, Anambra, Ebonyi, Enugu, Imo |
| North West | 8 | Kaduna, Kano, Katsina, Kebbi, Sokoto, Zamfara, Jigawa |
| North East | 6 | Adamawa, Bauchi, Borno, Gombe, Taraba, Yobe |

---

## State Base Postal Codes

```
Abia: 440001          Adamawa: 640001       Akwa Ibom: 520001
Anambra: 420001       Bauchi: 740001        Bayelsa: 561001
Benue: 970001         Borno: 600001         Cross River: 540001
Delta: 320001         Ebonyi: 840001        Edo: 300001
Ekiti: 360001         Enugu: 400001         FCT: 900001
Gombe: 760001         Imo: 460001           Jigawa: 720001
Kaduna: 800001        Kano: 700001          Katsina: 820001
Kebbi: 860001         Kogi: 260001          Kwara: 240001
Lagos: 100001         Nasarawa: 962001      Niger: 920001
Ogun: 110001          Ondo: 340001          Osun: 230001
Oyo: 200001           Plateau: 930001       Rivers: 500001
Sokoto: 840001        Taraba: 660001        Yobe: 620001
Zamfara: 880001
```

---

## Error Responses

### 404 Not Found
```json
{
  "error": "State not found"
}
```

### 400 Bad Request
```json
{
  "error": "Invalid postal code format"
}
```

---

## Data Structure

### State Object
```json
{
  "id": 1,
  "name": "Abia",
  "capital": "Umuahia",
  "region": "South East",
  "basePostalCode": "440001",
  "lgas": [...]
}
```

### LGA Object
```json
{
  "name": "Aba North",
  "basePostalCode": "440000",
  "towns": [...]
}
```

### Town Object
```json
{
  "name": "Ogbo",
  "postalCode": "440000"
}
```

---

## Integration with Main Data API

The postal codes are also integrated into the main Nigeria data API:

```bash
# Get state with postal codes
GET /api/states/Lagos

# Response includes postal codes at state, LGA, and town levels
{
  "id": 25,
  "name": "Lagos",
  "postalCode": "100001",
  "lgas": [
    {
      "name": "Agege",
      "postalCode": "100000",
      "towns": [
        {
          "name": "Agege",
          "postalCode": "100000"
        }
      ]
    }
  ]
}
```

---

## Performance Tips

1. **Cache Results**: Cache postal code lookups to reduce API calls
2. **Batch Requests**: Use state-level endpoints instead of individual town lookups
3. **Pagination**: For large result sets, implement pagination on the client side
4. **Validation**: Validate postal codes before submission using the format RRDDTTT

---

## Rate Limiting

Currently, there is no rate limiting. For production use, implement rate limiting to prevent abuse.

---

## Support

For issues or questions about the postal codes API, please refer to:
- NIPOST (Nigerian Postal Service) official documentation
- GitHub repository: [Nigeria-Dataset](https://github.com/Vickylove5223/Nigeria-Dataset)

---

## License

MIT License - Free to use in your projects
