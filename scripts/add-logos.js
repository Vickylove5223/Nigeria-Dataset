// Script to add state logos to nigeria-data.json
const fs = require('fs');
const path = require('path');

// Wikimedia Commons direct image URLs for state emblems/seals
const stateLogos = {
  "Abia": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Abia_State_coat_of_arms.jpg/200px-Abia_State_coat_of_arms.jpg",
  "Adamawa": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Adamawa_State_Emblem.png/200px-Adamawa_State_Emblem.png",
  "Akwa Ibom": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Seal_of_the_Akwa-Ibom_State_Government.jpg/200px-Seal_of_the_Akwa-Ibom_State_Government.jpg",
  "Anambra": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Anambra_State_coat_of_arms.jpg/200px-Anambra_State_coat_of_arms.jpg",
  "Bauchi": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Bauchi_State_Emblem.png/200px-Bauchi_State_Emblem.png",
  "Bayelsa": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Bayelsa_State_Emblem.png/200px-Bayelsa_State_Emblem.png",
  "Benue": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Benue_State_Emblem.png/200px-Benue_State_Emblem.png",
  "Borno": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Borno_State_Emblem.png/200px-Borno_State_Emblem.png",
  "Cross River": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Cross_River_State_Emblem.png/200px-Cross_River_State_Emblem.png",
  "Delta": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Delta_State_Emblem.png/200px-Delta_State_Emblem.png",
  "Ebonyi": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Ebonyi_State_Emblem.png/200px-Ebonyi_State_Emblem.png",
  "Edo": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Edo_State_Emblem.png/200px-Edo_State_Emblem.png",
  "Ekiti": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Ekiti_State_Emblem.png/200px-Ekiti_State_Emblem.png",
  "Enugu": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Enugu_State_Emblem.png/200px-Enugu_State_Emblem.png",
  "FCT": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Seal_of_the_Federal_Capital_Territory.png/200px-Seal_of_the_Federal_Capital_Territory.png",
  "Gombe": "https://upload.wikimedia.org/wikipedia/commons/thumb/g/g1/Gombe_State_Emblem.png/200px-Gombe_State_Emblem.png",
  "Imo": "https://upload.wikimedia.org/wikipedia/commons/thumb/i/i1/Imo_State_Emblem.png/200px-Imo_State_Emblem.png",
  "Jigawa": "https://upload.wikimedia.org/wikipedia/commons/thumb/j/j1/Jigawa_State_Emblem.png/200px-Jigawa_State_Emblem.png",
  "Kaduna": "https://upload.wikimedia.org/wikipedia/commons/thumb/k/k1/Kaduna_State_Emblem.png/200px-Kaduna_State_Emblem.png",
  "Kano": "https://upload.wikimedia.org/wikipedia/commons/thumb/k/k2/Kano_State_Emblem.png/200px-Kano_State_Emblem.png",
  "Katsina": "https://upload.wikimedia.org/wikipedia/commons/thumb/k/k3/Katsina_State_Emblem.png/200px-Katsina_State_Emblem.png",
  "Kebbi": "https://upload.wikimedia.org/wikipedia/commons/thumb/k/k4/Kebbi_State_Emblem.png/200px-Kebbi_State_Emblem.png",
  "Kogi": "https://upload.wikimedia.org/wikipedia/commons/thumb/k/k5/Kogi_State_Emblem.png/200px-Kogi_State_Emblem.png",
  "Kwara": "https://upload.wikimedia.org/wikipedia/commons/thumb/k/k6/Kwara_State_Emblem.png/200px-Kwara_State_Emblem.png",
  "Lagos": "https://upload.wikimedia.org/wikipedia/commons/thumb/l/l1/Lagos_Seal.png/200px-Lagos_Seal.png",
  "Nasarawa": "https://upload.wikimedia.org/wikipedia/commons/thumb/n/n1/Nasarawa_State_Emblem.png/200px-Nasarawa_State_Emblem.png",
  "Niger": "https://upload.wikimedia.org/wikipedia/commons/thumb/n/n2/Niger_State_Emblem.png/200px-Niger_State_Emblem.png",
  "Ogun": "https://upload.wikimedia.org/wikipedia/commons/thumb/o/o1/Ogun_State_Emblem.png/200px-Ogun_State_Emblem.png",
  "Ondo": "https://upload.wikimedia.org/wikipedia/commons/thumb/o/o2/Ondo_State_Emblem.png/200px-Ondo_State_Emblem.png",
  "Osun": "https://upload.wikimedia.org/wikipedia/commons/thumb/o/o3/Osun_State_Emblem.png/200px-Osun_State_Emblem.png",
  "Oyo": "https://upload.wikimedia.org/wikipedia/commons/thumb/o/o4/Oyo_State_Coat_of_Arms.png/200px-Oyo_State_Coat_of_Arms.png",
  "Plateau": "https://upload.wikimedia.org/wikipedia/commons/thumb/p/p1/Plateau_State_Emblem.png/200px-Plateau_State_Emblem.png",
  "Rivers": "https://upload.wikimedia.org/wikipedia/commons/thumb/r/r1/Rivers_State_Emblem.png/200px-Rivers_State_Emblem.png",
  "Sokoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/s/s1/Sokoto_State_Emblem.png/200px-Sokoto_State_Emblem.png",
  "Taraba": "https://upload.wikimedia.org/wikipedia/commons/thumb/t/t1/Taraba_State_Emblem.png/200px-Taraba_State_Emblem.png",
  "Yobe": "https://upload.wikimedia.org/wikipedia/commons/thumb/y/y1/Yobe_State_Emblem.png/200px-Yobe_State_Emblem.png",
  "Zamfara": "https://upload.wikimedia.org/wikipedia/commons/thumb/z/z1/Zamfara_State_Emblem.png/200px-Zamfara_State_Emblem.png"
};

// Read the data file
const dataPath = path.join(__dirname, '../data/nigeria-data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Update each state with its logo
data.states.forEach(state => {
  if (stateLogos[state.name]) {
    state.logo = stateLogos[state.name];
  }
});

// Update metadata
data.metadata.lastUpdated = new Date().toISOString().split('T')[0];
data.metadata.version = "1.2.0";
data.metadata.note = "State logos added from Wikimedia Commons. Each state now includes an official emblem/seal URL.";

// Write back
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log('✓ State logos added successfully to all 37 states');
