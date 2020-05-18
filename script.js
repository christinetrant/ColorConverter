const body = document.querySelector('body');
const input = document.getElementById('input');
const button = document.getElementById('button');
const output = document.getElementsByClassName('output')[0];
const h3PrintTitle = document.getElementById('color-output');
const hiddenDiv = document.getElementById('hidden-div');

// ---------- HEX TO RGB ---------- //
const hexToRgb = ((arr, color) => {
	let tempStr = color;
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
	// if input is a 3 letter hex
	if(arr.length===3) {
		arr = arr.map(item => item.concat(item));
		arr = arr.map(item => item.split('')).flat();
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
	// Check to make sure there are no NaNs (above 255)
	let check = arr.some(item => Number.isNaN(item))
	if(check === true) {
		return inputError();
	} else {
		// Print out result
		output.textContent = `Hex value ${color} into rgb values are: rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;
		//Display output - make h3 color output and hidden div block display
		displayOutput();
		h3PrintTitle.textContent = `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;
		// add event listener so value can be copied
		h3PrintTitle.addEventListener('click', copyText);
		h3PrintTitle.addEventListener('mouseout', outFunc);
		input.blur();
		return rgb = `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`	
	}
})

// ---------- RGB TO HEX ---------- //
const rgbToHex = ((arr, color) => {

	let tempStr = color;
	// if user enters 233,0,3, we need to remove end ,
	if(tempStr.endsWith(",")) {
		return inputError();
	}
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
	// Check to make sure there are no values above 255
	let check = arr.some(item => item > 255)
	if(check === true) {
		return inputError();
	} else {
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
		//Display output - make h3 color output and hidden div block display
		displayOutput();
		output.textContent = `rgb value ${color} into hex values are: ${arr}`;
		h3PrintTitle.textContent = arr;
		input.blur();
		h3PrintTitle.addEventListener('click', copyText);
		h3PrintTitle.addEventListener('mouseout', outFunc);
		return hex = arr;
	}
})


// ---------- INITIAL FUNCTION---------- //
const init = (color) => {
	let array = [];
	// Need to figure out if hex or rgb:
	if(color.includes('#') || color.length === 6 || color.length === 3) {
		// console.log('Input is HEX');
		hexToRgb(array, color);
		// return rgb;
	} else if(color.includes(',') || color.includes('rgb')) {
		// console.log('Input is RGB');
		rgbToHex(array, color);
		// return hex;
	} else {
		inputError();
	}
}
// ---------- RUN INIT AFTER BUTTON CLICKED ---------- //
const convertAfterClick = () => {
	let inputValue = document.getElementById('input').value;
	if(inputValue.length > 0) {
		init(inputValue);
	}
}
// ---------- RUN INIT AFTER ENTER PRESSED ---------- //
const convertAfterEnter = (event) => {
	let inputValue = document.getElementById('input').value;
	if(inputValue.length > 0 && event.which === 13) {
		init(inputValue);
	}
}
// ---------- INPUT ERROR - INCORRECT ENTERED VALUES ---------- //
const inputError = () => {
	//Display output - make h3 color output and hidden div block display
	displayOutput()
	h3PrintTitle.textContent = 'No recognised HEX or RGB value detected';
	// after showing no value reset to initial view
	setTimeout(clearInput, 5000);
}
// ---------- DISPLAY RESULT ---------- //
const displayOutput = () => {
	h3PrintTitle.style.display = "block";
	hiddenDiv.style.display = "block";
}
// ---------- INPUT TEXT BACK TO ORIGINAL ---------- //
const clearInput = () => {
	input.value = 'Enter a color';
	input.select();
	h3PrintTitle.style.display = "none";
	hiddenDiv.style.display = "none"
}
// ---------- FOCUS INPUT ---------- //
const inputFocus = () => {
	input.value = 'Enter a color';
	input.select();
	h3PrintTitle.textContent = '';
}
// ---------- COPY TEXT TO CLIPBOARD ---------- //
const copyText = () => {
	// set h3 value result to equal hidden div so that it can be selected
	// Workaround as copy is mainly for input fields
	var hiddenField = document.getElementById("copyText");
	hiddenField.value = h3PrintTitle.textContent;
	hiddenField.select();
	document.execCommand("copy");
	// tooltip to let user know value has been copied
	const tooltip = document.getElementById("myTooltip");
	tooltip.textContent = "Copied: " + hiddenField.value;
};
// ----- AFTER COPY IS CLICKED ----- //
const outFunc = () => {
  const tooltip = document.getElementById("myTooltip");
  tooltip.textContent = "Copy";
}
// ---------- EVENT LISTENERS ---------- //
input.addEventListener('focus', inputFocus);
input.addEventListener("keypress", convertAfterEnter);
button.addEventListener("click", convertAfterClick);
