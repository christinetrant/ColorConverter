
// ---------- HEX TO RGB ---------- //
const hexToRgb = ((arr, color) => {
	let tempStr = color.toLowerCase();
	// have an empty array to temporarily store items
	let tempArr = [];
	// split input into an array:
	arr = tempStr.split('');
	// ["#", "f", "f", "0", "0", "0", "0"]
	// Check if includes #
	if(arr.includes('#')) {
		// if true get index of # so we can remove it:
		const hashIndex = arr.indexOf('#');
		// Need to change in case it is not at zero
		arr.splice(hashIndex, 1);
	}
	// array now equals
	// ["f", "f", "0", "0", "0", "0"]
	arr = arr.map(item => parseInt(item, 16));
	// turn hex values in rgb values:
	for(let i = 0; i<arr.length+1; i++) {	
		let tempNum;
		// take first 2 numbers in arr - mulitply first number by 16 power of 1, multiply second number by 16 power of 0.  Add results to get one number between 0 and 255
		tempNum = (arr[0] * (16**1)) + (arr[1] * (16**0));
		// Push above result into temp array
		tempArr.push(tempNum);
		// Remove the 2 numbers we used from the main array
		arr.splice(0,2);
	}
	// After looping through full array we have [255, 0, 0]
	// Add that number to end of main array
	arr = arr.concat(tempArr);
	// Empty temp Array
	tempArr = [];
	// Print out result
	// console.log(`Hex value ${color} into rgb values are: rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`)
	return result = `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`
})

// ---------- RGB TO HEX ---------- //
const rgbToHex = ((arr, color) => {
	let tempStr = color.toLowerCase();
	if(tempStr.includes('rgb(')) {
		tempStr = tempStr.replace('rgb(', '');
		if(tempStr.includes(')')) {
			tempStr = tempStr.replace(')', '')
		}
	} else if(tempStr.includes('(')) {
		tempStr = tempStr.replace('(', '');
		if(tempStr.includes(')')) {
			tempStr = tempStr.replace(')', '')
		}
	}
	arr = tempStr.split(',');
	// ["255", " 0", " 0"]
	arr = arr.map((item) => {
		return parseInt(item);
	})
	// [255, 0, 0]
	// work out what hex value should be - first char is division, second is remainder
	arr = (arr.map(item => {
		let hexOne = parseInt(item / 16);
		let hexTwo = parseInt(item % 16);
		return ([hexOne, hexTwo])
	})).flat();
	// Need to convert to Hex
	arr = arr.map(item => item.toString(16));
	// Add # and reduce array into a single string
	arr.unshift('#')
	arr = arr.join('');
	// Print out result!
	// console.log(`rgb value ${color} into hex values are: ${arr}`);
	return result = arr;
})



// ---------- Initial Function ---------- //
const init = (color) => {
	let array = [];

	// Need to figure out if hex or rgb:
	if(color.includes('#') || color.length === 6 ) {
		// console.log('Input is HEX');
		hexToRgb(array, color);
		return result;
	} else if(color.includes(',') || color.includes('rgb')) {
		// console.log('Input is RGB');
		rgbToHex(array, color);
		return result;
	} else {
		// console.log('No recognised HEX or RGB value detected')
		return 'No recognised HEX or RGB value detected';
	}
}
// init(input);
// init(input2);
// init('dde456') // 221, 228, 86
// init('#dde456')
// init('rgb(243, 45, 67)') // #F32D43
// NPM PACKAGE - need to do module.exports
module.exports = (input) => {
	return init(input);

}
