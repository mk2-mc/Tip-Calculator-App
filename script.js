const form = document.querySelector(".form");
const billInput = document.querySelector(".bill-input");
const peopleInput = document.querySelector(".people-input");
const errorText = document.querySelector(".error-text");

const tip = document.querySelector(".tip");
const tipButton = document.querySelectorAll(".tip-button");
const customButton = document.querySelector(".tip-custom-button");
const customLabel = document.querySelector(".tip-custom-label");
const customInput = document.querySelector(".tip-custom-input");

const tipOutput = document.querySelector(".tip-output");
const totalOutput = document.querySelector(".total-output");
const resetButton = document.querySelector(".reset-button");

let billVal = 0;
let tipVal = 0;
let peopleVal = 0;

// Get bill value
billInput.addEventListener("input", () => {
  if (billInput.value >= 0) {
    billVal = parseFloat(billInput.value);
    calculate();    
  }
});

// Get tip value
tip.addEventListener("input", () => {
  const val = form["tip-percent"].value;
  
  if (val != "Custom") {
    tipVal = parseFloat(val);

    customLabel.classList.remove("hidden");
    customInput.classList.add("hidden");
  } else {

    if (customInput.value >= 0) {
      tipVal = parseFloat(customInput.value);
    }
    
    customLabel.classList.add("hidden");
    customInput.classList.remove("hidden");
    customInput.focus();
  }
  
  calculate();
});

// Get people value
peopleInput.addEventListener("input", () => {
  if (peopleInput.value >= 1) {
     peopleVal = Math.floor(parseFloat(peopleInput.value));
     
    // Remove error
    peopleInput.classList.remove("input-error");
    errorText.classList.add("hidden");
  } else {
    // Show error
    peopleInput.classList.add("input-error");
    errorText.classList.remove("hidden");
  }
  
  calculate();
});

// Reset
resetButton.addEventListener("click", () => {
  if (resetButton.classList.contains("active")) {
    billVal = 0;
    tipVal = 0;
    peopleVal = 0; 
    
    form.reset();
    tipOutput.innerHTML = "$0.00";
    totalOutput.innerHTML = "$0.00";
    
    customLabel.classList.remove("hidden");
    customInput.classList.add("hidden");  
    peopleInput.classList.remove("input-error");
    errorText.classList.add("hidden");    
    resetButton.classList.remove("active");
  }
});

function calculate() {
  if (peopleVal >= 1) {
    let tip = ((billVal / 100) * tipVal) / peopleVal;
    let total = (billVal + tip) / peopleVal;

    tipOutput.innerHTML = "$" + tip.toFixed(2);
    totalOutput.innerHTML = "$" + total.toFixed(2);
    
    resetButton.classList.add("active");
  }
}