/**
 * build-logos.js
 * Run: node scripts/build-logos.js
 *
 * This script reads logo image files from scripts/logos/ folder
 * and builds data/state-logos.json.
 *
 * Place your state logo image files in: scripts/logos/
 * Name them exactly as: Abia.jpg, Adamawa.jpg, Akwa Ibom.jpg, etc.
 * Supported formats: .jpg, .jpeg, .png, .gif, .svg, .webp
 */

const fs = require('fs');
const path = require('path');

const LOGOS_DIR = path.join(__dirname, 'logos');
const OUTPUT_FILE = path.join(__dirname, '..', 'data', 'state-logos.json');

const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa',
  'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo',
  'Ekiti', 'Enugu', 'Gombe', 'Imo', 'Jigawa', 'Kaduna',
  'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos',
  'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo',
  'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara', 'FCT'
];

const MIME_TYPES = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp'
};

function getLogoForState(stateName) {
  if (!fs.existsSync(LOGOS_DIR)) {
    return null;
  }

  const files = fs.readdirSync(LOGOS_DIR);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const baseName = path.basename(file, ext);

    if (baseName.toLowerCase() === stateName.toLowerCase() && MIME_TYPES[ext]) {
      const filePath = path.join(LOGOS_DIR, file);
      const fileBuffer = fs.readFileSync(filePath);
      const base64 = fileBuffer.toString('base64');
      const mimeType = MIME_TYPES[ext];
      return `data:${mimeType};base64,${base64}`;
    }
  }

  return null;
}

function buildLogos() {
  if (!fs.existsSync(LOGOS_DIR)) {
    fs.mkdirSync(LOGOS_DIR, { recursive: true });
    console.log(`Created logos folder: ${LOGOS_DIR}`);
    console.log('Place your state logo images in that folder, named like: Abia.jpg, Lagos.png, etc.');
    return;
  }

  const logos = [];
  let found = 0;
  let missing = [];

  for (const state of NIGERIAN_STATES) {
    const logo = getLogoForState(state);
    if (logo) {
      logos.push({ state, logo, source: 'File' });
      found++;
      console.log(`✓ ${state}`);
    } else {
      missing.push(state);
      console.log(`✗ ${state} (no image found)`);
    }
  }

  const output = { logos };
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));

  console.log(`\n✅ Done! ${found} logos saved to data/state-logos.json`);
  if (missing.length > 0) {
    console.log(`⚠️  Missing logos for: ${missing.join(', ')}`);
  }
}

buildLogos();
