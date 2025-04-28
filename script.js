const display = document.getElementById('display');

function appendValue(val) {
  display.value += val;
}

function clearDisplay() {
  display.value = '';
}

function calculateResult() {
  try {
    display.value = eval(display.value);
  } catch {
    display.value = "Error";
  }
}

// Bonus: Keyboard support
document.addEventListener('keydown', function(event) {
  if (event.key.match(/[0-9+\-*/().]/)) {
    appendValue(event.key);
  } else if (event.key === 'Enter') {
    calculateResult();
  } else if (event.key === 'Backspace') {
    display.value = display.value.slice(0, -1);
  } else if (event.key.toLowerCase() === 'c') {
    clearDisplay();
  }
});
