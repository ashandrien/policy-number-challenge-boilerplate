// parser.ts
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { DIGIT_MAP } from './utils/digitMap.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// empty string, policy number < 4 lines is invalid
export function isValidFile(filePath: string): boolean {
  try {
    const file = fs.readFileSync(filePath, 'utf8');
    // empty string check
    if (!file.trim()) return false;
    // Check for 4 lines
    const lines = file.split(/(?:\r\n|\r|\n)/g);
    if (lines.length < 4) return false;
    return true;
  } catch (e) {
    return false;
  }
}

// read the file and return array of policy number arrays
export function readEntries(filePath: string): string[][] | false {
  // is it empty or not 4 lines?
  if (!isValidFile(filePath)) {
    return [];
  }
  const file = fs.readFileSync(filePath, 'utf8');
  const lines = file.split(/(?:\r\n|\r|\n)/g);
  const numberChunks = [];
  // each number is 4 lines long (with one blank at the end)
  for (let i = 0; i < lines.length; i += 4) {
    const chunk = lines.slice(i, i + 4);
    numberChunks.push(chunk);
  }
  return numberChunks;
}

//given an array of 4-line ascii policy strings, return a string (digit)
export function parsePolicyNum(asciiArr: string[]): string {
  let digit = '';
  for (let i=0; i < 27; i += 3) {
    // create an array with each line of characters
    const lines = [
      asciiArr[0].slice(i, i+3),
      asciiArr[1].slice(i, i+3),
      asciiArr[2].slice(i, i+3),
    ];
    // join the characters in a readable format with new line in between
    const key = lines.join('\n');
    
    // use the ascii character as a key
    digit += DIGIT_MAP[key] ?? '?';
  }
  console.log('Parsed policy number:', digit); // <-- log the final result here
  return digit;
}

// Demo: Read and parse the first entry from sample.txt
const samplePath = path.join(__dirname, 'spec/fixtures/sample.txt');
const entries = readEntries(samplePath);
if (Array.isArray(entries) && entries.length > 0) {
  const firstEntry = entries[0];
  const parsed = parsePolicyNum(firstEntry);
} else {
  console.log('No valid entries found in sample.txt');
}

// Minimal direct test for parsePolicyNum
const testEntry = [
  '    _  _     _  _  _  _  _ ',
  '  | _| _||_||_ |_   ||_||_|',
  '  ||_  _|  | _||_|  ||_| _|',
  ''
];
parsePolicyNum(testEntry);


