document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('btn'));
    let firstOperand = '';
    let secondOperand = '';
    let currentOperation = null;
    let shouldResetDisplay = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.dataset.num) {
                handleNumber(button.dataset.num);
            } else if (button.dataset.op) {
                handleOperator(button.dataset.op);
            } else if (button.id === 'equals') {
                evaluate();
            } else if (button.id === 'clear') {
                clear();
            }
        });
    });

    function handleNumber(number) {
        if (shouldResetDisplay) {
            display.textContent = '';
            shouldResetDisplay = false;
        }
        display.textContent = display.textContent === '0' ? number : display.textContent + number;
    }

    function handleOperator(operator) {
        if (currentOperation !== null) evaluate();
        firstOperand = display.textContent;
        currentOperation = operator;
        shouldResetDisplay = true;
    }

    function evaluate() {
        if (currentOperation === null || shouldResetDisplay) return;
        if (currentOperation === '/' && display.textContent === '0') {
            display.textContent = 'Error';
            return;
        }
        secondOperand = display.textContent;
        display.textContent = roundResult(operate(currentOperation, firstOperand, secondOperand));
        currentOperation = null;
    }

    function clear() {
        display.textContent = '0';
        firstOperand = '';
        secondOperand = '';
        currentOperation = null;
        shouldResetDisplay = false;
    }

    function roundResult(number) {
        return Math.round(number * 1000) / 1000;
    }

    function operate(operator, a, b) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                return a / b;
            default:
                return null;
        }
    }
});
