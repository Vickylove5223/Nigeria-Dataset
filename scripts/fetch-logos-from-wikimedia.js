const fs = require('fs');
const path = require('path');

// State logos data with Wikimedia Commons file names
const stateLogos = [
  { state: "Abia", file: "Abia_State_coat_of_arms.jpg" },
  { state: "Adamawa", file: "Adamawa_State_Emblem.png" },
  { state: "Akwa Ibom", file: "Seal_of_the_Akwa-Ibom_State_Government.jpg" },
  { state: "Anambra", file: "Anambra_State_coat_of_arms.jpg" },
  { state: "Bauchi", file: "Bauchi_State_Emblem.png" },
  { state: "Bayelsa", file: "Bayelsa_State_Emblem.png" },
  { state: "Benue", file: "Benue_State_Emblem.png" },
  { state: "Borno", file: "Borno_State_Emblem.png" },
  { state: "Cross River", file: "Cross_River_State_Emblem.png" },
  { state: "Delta", file: "Delta_State_Emblem.png" },
  { state: "Ebonyi", file: "Ebonyi_State_Emblem.png" },
  { state: "Edo", file: "Edo_State_Emblem.png" },
  { state: "Ekiti", file: "Ekiti_State_Emblem.png" },
  { state: "Enugu", file: "Enugu_State_Emblem.png" },
  { state: "FCT", file: "Seal_of_the_Federal_Capital_Territory.png" },
  { state: "Gombe", file: "Gombe_State_Emblem.png" },
  { state: "Imo", file: "Imo_State_Emblem.png" },
  { state: "Jigawa", file: "Jigawa_State_Emblem.png" },
  { state: "Kaduna", file: "Kaduna_State_Emblem.png" },
  { state: "Kano", file: "Kano_State_Emblem.png" },
  { state: "Katsina", file: "Katsina_State_Emblem.png" },
  { state: "Kebbi", file: "Kebbi_State_Emblem.png" },
  { state: "Kogi", file: "Kogi_State_Emblem.png" },
  { state: "Kwara", file: "Kwara_State_Emblem.png" },
  { state: "Lagos", file: "Lagos_Seal.png" },
  { state: "Nasarawa", file: "Nasarawa_State_Emblem.png" },
  { state: "Niger", file: "Niger_State_Emblem.png" },
  { state: "Ogun", file: "Ogun_State_Emblem.png" },
  { state: "Ondo", file: "Ondo_State_Emblem.png" },
  { state: "Osun", file: "Osun_State_Emblem.png" },
  { state: "Oyo", file: "Oyo_State_Coat_of_Arms.png" },
  { state: "Plateau", file: "Plateau_State_Emblem.png" },
  { state: "Rivers", file: "Rivers_State_Emblem.png" },
  { state: "Sokoto", file: "Sokoto_State_Emblem.png" },
  { state: "Taraba", file: "Taraba_State_Emblem.png" },
  { state: "Yobe", file: "Yobe_State_Emblem.png" },
  { state: "Zamfara", file: "Zamfara_State_Emblem.png" }
];

// Generate direct Wikimedia Commons image URLs
const logos = stateLogos.map(item => ({
  state: item.state,
  logo: `https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/${item.file}/200px-${item.file}`,
  source: "Wikimedia Commons"
}));

const output = {
  logos,
  note: "Direct image URLs from Wikimedia Commons with 200px thumbnail size",
  lastUpdated: new Date().toISOString()
};

// Write to data directory
fs.writeFileSync(
  path.join(__dirname, '../data/state-logos.json'),
  JSON.stringify(output, null, 2)
);

console.log(`✓ Updated state-logos.json with ${logos.length} state logos`);
