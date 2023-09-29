const form = document.querySelector(".form");
const billInput = document.querySelector(".bill-input");
const peopleInput = document.querySelector(".people-input");
const errorText = document.querySelector(".error-text");

const tip = document.querySelector(".tip");
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
  billVal = parseFloat(billInput.value);
  
  if (isNaN(billVal)) {
    billVal = 0;
  }
  
  calculate();    
});

// Get tip value
tip.addEventListener("input", () => {
  const val = form["tip-percent"].value;
  
  if (val != "Custom") {
    tipVal = parseFloat(val);
    
    // Disable custom input
    customLabel.classList.remove("hidden");
    customInput.classList.add("hidden");
  } else {
    
    // Enable custom input
    tipVal = parseFloat(customInput.value);
    
    if (isNaN(tipVal)) {
      tipVal = 0;
    }

    customLabel.classList.add("hidden");
    customInput.classList.remove("hidden");
    customInput.focus();
  }
  
  calculate();
});

// Get people value
peopleInput.addEventListener("input", () => {
  peopleVal = Math.floor(parseFloat(peopleInput.value));
  
  if ((isNaN(peopleVal)) || (peopleVal < 1)) {   
    // Show error
    peopleInput.classList.add("error-input");
    errorText.classList.remove("hidden");
    errorText.innerHTML = "Can't be zero";
  } else {
    // Remove error
    peopleInput.classList.remove("error-input");
    errorText.classList.add("hidden");    
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
    peopleInput.classList.remove("error-input");
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