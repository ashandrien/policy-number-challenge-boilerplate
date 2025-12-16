const fs = require('fs');
const path = require('path');

describe('sample.txt input', () => {
  const samplePath = path.join(__dirname, '../spec/fixtures/sample.txt');
  let text;

  beforeAll(() => {
    text = fs.readFileSync(samplePath, 'utf8');
  });

  test('loads the sample.txt and has 44 lines', () => {
    const lines = text.split(/\r?\n/);
    expect(lines.length).toBe(44);
  });

  test('contains underscores, spaces, and pipes', () => {
    expect(text).toContain('_');
    expect(text).toContain(' ');
    expect(text).toContain('|');
  });
});
