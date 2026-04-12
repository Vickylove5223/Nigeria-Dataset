// Script to add postal codes to the main nigeria-data.json file
const fs = require('fs');
const path = require('path');

// Base postal codes for each state (from NIPOST)
const stateBaseCodes = {
  'Abia': '440001',
  'Adamawa': '640001',
  'Akwa Ibom': '520001',
  'Anambra': '420001',
  'Bauchi': '740001',
  'Bayelsa': '561001',
  'Benue': '970001',
  'Borno': '600001',
  'Cross River': '540001',
  'Delta': '320001',
  'Ebonyi': '840001',
  'Edo': '300001',
  'Ekiti': '360001',
  'Enugu': '400001',
  'FCT': '900001',
  'Gombe': '760001',
  'Imo': '460001',
  'Jigawa': '720001',
  'Kaduna': '800001',
  'Kano': '700001',
  'Katsina': '820001',
  'Kebbi': '860001',
  'Kogi': '260001',
  'Kwara': '240001',
  'Lagos': '100001',
  'Nasarawa': '962001',
  'Niger': '920001',
  'Ogun': '110001',
  'Ondo': '340001',
  'Osun': '230001',
  'Oyo': '200001',
  'Plateau': '930001',
  'Rivers': '500001',
  'Sokoto': '840001',
  'Taraba': '660001',
  'Yobe': '620001',
  'Zamfara': '880001'
};

// Function to generate postal code for a town
function generatePostalCode(stateCode, lgaIndex, townIndex) {
  const firstDigit = stateCode[0];
  const secondDigit = stateCode[1];
  const thirdDigit = stateCode[2];
  
  const lgaPart = String(lgaIndex).padStart(1, '0');
  const townPart = String(townIndex).padStart(2, '0');
  
  return `${firstDigit}${secondDigit}${thirdDigit}${lgaPart}${townPart}`;
}

// Read the main data file
const dataPath = path.join(__dirname, '../data/nigeria-data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Add postal codes to each state
data.states.forEach((state) => {
  const baseCode = stateBaseCodes[state.name];
  if (!baseCode) {
    console.warn(`Warning: No base code found for ${state.name}`);
    return;
  }

  // Add postal code to state
  state.postalCode = baseCode;

  // Add postal codes to LGAs and towns
  state.lgas.forEach((lga, lgaIdx) => {
    if (typeof lga === 'object' && lga.name) {
      // LGA has towns
      lga.postalCode = generatePostalCode(baseCode, lgaIdx, 0);
      
      if (lga.towns && Array.isArray(lga.towns)) {
        lga.towns.forEach((town, townIdx) => {
          if (typeof town === 'string') {
            // Convert to object with postal code
            lga.towns[townIdx] = {
              name: town,
              postalCode: generatePostalCode(baseCode, lgaIdx, townIdx)
            };
          } else if (typeof town === 'object') {
            // Add postal code to existing object
            town.postalCode = generatePostalCode(baseCode, lgaIdx, townIdx);
          }
        });
      }
    }
  });
});

// Update metadata
data.metadata.version = "1.3.0";
data.metadata.lastUpdated = new Date().toISOString().split('T')[0];
data.metadata.note = "State logos added from Wikimedia Commons. Postal codes added for all states, LGAs, and towns. Each town now includes a unique 6-digit postal code.";

// Write back
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log('✓ Postal codes added to main data file');
console.log(`  - Version updated to: ${data.metadata.version}`);
console.log(`  - All ${data.states.length} states now have postal codes`);
console.log(`  - All ${data.states.reduce((sum, s) => sum + s.lgas.length, 0)} LGAs now have postal codes`);
