
# Policy Number Challenge

## Ruby dependencies

If you are using the Ruby code, you may need to install gems as required by your implementation. For example:

```
gem install builder
```

## JavaScript parser

This project now includes a JavaScript parser for reading and splitting the scanned policy number file into entries.

### Dependencies

- Node.js (v14 or later recommended)

No external npm packages are required; only Node's built-in `fs` module is used.

### Usage

1. Place your scanned file (e.g., `spec/fixtures/sample.txt`) in the appropriate location.
2. Use the parser in your JavaScript code:

```
const { readEntries } = require('./parser');
const entries = readEntries('./spec/fixtures/sample.txt');
console.log(entries.length); // Number of entries found
```

This will read the file and split it into 4-line entries, as described in User Story 1.

Further parsing logic will be added in subsequent steps.