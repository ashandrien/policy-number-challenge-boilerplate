const { readEntries } = require('../parser');
const path = require('path');

describe('Parser', () => {
  test('reads and splits entries from sample.txt', () => {
    const samplePath = path.join(__dirname, '../spec/fixtures/sample.txt');
    const entries = readEntries(samplePath);
    expect(Array.isArray(entries)).toBe(true);
    expect(entries.length).toBeGreaterThan(0);
    // Each entry should have 4 lines
    entries.forEach(entry => {
      expect(entry.length).toBe(4);
    });
  });
});
