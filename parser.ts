// parser.ts
// step 1: read the file 
import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function isValidFile(filePath: string) {
  try {
    const file = fs.readFileSync(filePath, 'utf8');
    // empty string check
    if(!file.trim()) {
      return false;
    }
    // Check for 4 lines
    const lines = file.split(/(?:\r\n|\r|\n)/g);
    if(lines.length < 4) {
      return false
    }
    return true;
    
  } catch(e) {
    console.log(e);
    return false;
  }
}

// read the entries and output numberChunks, i.e. individual lines of policy numbers
export function readEntries(filePath: string) {
  if (!isValidFile(filePath)) {
    return [];
  }
  const file = fs.readFileSync(filePath, 'utf8');
  const lines = file.split(/(?:\r\n|\r|\n)/g);
  const numberChunks = [];
  // each number is 4 lines long (with one blank at the end)
  for (let i = 0; i < lines.length; i += 4) {
    const chunk = lines.slice(i, i + 4);
    console.log(chunk);
    numberChunks.push(chunk);
  }
  return numberChunks;
}

const sampleText: string = path.join(__dirname, 'spec/fixtures/sample.txt');
export const entries: string[][] = readEntries(sampleText);


// Example usage (uncomment to test):
// const entries = readEntries('./spec/fixtures/sample.txt');
// console.log(entries.length);

