# Contributing to Nigeria Data API

Thank you for your interest in contributing! This project aims to provide accurate, comprehensive data about Nigeria.

## How to Contribute

### 1. Data Corrections

If you find incorrect data:

1. Fork the repository
2. Edit `data/nigeria-data.json`
3. Submit a pull request with:
   - Description of the correction
   - Source/reference for the correct data

### 2. Adding Missing Data

#### Adding State Logos

1. Find official state logos (preferably from government sources)
2. Upload to a CDN or use existing public URLs
3. Update the `logo` field in `data/nigeria-data.json`:

```json
{
  "id": 25,
  "name": "Lagos",
  "logo": "https://your-cdn.com/lagos-logo.png"
}
```

#### Adding Wards Data

Wards data can be added by creating a new structure:

```json
"wards": [
  {
    "name": "Ward Name",
    "lga": "LGA Name",
    "state": "State Name",
    "pollingUnits": 10
  }
]
```

#### Adding More Tribes

```json
{
  "name": "Tribe Name",
  "region": "Region",
  "population": "~X%",
  "states": ["State1", "State2"]
}
```

### 3. New Features

Want to add a new endpoint or feature?

1. Open an issue describing the feature
2. Wait for discussion/approval
3. Fork and implement
4. Submit pull request

### 4. Bug Fixes

1. Open an issue describing the bug
2. Fork the repository
3. Fix the bug
4. Add tests if applicable
5. Submit pull request

## Data Sources

Please use reliable sources:
- Nigerian government websites
- National Bureau of Statistics
- INEC (Independent National Electoral Commission)
- Academic publications
- Reputable news sources

## Code Style

- Use 2 spaces for indentation
- Follow existing code patterns
- Add comments for complex logic
- Keep functions small and focused

## Pull Request Process

1. Update README.md if needed
2. Update CHANGELOG.md (if exists)
3. Ensure all tests pass
4. Request review from maintainers

## Data Accuracy

- Double-check all data before submitting
- Provide sources in PR description
- Be respectful of cultural sensitivities
- Use official names and spellings

## Questions?

Open an issue or reach out to maintainers.

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Celebrate diversity

Thank you for contributing! 🇳🇬
