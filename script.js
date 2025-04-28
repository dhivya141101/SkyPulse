// JavaScript for Trendy Calculator (script.js)

// Reference to the display input field
const display = document.getElementById('display'); // my code: gets the display element

// Appends a clicked or typed value to the display
function appendValue(val) {
  // my code: add the new character to the existing display value
  display.value += val;
}

// Clears the entire display
function clearDisplay() {
  // my code: reset display to empty string
  display.value = '';
}

// Evaluates the expression in the display and shows the result
function calculateResult() {
  try {
    // my code: use eval to compute the result of the current expression
    display.value = eval(display.value);
  } catch {
    // my code: if eval fails (invalid expression), show 'Error'
    display.value = "Error";
  }
}

// Keyboard support: listens for key presses and maps them to calculator functions
// my code: adds event listener to the entire document
document.addEventListener('keydown', function(event) {
  // If the key is a number or an operator, append it
  if (event.key.match(/[0-9+\-*/().]/)) {
    appendValue(event.key);
  } 
  // Handle Enter key to calculate result
  else if (event.key === 'Enter') {
    calculateResult();
  } 
  // Handle Backspace to delete last character
  else if (event.key === 'Backspace') {
    display.value = display.value.slice(0, -1);
  } 
  // Handle 'C' or 'c' key to clear display
  else if (event.key.toLowerCase() === 'c') {
    clearDisplay();
  }
});
