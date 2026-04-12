// Script to build comprehensive Nigeria data
const fs = require('fs');
const path = require('path');

// Complete states data with all information
const statesData = [
  { id: 1, name: "Abia", capital: "Umuahia", slogan: "God's Own State", region: "South East", created: "1991", logo: "" },
  { id: 2, name: "Adamawa", capital: "Yola", slogan: "Land of Beauty", region: "North East", created: "1991", logo: "" },
  { id: 3, name: "Akwa Ibom", capital: "Uyo", slogan: "Land of Promise", region: "South South", created: "1987", logo: "" },
  { id: 4, name: "Anambra", capital: "Awka", slogan: "Light of the Nation", region: "South East", created: "1991", logo: "" },
  { id: 5, name: "Bauchi", capital: "Bauchi", slogan: "Pearl of Tourism", region: "North East", created: "1976", logo: "" },
  { id: 6, name: "Bayelsa", capital: "Yenagoa", slogan: "Glory of All Lands", region: "South South", created: "1996", logo: "" },
  { id: 7, name: "Benue", capital: "Makurdi", slogan: "Food Basket of the Nation", region: "North Central", created: "1976", logo: "" },
  { id: 8, name: "Borno", capital: "Maiduguri", slogan: "Home of Peace", region: "North East", created: "1976", logo: "" },
  { id: 9, name: "Cross River", capital: "Calabar", slogan: "The People's Paradise", region: "South South", created: "1967", logo: "" },
  { id: 10, name: "Delta", capital: "Asaba", slogan: "The Big Heart", region: "South South", created: "1991", logo: "" },
  { id: 11, name: "Ebonyi", capital: "Abakaliki", slogan: "Salt of the Nation", region: "South East", created: "1996", logo: "" },
  { id: 12, name: "Edo", capital: "Benin City", slogan: "Heartbeat of the Nation", region: "South South", created: "1991", logo: "" },
  { id: 13, name: "Ekiti", capital: "Ado-Ekiti", slogan: "Fountain of Knowledge", region: "South West", created: "1996", logo: "" },
  { id: 14, name: "Enugu", capital: "Enugu", slogan: "Coal City State", region: "South East", created: "1991", logo: "" },
  { id: 15, name: "FCT", capital: "Abuja", slogan: "Centre of Unity", region: "North Central", created: "1976", logo: "" },
  { id: 16, name: "Gombe", capital: "Gombe", slogan: "Jewel in the Savannah", region: "North East", created: "1996", logo: "" },
  { id: 17, name: "Imo", capital: "Owerri", slogan: "Eastern Heartland", region: "South East", created: "1976", logo: "" },
  { id: 18, name: "Jigawa", capital: "Dutse", slogan: "New World", region: "North West", created: "1991", logo: "" },
  { id: 19, name: "Kaduna", capital: "Kaduna", slogan: "Centre of Learning", region: "North West", created: "1967", logo: "" },
  { id: 20, name: "Kano", capital: "Kano", slogan: "Centre of Commerce", region: "North West", created: "1967", logo: "" },
  { id: 21, name: "Katsina", capital: "Katsina", slogan: "Home of Hospitality", region: "North West", created: "1987", logo: "" },
  { id: 22, name: "Kebbi", capital: "Birnin Kebbi", slogan: "Land of Equity", region: "North West", created: "1991", logo: "" },
  { id: 23, name: "Kogi", capital: "Lokoja", slogan: "Confluence State", region: "North Central", created: "1991", logo: "" },
  { id: 24, name: "Kwara", capital: "Ilorin", slogan: "State of Harmony", region: "North Central", created: "1967", logo: "" },
  { id: 25, name: "Lagos", capital: "Ikeja", slogan: "Centre of Excellence", region: "South West", created: "1967", logo: "" },
  { id: 26, name: "Nasarawa", capital: "Lafia", slogan: "Home of Solid Minerals", region: "North Central", created: "1996", logo: "" },
  { id: 27, name: "Niger", capital: "Minna", slogan: "Power State", region: "North Central", created: "1976", logo: "" },
  { id: 28, name: "Ogun", capital: "Abeokuta", slogan: "Gateway State", region: "South West", created: "1976", logo: "" },
  { id: 29, name: "Ondo", capital: "Akure", slogan: "Sunshine State", region: "South West", created: "1976", logo: "" },
  { id: 30, name: "Osun", capital: "Osogbo", slogan: "State of the Living Spring", region: "South West", created: "1991", logo: "" },
  { id: 31, name: "Oyo", capital: "Ibadan", slogan: "Pace Setter State", region: "South West", created: "1976", logo: "" },
  { id: 32, name: "Plateau", capital: "Jos", slogan: "Home of Peace and Tourism", region: "North Central", created: "1976", logo: "" },
  { id: 33, name: "Rivers", capital: "Port Harcourt", slogan: "Treasure Base of the Nation", region: "South South", created: "1967", logo: "" },
  { id: 34, name: "Sokoto", capital: "Sokoto", slogan: "Seat of the Caliphate", region: "North West", created: "1976", logo: "" },
  { id: 35, name: "Taraba", capital: "Jalingo", slogan: "Nature's Gift to the Nation", region: "North East", created: "1991", logo: "" },
  { id: 36, name: "Yobe", capital: "Damaturu", slogan: "Pride of the Sahel", region: "North East", created: "1991", logo: "" },
  { id: 37, name: "Zamfara", capital: "Gusau", slogan: "Farming is our Pride", region: "North West", created: "1996", logo: "" }
];

console.log('Building comprehensive Nigeria data...');
console.log(`Total States: ${statesData.length}`);

// Save to file
const outputPath = path.join(__dirname, '..', 'data', 'states-basic.json');
fs.writeFileSync(outputPath, JSON.stringify(statesData, null, 2));
console.log(`Data saved to ${outputPath}`);
