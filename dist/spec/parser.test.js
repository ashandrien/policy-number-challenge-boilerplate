import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { readEntries, isValidFile, parsePolicyNum } from '../parser.js';
describe('Parser tests', () => {
    test('func readEntries: reads and splits entries from sample.txt', () => {
        const samplePath = path.join(__dirname, './fixtures/sample.txt');
        const entries = readEntries(samplePath);
        expect(Array.isArray(entries)).toBe(true);
        if (Array.isArray(entries)) {
            expect(entries.length).toBeGreaterThan(0);
            // Each entry should have 4 lines
            entries.forEach((entry) => {
                expect(entry.length).toBe(4);
            });
        }
    });
});
describe('isValidFile tests', () => {
    test('non-existent file', () => {
        const notAFile = path.join(__dirname, './fixtures/NOT_A_FILE.txt');
        const entry = readEntries(notAFile);
        expect(entry).toEqual([]);
    });
    test('empty file', () => {
        const emptyFile = path.join(__dirname, './fixtures/empty.txt');
        expect(isValidFile(emptyFile)).toBe(false);
    });
    test('file less that 4 lines', () => {
        const threeLines = path.join(__dirname, './fixtures/sampleInvalid.txt');
        expect(isValidFile(threeLines)).toBe(false);
    });
});
describe('parse ASCII lines tests', () => {
    test('returns digits when given an array of text lines', () => {
        const testArray = [
            "    _  _     _  _  _  _  _ ",
            "  | _| _||_||_ |_   ||_||_|",
            "  ||_  _|  | _||_|  ||_| _|"
        ];
        expect(parsePolicyNum(testArray)).toEqual('123456789');
    });
    test('unrecognizable digit', () => {
        const testArray = [
            "    _  _     _  _  _  _ eee",
            "  | _| _||_||_ |_   ||_|eee",
            "  ||_  _|  | _||_|  ||_|eee"
        ];
        expect(parsePolicyNum(testArray)).toEqual('12345678?');
    });
});
