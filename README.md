###Color Converter RGB <-> HEX

##What does your npm package do?
* A function that converts HEX to RGB and vice versa. T
* The function autodects the format so that if you enter HEX color format it returns RGB and if you enter RGB color format it returns HEX.

##Why did you create it.
* Created this package as part of a coding challenge hosted by z2m - (https://github.com/zero-to-mastery/Coding_Challenge-6)[https://github.com/zero-to-mastery/Coding_Challenge-6]

##How do you install it?
* Go into any project that already has a package.json and type the following: `npm install colorconverter-z2m`

##Example of usage:
`const convert = require('colorconverter-z2m');
// Must be a string
const input = 'f4d5f3';
// get the result of our conversion
const output = convert(input);
// log result to the console
console.log(output);`

## Enjoy!