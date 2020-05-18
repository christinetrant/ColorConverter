# Color Converter RGB <-> HEX

A function that converts HEX to RGB and vice versa.
The function autodects the format so that if you enter HEX color format it returns RGB and if you enter RGB color format it returns HEX.

## Installation
`npm install colorconverter-z2m`

## Usage:
```
const convert = require('colorconverter-z2m');
// input must be a string
const input = 'f4d5f3';
// get the result of our conversion
const output = convert(input);
// log result to the console
console.log(output);
```

##Why did I create it?
* Created this package as part of a coding challenge hosted by z2m - (https://github.com/zero-to-mastery/Coding_Challenge-6)[https://github.com/zero-to-mastery/Coding_Challenge-6]

## License
ISC License.

## Enjoy!