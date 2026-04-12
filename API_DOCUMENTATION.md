# Nigeria Data API - Complete Documentation

## Overview

The Nigeria Data API provides free, comprehensive access to Nigerian geographic and demographic data. No authentication required.

## Base URL

**Local Development:** `http://localhost:3000`
**Production:** `https://your-deployed-url.com`

## Response Format

All responses are in JSON format with appropriate HTTP status codes.

### Success Response
```json
{
  "data": [...],
  "status": 200
}
```

### Error Response
```json
{
  "error": "Error message",
  "status": 404
}
```

## Endpoints

### 1. Root Endpoint

**GET** `/`

Returns API information and available endpoints.

**Response:**
```json
{
  "message": "Welcome to Nigeria Data API",
  "version": "1.0.0",
  "endpoints": {...},
  "usage": "Free to use for any project"
}
```

---

### 2. States

#### Get All States
**GET** `/api/states`

Returns all 37 Nigerian states with complete information.

**Response Fields:**
- `id`: Unique identifier
- `name`: State name
- `capital`: State capital city
- `slogan`: State motto/slogan
- `region`: Geopolitical zone
- `created`: Year of creation
- `logo`: State logo URL (empty if not available)
- `lgas`: Array of Local Government Areas

**Example Response:**
```json
[
  {
    "id": 25,
    "name": "Lagos",
    "capital": "Ikeja",
    "slogan": "Centre of Excellence",
    "region": "South West",
    "created": "1967",
    "logo": "",
    "lgas": ["Agege", "Ajeromi-Ifelodun", ...]
  }
]
```

#### Get State by Name
**GET** `/api/states/:name`

Returns specific state information.

**Parameters:**
- `name`: State name (case-insensitive)

**Example:** `/api/states/Lagos`

**Error Responses:**
- `404`: State not found

---

### 3. Local Government Areas (LGAs)

#### Get All LGAs
**GET** `/api/lgas`

Returns all 774 LGAs with their states.

**Response:**
```json
[
  {
    "name": "Agege",
    "state": "Lagos"
  },
  ...
]
```

#### Get LGAs by State
**GET** `/api/lgas/:state`

Returns all LGAs for a specific state.

**Parameters:**
- `state`: State name (case-insensitive)

**Example:** `/api/lgas/Kano`

**Response:**
```json
[
  {
    "name": "Ajingi",
    "state": "Kano"
  },
  ...
]
```

---

### 4. Geopolitical Regions

#### Get All Regions
**GET** `/api/regions`

Returns the 6 geopolitical zones.

**Response:**
```json
[
  "North West",
  "North East",
  "North Central",
  "South West",
  "South East",
  "South South"
]
```

#### Get States by Region
**GET** `/api/regions/:region`

Returns all states in a specific region.

**Parameters:**
- `region`: Region name (case-insensitive, use %20 for spaces)

**Example:** `/api/regions/South%20West`

**Response:**
```json
[
  {
    "id": 25,
    "name": "Lagos",
    "capital": "Ikeja",
    ...
  },
  ...
]
```

---

### 5. Tribes

#### Get All Tribes
**GET** `/api/tribes`

Returns major Nigerian tribes with demographic information.

**Response Fields:**
- `name`: Tribe name
- `region`: Primary region
- `population`: Approximate percentage of population
- `states`: Array of states where tribe is prominent

**Example Response:**
```json
[
  {
    "name": "Hausa",
    "region": "North",
    "population": "~30%",
    "states": ["Kano", "Katsina", "Kaduna", ...]
  },
  ...
]
```

---

### 6. Ethnic Groups

#### Get Ethnic Groups
**GET** `/api/ethnic-groups`

Returns ethnic group classifications.

**Response:**
```json
[
  {
    "name": "Niger-Congo",
    "description": "Largest language family in Africa",
    "subgroups": ["Yoruba", "Igbo", "Ijaw", ...]
  },
  ...
]
```

---

### 7. Religions

#### Get Religious Demographics
**GET** `/api/religions`

Returns religious distribution in Nigeria.

**Response Fields:**
- `name`: Religion name
- `percentage`: Percentage of population
- `predominantRegions`: Array of regions
- `denominations`: Array of denominations (for Christianity)
- `description`: Additional information

**Example Response:**
```json
[
  {
    "name": "Islam",
    "percentage": 53.5,
    "predominantRegions": ["North West", "North East", "North Central"],
    "description": "Predominantly Sunni Islam"
  },
  ...
]
```

---

### 8. Metadata

#### Get API Metadata
**GET** `/api/metadata`

Returns API statistics and information.

**Response:**
```json
{
  "version": "1.0.0",
  "lastUpdated": "2025-04-12",
  "description": "Comprehensive Nigeria geographic and demographic data API",
  "totalStates": 37,
  "totalLGAs": 774,
  "dataSource": "Consolidated from multiple verified sources"
}
```

---

### 9. Search

#### Search Across Data
**GET** `/api/search?q=query`

Search across states, capitals, and tribes.

**Query Parameters:**
- `q`: Search query (required)

**Example:** `/api/search?q=lagos`

**Response:**
```json
{
  "states": [...],
  "tribes": [...]
}
```

**Error Responses:**
- `400`: Query parameter missing

---

## Rate Limiting

Currently no rate limiting. Please use responsibly.

## CORS

CORS is enabled for all origins. You can call this API from any domain.

## Error Codes

- `200`: Success
- `400`: Bad Request (missing parameters)
- `404`: Not Found (resource doesn't exist)
- `500`: Internal Server Error

## Data Accuracy

Data is consolidated from multiple verified Nigerian sources. If you find inaccuracies, please contribute corrections via GitHub.

## Use Cases

- Mobile apps needing Nigerian location data
- Web forms with state/LGA dropdowns
- Educational projects and research
- Government applications
- E-commerce delivery systems
- Demographics analysis
- GIS and mapping applications

## Support

- GitHub Issues: Report bugs or request features
- Contributions: See CONTRIBUTING.md
- Deployment: See DEPLOYMENT.md

## License

MIT License - Free to use for any project, commercial or personal.
