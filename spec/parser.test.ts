import { readEntries } from '../parser';
import path from 'path';
import fs from 'fs';

describe('Parser tests', () => {
  test('func readEntries: reads and splits entries from sample.txt', () => {
    const samplePath = path.join(__dirname, './fixtures/sample.txt');
    const entries = readEntries(samplePath);
    expect(Array.isArray(entries)).toBe(true);
    expect(entries.length).toBeGreaterThan(0);
    // Each entry should have 4 lines
    entries.forEach((entry: string[]) => {
      expect(entry.length).toBe(4);
    });
  });
});
