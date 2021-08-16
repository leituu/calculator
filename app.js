// Calculator class

class Calculator {
    constructor(previousOperationTextElem, currentOperationTextElem) {
        this.previousOperationTextElem = previousOperationTextElem;
        this.currentOperationTextElem = currentOperationTextElem;
        this.clear()
        this.lastOperation = '';
    }

    allClear() {
        // Clear the screen
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }

    clear() {
        this.currentOperand = '';
    }

    delete() {
        // Delete last number inserted
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }

    appendNumber(number) {
        // Append number to currentOperationTextElem everytime a number is pressed
        if (number === '.' && this.currentOperand.includes('.')) return
        if (this.currentOperand.length == 14) return
        if (this.lastOperation === '=') {
            this.currentOperand = '';
            this.lastOperation = '';
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        // Which operation will be executed
        // Operation won't do anything if there's no number in display
        
        if (this.currentOperand === '') return
        
        // If previous operand isn't empty clicking a new operation will compute
        // result of previous operation

        if (this.previousOperand !== '') {
            this.compute();
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        // Compute operation depending which operand has been selected
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        // if there's no current operand or previous operand method won't work
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '/':
                computation = prev / current;
                break;
            case '*':
                computation = prev * current;
                break;
            default:
                return;    
        }
        this.lastOperation = '=';
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        // Adding format to numbers
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            
        }
        return number
    }

    updateDisplay() {
        // Everytime a number is pressed or an operand is selected, display must
        // be updated
        this.currentOperationTextElem.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperationTextElem.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperationTextElem.innerText = '';
        }
        
    }
}

// Defining buttons

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const delButton = document.querySelector('[data-del]');
const clearButton = document.querySelector('[data-clear]');
const allClearButton = document.querySelector('[data-all-clear]');
const equalButton = document.querySelector('[data-equal]');
const previousOperationTextElem = document.querySelector('[data-previous-operand]');
const currentOperationTextElem = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperationTextElem,currentOperationTextElem);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay()
    })
})

equalButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click',() => {
    calculator.allClear();
    calculator.updateDisplay();
})

delButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})

clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})