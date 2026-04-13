const data = require('../data/nigeria-data.json');
const states = data.states || data;
const stateList = Array.isArray(states) ? states : Object.values(states);

const withLogo = stateList.filter(s => s.logo && s.logo.length > 100);
const withoutLogo = stateList.filter(s => !s.logo || s.logo.length <= 100);

console.log('Total states:', stateList.length);
console.log('States WITH logos:', withLogo.length);
console.log('States WITHOUT logos:', withoutLogo.length);
if (withoutLogo.length > 0) {
  console.log('Missing logos:');
  withoutLogo.forEach(s => console.log(' -', s.name || s.state));
}

// Also check for broken/short base64
const suspicious = withLogo.filter(s => !s.logo.startsWith('data:image'));
if (suspicious.length > 0) {
  console.log('\nSuspicious logos (not data URI):');
  suspicious.forEach(s => console.log(' -', s.name || s.state, ':', s.logo.substring(0, 50)));
}
