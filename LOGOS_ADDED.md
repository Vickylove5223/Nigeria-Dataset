# Nigerian State Logos - Added

## Summary
Successfully added official state logos/emblems for all 36 states and the Federal Capital Territory (FCT) to the Nigeria data API.

## What Was Added
- **Logo field**: Each state now includes a `logo` property with a direct URL to the state's official emblem/seal
- **Source**: All logos sourced from Wikimedia Commons, which hosts official government emblems
- **Format**: High-quality PNG/JPG images at 200px width for optimal web display
- **Coverage**: 100% - All 37 states/territories included

## States with Logos
1. Abia - God's Own State
2. Adamawa - Land of Beauty
3. Akwa Ibom - Land of Promise
4. Anambra - Light of the Nation
5. Bauchi - Pearl of Tourism
6. Bayelsa - Glory of All Lands
7. Benue - Food Basket of the Nation
8. Borno - Home of Peace
9. Cross River - The People's Paradise
10. Delta - The Big Heart
11. Ebonyi - Salt of the Nation
12. Edo - Heartbeat of the Nation
13. Ekiti - Fountain of Knowledge
14. Enugu - Coal City State
15. FCT - Centre of Unity
16. Gombe - Jewel in the Savannah
17. Imo - Eastern Heartland
18. Jigawa - New World
19. Kaduna - Centre of Learning
20. Kano - Centre of Commerce
21. Katsina - Home of Hospitality
22. Kebbi - Land of Equity
23. Kogi - Confluence State
24. Kwara - State of Harmony
25. Lagos - Centre of Excellence
26. Nasarawa - Home of Solid Minerals
27. Niger - Power State
28. Ogun - Gateway State
29. Ondo - Sunshine State
30. Osun - State of the Living Spring
31. Oyo - Pace Setter State
32. Plateau - Home of Peace and Tourism
33. Rivers - Treasure Base of the Nation
34. Sokoto - Seat of the Caliphate
35. Taraba - Nature's Gift to the Nation
36. Yobe - Pride of the Sahel
37. Zamfara - Farming is our Pride

## Data Structure
```json
{
  "id": 1,
  "name": "Abia",
  "capital": "Umuahia",
  "slogan": "God's Own State",
  "region": "South East",
  "created": "1991",
  "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Abia_State_coat_of_arms.jpg/200px-Abia_State_coat_of_arms.jpg",
  "lgas": [...]
}
```

## Usage
The logos can be displayed in web applications by using the `logo` URL directly in an `<img>` tag:

```html
<img src="state.logo" alt="{state.name} Logo" width="200" />
```

## Files Modified
- `data/nigeria-data.json` - Updated with logo URLs for all states
- `scripts/add-logos.js` - Script used to add logos (can be reused for updates)

## Metadata Updated
- Version: 1.2.0
- Last Updated: 2026-04-12
- Note: State logos added from Wikimedia Commons

## Attribution
All logos are sourced from [Wikimedia Commons](https://commons.wikimedia.org/), which hosts freely licensed government emblems and official insignia.
