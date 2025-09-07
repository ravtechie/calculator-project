// Basic math functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

// Variables to store calculator state
let firstNumber = null;   // The first number entered
let operator = null;      // The operator (+, -, *, /)
let secondNumber = null;  // The second number entered
let displayValue = '0';   // What's currently shown on display
let waitingForNumber = false; // Are we waiting for a new number?

// The operate function
function operate(operator, a, b) {
    // Convert strings to numbers to be safe
    a = Number(a);
    b = Number(b);
    
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
        case '×':
            return multiply(a, b);
        case '/':
        case '÷':
            return divide(a, b);
        default:
            console.log("Unknown operator:", operator);
            return null;
    }
}

// Function to update the display
function updateDisplay() {
    const display = document.getElementById('display');
    display.textContent = displayValue;
    console.log('Display updated to:', displayValue);
}

// Function to input numbers
function inputNumber(number) {
    if (waitingForNumber) {
        displayValue = number;
        waitingForNumber = false;
    } else {
        displayValue = displayValue === '0' ? number : displayValue + number;
    }
    updateDisplay();
}

// STEP 4: Function to clear calculator
function clearCalculator() {
    displayValue = '0';
    firstNumber = null;
    operator = null;
    secondNumber = null;
    waitingForNumber = false;
    updateDisplay();
    console.log('Calculator cleared');
}

// Function to input operators
function inputOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (firstNumber === null) {
        firstNumber = inputValue;
    } 
    else if (operator) {
        const currentValue = firstNumber || 0;
        const newValue = operate(operator, currentValue, inputValue);

        // Handle division by zero
        if (operator === '÷' && inputValue === 0) {
            displayValue = "Nice try! 😏";
            firstNumber = null;
            operator = null;
            waitingForNumber = true;
            updateDisplay();
            return;
        }

        // Round long decimals to prevent display overflow
        displayValue = `${parseFloat(newValue.toFixed(7))}`;
        firstNumber = newValue;
    }

    waitingForNumber = true;
    operator = nextOperator;
    updateDisplay();
}

// Function to calculate result (equals button)
function calculate() {
    const inputValue = parseFloat(displayValue);

    if (firstNumber !== null && operator) {
        const newValue = operate(operator, firstNumber, inputValue);
        
        if (operator === '÷' && inputValue === 0) {
            displayValue = "Nice try! 😏";
            firstNumber = null;
            operator = null;
            waitingForNumber = true;
            updateDisplay();
            return;
        }

        // Round long decimals to prevent display overflow
        displayValue = `${parseFloat(newValue.toFixed(7))}`;
        firstNumber = newValue;
        operator = null;
        waitingForNumber = true;
        updateDisplay();
    }
}

// Add event listeners to all buttons
document.addEventListener('DOMContentLoaded', function() {
    updateDisplay();

    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent;
            console.log('Button clicked:', buttonText);

            if (buttonText >= '0' && buttonText <= '9') {
                inputNumber(buttonText);
            }
            else if (buttonText === 'C') {
                clearCalculator();
            }
            else if (buttonText === '.') {
                if (displayValue.indexOf('.') === -1) { // No decimal point yet
                    displayValue += '.';
                    updateDisplay();
                }
            }
            else if (buttonText === '+' || buttonText === '-' || buttonText === '×' || buttonText === '÷') {
                inputOperator(buttonText);
            }
            else if (buttonText === '=') {
                calculate();
            }
        });
    });
});