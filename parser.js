// parser.js
// Step 1: Read the file and split into entries
// (Parsing logic will be added step by step)

const fs = require('fs');

function readEntries(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);
  const entries = [];
  for (let i = 0; i < lines.length; i += 4) {
    const entry = lines.slice(i, i + 4);
    if (entry.length === 4 && entry[0].trim() !== '') {
      entries.push(entry);
    }
  }
  return entries;
}

// Example usage (uncomment to test):
// const entries = readEntries('./spec/fixtures/sample.txt');
// console.log(entries.length);

module.exports = { readEntries };