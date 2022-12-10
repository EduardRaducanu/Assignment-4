class Calculator {
    constructor(previousOpText, currentOpText){
        this.previousOpText = previousOpText;
        this.currentOpText = currentOpText;
        this.clear();
    }

    clear(){
        this.previousOp = "";
        this.currentOp = "";
        this.operation = undefined;
    };

    delete(){
        this.currentOp = this.currentOp.toString().slice(0, -1)
    };

    appendNumber(number){
        if (number === "." && this.currentOp.includes(".")) return;
        this.currentOp = this.currentOp.toString() + number.toString()
    };

    operationChoose(operation){
        if (this.currentOp === "") return;
        if (this.currentOp !== "") {
            this.operate();
        }
        this.operation = operation;
        this.previousOp = this.currentOp;
        this.currentOp = "";
    };

    operate(){
        let compute 
        const previous = parseFloat(this.previousOp)
        const current = parseFloat(this.currentOp)
        if(isNaN(previous) || isNaN(current)) return
        switch (this.operation) {
            case "+":
                compute = previous + current;
                break;
            case "-":
                compute = previous - current;
                break;
            case "*":
                compute = previous * current;
                break;
            case "÷":
                compute = previous / current;
                break;
            default:
                return;
        }
        this.currentOp = compute;
        this.operation = undefined;
        this.previousOp = "";
    };

    getDisplayNumber(number){
        const stringNo = number.toString();
        const integerDigits = parseFloat(stringNo.split(".")[0])
        const decimalDigits = stringNo.split(".")[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = "";
        } else {
            integerDisplay = integerDigits.toLocaleString("en", {maximumFractionDigits: 0})
        }
        if (decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay;
        }
    }

    updateDisplay(){
        this.currentOpText.innerText = this.getDisplayNumber(this.currentOp);
        if (this.operation != null) {
            this.previousOpText.innerText = `${this.getDisplayNumber(this.previousOp)} ${this.operation}`
        } else {
            this.previousOpText.innerText = "";
        }
    };
};

const numberButtons = document.querySelectorAll("[data-number]")
const operationButtons = document.querySelectorAll("[data-operation]")
const acButton = document.querySelector("[data-ac]")
const deleteButton = document.querySelector("[data-del]")
const equalsButton = document.querySelector("[data-equals]")
const previousOpText = document.querySelector("[data-prev-op]")
const currentOpText = document.querySelector("[data-curr-op]")

const calculator = new Calculator(previousOpText, currentOpText)

numberButtons.forEach(button => {
    button.addEventListener("click", function(){
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay();
    })
})
    
operationButtons.forEach(button => {
    button.addEventListener("click", function(){
        calculator.operationChoose(button.innerText)
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener("click", () => {
    calculator.operate();
    calculator.updateDisplay();
})

acButton.addEventListener("click", function() {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener("click", function() {
    calculator.delete();
    calculator.updateDisplay();
})