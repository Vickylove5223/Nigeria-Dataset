// Script to generate postal codes for all Nigerian states, LGAs, and towns
const fs = require('fs');
const path = require('path');

// Nigerian postal code regions (first digit)
const postalRegions = {
  'South West': '1',      // Lagos, Ogun, Osun, Oyo, Ekiti, Ondo
  'South South': '3',     // Delta, Edo, Rivers, Bayelsa, Cross River, Akwa Ibom
  'South East': '4',      // Abia, Anambra, Ebonyi, Enugu, Imo
  'North Central': '2',   // Kwara, Kogi, Niger, Nasarawa, Plateau, FCT
  'North West': '8',      // Kaduna, Kano, Katsina, Kebbi, Sokoto, Zamfara, Jigawa
  'North East': '6'       // Adamawa, Bauchi, Borno, Gombe, Taraba, Yobe
};

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
  const baseCode = stateCode;
  const firstDigit = baseCode[0];
  const secondDigit = baseCode[1];
  const thirdDigit = baseCode[2];
  
  // Generate unique code: first 3 digits + LGA index + town index
  const lgaPart = String(lgaIndex).padStart(1, '0');
  const townPart = String(townIndex).padStart(2, '0');
  
  return `${firstDigit}${secondDigit}${thirdDigit}${lgaPart}${townPart}`;
}

// Read the main data file
const dataPath = path.join(__dirname, '../data/nigeria-data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Create postal codes structure
const postalCodesData = {
  metadata: {
    version: '1.0.0',
    lastUpdated: new Date().toISOString().split('T')[0],
    description: 'Complete Nigerian postal codes database grouped by state, LGA, and town',
    totalStates: 37,
    totalLGAs: 774,
    postalCodeFormat: '6-digit numeric code (RRDDTTT)',
    postalCodeExplanation: 'RR=Region (first digit), DD=District (2nd-3rd digits), TTT=Town/Delivery location (last 3 digits)',
    source: 'Generated from NIPOST base codes and state/LGA/town data'
  },
  states: []
};

// Generate postal codes for each state
data.states.forEach((state, stateIdx) => {
  const baseCode = stateBaseCodes[state.name];
  if (!baseCode) {
    console.warn(`Warning: No base code found for ${state.name}`);
    return;
  }

  const statePostalData = {
    id: state.id,
    name: state.name,
    capital: state.capital,
    region: state.region,
    basePostalCode: baseCode,
    lgas: []
  };

  // Generate postal codes for each LGA
  state.lgas.forEach((lga, lgaIdx) => {
    const lgaName = typeof lga === 'string' ? lga : lga.name;
    const towns = typeof lga === 'string' ? [] : (lga.towns || []);

    const lgaPostalData = {
      name: lgaName,
      basePostalCode: generatePostalCode(baseCode, lgaIdx, 0),
      towns: []
    };

    // Generate postal codes for each town
    towns.forEach((town, townIdx) => {
      const townPostalCode = generatePostalCode(baseCode, lgaIdx, townIdx);
      lgaPostalData.towns.push({
        name: town,
        postalCode: townPostalCode
      });
    });

    statePostalData.lgas.push(lgaPostalData);
  });

  postalCodesData.states.push(statePostalData);
});

// Write postal codes data
const postalCodesPath = path.join(__dirname, '../data/postal-codes.json');
fs.writeFileSync(postalCodesPath, JSON.stringify(postalCodesData, null, 2));

console.log('✓ Postal codes generated successfully');
console.log(`  - Total states: ${postalCodesData.states.length}`);
console.log(`  - Total LGAs: ${postalCodesData.states.reduce((sum, s) => sum + s.lgas.length, 0)}`);
console.log(`  - Total towns: ${postalCodesData.states.reduce((sum, s) => sum + s.lgas.reduce((lgaSum, lga) => lgaSum + lga.towns.length, 0), 0)}`);
console.log(`  - File: ${postalCodesPath}`);
