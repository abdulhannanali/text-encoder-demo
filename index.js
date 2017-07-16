// Scalable and fast way to Encode and Decode Text
// using `TextEncoder` and `TextDecoder` interface

checkSupport();
encodeUI();
decodeUI();

function encodeUI() {
  const encoderDemo = document.querySelector('.encoder');
  const encoderTextArea = document.querySelector('.encoder textarea');
  const encoderEncoding = document.querySelector('.encoder .encoding');
  const encodeButton = document.querySelector('#encode-btn');
  const encoderOutput = document.querySelector('.encoder .encoder-output .output-container');


  encodeButton.addEventListener('click', function (clickEvent) {
    const rawString = encoderTextArea.value;
    const encoding = encoderEncoding.value;
    console.log(encoding);

    try {
      const timeStart = Date.now();
      const encodedOutput = encode(encoding, rawString);
      const timeEnd = Date.now() - timeStart + 'ms';
      const joinedArray = '[ ' + encodedOutput.join(', ') + ' ]';
      displayOutput(encoderOutput, joinedArray, timeEnd);
    } catch (error) {
      displayOutput(encoderOutput, error.message);
    }
  });
}

function decodeUI() {
  const demo = document.querySelector('.decoder');
  const textArea = demo.querySelector('textarea');
  const encodingInput = demo.querySelector('.encoding');
  const button = demo.querySelector('button');
  const output = demo.querySelector('.output-container');

  button.addEventListener('click', function (event) {
    try {
      const bytesToDecode = parseUintArray(textArea.value);
      const encoding  = encodingInput.value;
      const timeStart = Date.now();
      const decoder = new TextDecoder(encoding);
      const decodedString = decoder.decode(bytesToDecode);
      const timeTaken = Date.now() - timeStart;
      displayOutput(output, decodedString, timeTaken);
    } catch (error) {
      displayOutput(output, error.message);
    }
  });
}

function parseUintArray(uintString) {
  const numbersArray = uintString
    .split(',')
    .map((stringVal) => parseInt(stringVal.match(/\d*/ig).join('')));

  return new Uint8Array(numbersArray);
}

function displayOutput(outputElement, outputMessage, timeTaken) {
  let outputHTML = '';
  
  if (timeTaken !== undefined) {
    outputHTML += `Time Taken: ${timeTaken}<br/>`;
  }
  outputHTML += outputMessage;

  outputElement.innerHTML = outputHTML;
}

function encode(encoding, stringToEncode) {
  if (!encoding || !(encoding.trim())) {
    return new TypeError('Encoding should be provided');
  }

  try {
    const encoder = new TextEncoder(encoding);
    return encoder.encode(stringToEncode);
  } catch (error) {
    console.error('Error occured while encoding');
    throw error;
  }
}

function decode(encoding, bytesToDecode) {
  if (!encoding || !(encoding.trim())) {
    return new TypeError('Encoding should be provided');
  }

  try {
    const decoder = new TextDecoder(encoding);
    return decoder.decode(bytesToDecode);
  } catch (error) {
    console.error('Error occured while decoding');
    throw error;
  }
}

/**
 * Checks if the required APIs are supported in the given environment
 */
function isSupported() {
  return 'TextDecoder' in window && 'TextEncoder' in window;
}

function checkSupport() {
  if (!isSupported()) {
    const demo = document.querySelector('.demo');
    const notSupported = document.querySelector('.not-supported');
    demo.style.display = 'none';
    notSupported.style.display = 'block';
  }
}