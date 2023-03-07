// Wait for page to load
document.addEventListener("DOMContentLoaded", function () {

    // Button functions
    function calculateResult() {
        const result = eval(displayInput.textContent.replace(/\s+/g, ''));
        displayInput.textContent = displayInput.textContent + " = " + result;
        displayOutput.textContent = result;
        outputValue = result;
    }

    function clearCalculator() {
        outputValue = 0.0;
        inputValue = 0.0;
        displayInput.textContent = "";
        displayOutput.textContent = 0;
    }

    function handleNumber(buttonValue) {
        // first Cut out '=' if it exist
        if (displayInput.textContent.includes("=")) {
            displayInput.textContent = "";
            outputValue = 0;
        }
        // 1 - 9
        if (parseInt(buttonValue) > 0) {
            if (displayOutput.textContent.includes(".")) {
                const decimalPlaces = displayOutput.textContent.split(".")[1]?.length || 0;
                outputValue = outputValue + parseInt(buttonValue) / Math.pow(10, decimalPlaces + 1);
            }
            else {
                outputValue = outputValue * 10 + parseInt(buttonValue);
            }
            displayInput.textContent = displayInput.textContent + buttonValue;
            displayOutput.textContent = outputValue;
        }
        // 0
        if (parseInt(buttonValue) === 0) {
            const decimalPlaces = displayOutput.textContent.split(".")[1]?.length || 0;
            if (outputValue == 0 && decimalPlaces == 0) {
                return;
            }
            else if (displayOutput.textContent.includes(".")) {
                outputValue = outputValue + parseInt(buttonValue) / Math.pow(10, decimalPlaces + 1);

                displayInput.textContent = displayInput.textContent + "0";
                if (decimalPlaces == 0) {
                    displayOutput.textContent = displayOutput.textContent + "0";
                }
                else {
                    displayOutput.textContent = displayOutput.textContent + "0";
                }
            }
            else {
                outputValue = parseFloat(outputValue) * 10 + parseFloat(buttonValue);

                displayInput.textContent = displayInput.textContent + buttonValue;
                displayOutput.textContent = outputValue;
            }
        }
    }

    function handleDecimal() {
        // Cut out '=' if it exist
        if (displayInput.textContent.includes("=")) {
            displayInput.textContent = "";
            displayOutput.textContent = 0;
            outputValue = 0;
        }

        if (displayOutput.textContent.includes(".") && displayInput.textContent != "") {
            return;
        }

        displayInput.textContent = displayInput.textContent + ".";
        displayOutput.textContent = String(outputValue) + ".";
    }

    // Starting value
    let outputValue = 0.0;
    const displayInput = document.getElementById("display-input");
    const displayOutput = document.getElementById("display");
    const buttons = document.getElementById("buttons");

    // Listen to buttons
    buttons.addEventListener("click",
        function (event) {
            const button = event.target;
            const buttonValue = button.textContent;
            const buttonId = button.id;

            // Equals
            if (buttonId === "equals") {
                if (displayInput.textContent.includes("=")) { // Do nothing if just clicked '='
                    return;
                }
                calculateResult();
            }

            // AC
            else if (buttonId === "clear") {
                clearCalculator();
            }

            // Numbers
            else if (buttonValue >= 0) {
                handleNumber(buttonValue);
            }

            // Decimal
            else if (buttonId === "decimal") {
                handleDecimal();
            }

            // Math
            else if ((buttonId === "divide") || (buttonId === "multiply") || (buttonId === "subtract") || (buttonId === "add")) {
                // Get rid of '='
                if (displayInput.textContent.includes("=")) {
                    let str = displayInput.textContent;
                    let arr = str.split('=');
                    displayInput.textContent = arr[1].trim();
                }
                let lastChar = displayInput.textContent.slice(-1);
                // Divide
                if ((buttonId === "divide") && (displayOutput.textContent != "/")) {
                    if (!isNaN(parseInt(lastChar))) {
                        displayInput.textContent += "/";
                    }
                    else {
                        displayInput.textContent = displayInput.textContent.slice(0, -1) + "/";
                    }
                    displayOutput.textContent = "/";
                    outputValue = 0;
                }
                // multiply
                else if ((buttonId === "multiply") & (displayOutput.textContent != "*")) {
                    if (!isNaN(parseInt(lastChar))) {
                        displayInput.textContent = displayInput.textContent + "*";
                    }
                    else {
                        displayInput.textContent = displayInput.textContent.slice(0, -1) + "*";
                    }
                    displayOutput.textContent = "*";
                    outputValue = 0;
                }
                // Add
                else if ((buttonId === "add") & (displayOutput.textContent != "+")) {
                    if (!isNaN(parseInt(lastChar))) {
                        displayInput.textContent = displayInput.textContent + "+";
                    }
                    else if (lastChar === "-") {
                        displayInput.textContent = displayInput.textContent.slice(0, -1);

                        lastChar = displayInput.textContent.slice(-1);
                        if (lastChar === "*" || lastChar === "/") {
                            displayInput.textContent = displayInput.textContent.slice(0, -1) + "+";
                        }
                    }
                    else {
                        displayInput.textContent = displayInput.textContent.slice(0, -1) + "+";
                    }
                    displayOutput.textContent = "+";
                    outputValue = 0;
                }
                // Subtract
                else if ((buttonId === "subtract") & (displayOutput.textContent != "-")) {
                    if (!isNaN(parseInt(lastChar))) {
                        displayInput.textContent = displayInput.textContent + "-";
                    }
                    else if (lastChar === "/" || lastChar === "*" || lastChar === "+") {
                        displayInput.textContent = displayInput.textContent + "-";
                    }
                    else {
                        console.log("saw nothing");
                        displayInput.textContent = displayInput.textContent.slice(0, -1) + "-";
                    }
                    displayOutput.textContent = "-";
                    outputValue = 0;
                }
            }

            else {
                console.log("Something went wrong");
            }
        }
    );
});