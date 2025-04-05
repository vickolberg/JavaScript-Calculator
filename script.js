        const integerButtons = document.querySelectorAll(".integer");
        const operationButtons = document.querySelectorAll(".operation");
        const resultSpan = document.querySelector("#result");

        let currentInput = "";
        let currentResult = 0;
        let currentOperation = null;

        integerButtons.forEach(button => {
            button.addEventListener("click", handleNumberClick);
        });

        operationButtons.forEach(button => {
            button.addEventListener("click", handleOperationClick);
        });

        function handleNumberClick(event) {
            if (event.target.value === "." && currentInput.includes(".")) {
                return; 
            }
            currentInput += event.target.value; 
            resultSpan.textContent = currentInput; 
        }


        function handleOperationClick(event) {
            const value = event.target.value;

            if (value === "clear") {
                clear();
                return;
            }

            if (value === "negative") {
                toggleNegative();
                return;
            }

            if (value === "equals") {
                calculate();
                return;
            }

            if (currentOperation !== null) {
                calculate();  
            }

            currentOperation = value; 
            currentResult = parseFloat(currentInput); 
            currentInput = "";  
            resultSpan.textContent = currentResult;  
        }


        function toggleNegative() {
            if (currentInput) {
                currentInput = currentInput.charAt(0) === "-" ? currentInput.slice(1) : "-" + currentInput;
                resultSpan.textContent = currentInput;
            } else if (currentResult) {
                currentResult = currentResult * -1;
                resultSpan.textContent = currentResult;
            }
        }

      
        function calculate() {
            let finalResult;

            switch (currentOperation) {
                case "addition":
                    finalResult = currentResult + parseFloat(currentInput);
                    break;
                case "subtraction":
                    finalResult = currentResult - parseFloat(currentInput);
                    break;
                case "multiplication":
                    finalResult = currentResult * parseFloat(currentInput);
                    break;
                case "division":
                    if (parseFloat(currentInput) === 0) {
                        finalResult = "Error"; 
                    } else {
                        finalResult = currentResult / parseFloat(currentInput);
                    }
                    break;
                default:
                    finalResult = currentInput;  
            }

            resultSpan.textContent = finalResult;  
            currentResult = finalResult;  
            currentInput = "";  
            currentOperation = null;  
        }


        function clear() {
            currentInput = "";
            currentResult = 0;
            currentOperation = null;
            resultSpan.textContent = "0";  
        }
