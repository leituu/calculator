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
        if (this.currentOperand.length == 12) return
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

    pow() {
        this.currentOperand = this.currentOperand * this.currentOperand;
        this.lastOperation = '=';
    }

    sqrt() {
        this.currentOperand = Math.round(Math.sqrt(this.currentOperand)*100000)/100000;
        this.lastOperation = '=';
    }

    inverse() {
        this.currentOperand = (Math.round(1/this.currentOperand*100000)/100000);
        this.lastOperation = '=';
    }

    minus() {
        this.currentOperand = (-1) * this.currentOperand;
        this.lastOperation = '='
    }

    percentage() {
        this.currentOperand = (Math.round(this.currentOperand*100)/10000);
        this.lastOperation = '='
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
            integerDisplay = `${integerDisplay}.${decimalDigits}`;
        }
        return integerDisplay;
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
const powButton = document.querySelector('[data-pow]');
const sqrtButton = document.querySelector('[data-sqrt]')
const invButton = document.querySelector('[data-inverse]')
const minButton = document.querySelector('[data-minus]')
const percButton = document.querySelector('[data-perc]')


const calculator = new Calculator(previousOperationTextElem,currentOperationTextElem);


// Listener for number buttons including dot
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});

// Listener for operation buttons
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay()
    })
})

// Listener for equal
equalButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})


// Listener for delete, clear & all clear
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

// Listener for power
powButton.addEventListener('click', () => {
    calculator.pow();
    calculator.updateDisplay();
})

sqrtButton.addEventListener('click', () => {
    calculator.sqrt();
    calculator.updateDisplay();
})

invButton.addEventListener('click', () => {
    calculator.inverse();
    calculator.updateDisplay();
})

minButton.addEventListener('click', () => {
    calculator.minus();
    calculator.updateDisplay();
})

percButton.addEventListener('click', ()=> {
    calculator.percentage();
    calculator.updateDisplay();
})