const display = document.querySelector(".calculator-input");
const keys = document.querySelector(".calculator-keys");

let displayValue = "0";
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

updateDisplay();
function updateDisplay() {
  display.value = displayValue;
}

keys.addEventListener("click", function (e) {
  const element = e.target;

  if (!element.matches("button")) return;

  if (element.classList.contains("operator")) {
    // console.log("operator", element.value);
    handleOperator(element.value);
    updateDisplay();
    return;
  }
  if (element.classList.contains("decimal")) {
    // console.log("decimal", element.value);
    decimalValue();
    updateDisplay();
    return;
  }
  if (element.classList.contains("clear")) {
    // console.log("clear", element.value);
    clear();
    updateDisplay();
    return;
  }

  inputValue(element.value);
  updateDisplay();
});

// number
function inputValue(number) {
  if (waitingForSecondValue) {
    displayValue = number;
    waitingForSecondValue = false;
  } else {
    displayValue = displayValue === "0" ? number : displayValue + number;
  }
}

// decimal
function decimalValue() {
  if (!displayValue.includes(".")) {
    displayValue += ".";
  }
}

// clear
function clear() {
  displayValue = "0";
}

// operator
function handleOperator(nextOperator) {
  let value = parseFloat(displayValue);

  if (operator && waitingForSecondValue) {
    operator = nextOperator;
    return;
  }

  if (firstValue === null) {
    firstValue = value;
  } else if (operator) {
    let result = calculate(firstValue, value, operator);
    displayValue = String(result);
    firstValue = result;
  }

  waitingForSecondValue = true;
  operator = nextOperator;
}

// calculate
function calculate(first, second, operator) {
  if (operator === "+") {
    return first + second;
  } else if (operator === "-") {
    return first - second;
  } else if (operator === "*") {
    return first * second;
  } else if (operator === "/") {
    return first / second;
  }

  return second;
}
