import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function csvToArray(csvText, delimiter = ',') {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(delimiter).map(h => h.trim().replace(/\r/g, ''));

  return lines.slice(1).map(line => {
    const values = line.split(delimiter).map(v => v.trim().replace(/\r/g, ''));
    return headers.reduce((obj, header, i) => {
      let value = values[i] || '';

      // Remove quotes if any
      value = value.replace(/^"(.*)"$/, '$1');

      // Convert to number if applicable
      obj[header] = isNaN(value) ? value : Number(value);

      return obj;
    }, {});
  });
}


function writeJsFile(filename, variableName, data) {
  const content = `export const ${variableName} = ${JSON.stringify(data, null, 2)};\n`;
  fs.writeFileSync(filename, content, 'utf8');
  console.log(`Written ${filename}`);
}

const inputHoroscope = path.resolve(__dirname, 'src/app/utils/horroscope.csv');
const outputHoroscope = path.resolve(__dirname, 'src/app/utils/horroscopeData.js');

const inputZodiac = path.resolve(__dirname, 'src/app/utils/zodiac.csv');
const outputZodiac = path.resolve(__dirname, 'src/app/utils/zodiacData.js');

try {
  // Horoscope
  const horoscopeCsv = fs.readFileSync(inputHoroscope, 'utf8');
  const horoscopeArray = csvToArray(horoscopeCsv);
  writeJsFile(outputHoroscope, 'horoscopeData', horoscopeArray);

  // Zodiac
  const zodiacCsv = fs.readFileSync(inputZodiac, 'utf8');
  const zodiacArray = csvToArray(zodiacCsv);
  writeJsFile(outputZodiac, 'zodiacData', zodiacArray);
} catch (err) {
  console.error('Error reading or writing files:', err);
}
