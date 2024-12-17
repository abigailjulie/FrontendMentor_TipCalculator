document.addEventListener("DOMContentLoaded", () => {
  const billInput = document.getElementById("billInput");
  const customTipInput = document.getElementById("customTipInput");
  const peopleInput = document.getElementById("peopleInput");
  const tipTotal = document.getElementById("tipTotal");
  const finalTotal = document.getElementById("finalTotal");
  const resetBtn = document.getElementById("reset");
  //To grab all of the buttons
  const tipBtns = document.querySelectorAll(".tipBtns button");
  const customBtn = document.getElementById("customBtn");
  //select the wrapper when you want to adjust the visibiity of the input itself
  const customTipInputWrapper = document.querySelector(
    ".customTipInputWrapper"
  );
  //error message
  const errorMsgs = document.querySelectorAll(".errorText");

  function calculate() {
    const billAmount = parseFloat(billInput.value); //turns string to number
    const numOfPeople = parseInt(peopleInput.value, 10); //turns string to number, no decimal, only two deigits
    //Initialize the tip
    let selectedTip = 0;

    //check for invalid entry
    if (billAmount <= 0 || numOfPeople <= 0) {
      if (billAmount <= 0) {
        billInput.style.border = "2px solid red";
        billInput.style.backgroundColor = "#FFCCCB";
        errorMsgs[0].style.display = "block";
      }

      if (numOfPeople <= 0) {
        peopleInput.style.border = "2px solid red";
        peopleInput.style.backgroundColor = "#FFCCCB";
        errorMsgs[1].style.display = "block";
      }
      return;
    }

    // If valid reset borders
    billInput.style.border = "none";
    peopleInput.style.border = "none";
    billInput.style.backgroundColor = "var(--Very-light-grayish-cyan)";
    peopleInput.style.backgroundColor = "var(--Very-light-grayish-cyan)";
    errorMsgs.forEach((error) => {
      error.style.display = "none";
    });

    // Obtain tip
    if (customTipInput.value && customTipInput.value > 0) {
      selectedTip = parseFloat(customTipInput.value);
    } else {
      tipBtns.forEach((button) => {
        if (button.classList.contains("selected")) {
          selectedTip = parseInt(button.textContent, 10);
        }
      });
    }

    // No tip
    if (selectedTip <= 0) return;

    // Calculate the tip and total
    const tipAmount = (billAmount * selectedTip) / 100;
    const totalAmount = billAmount + tipAmount;
    //.toFixed rounds the number to two decimals. Typically for money
    //the result is a string
    const tipPerPerson = (tipAmount / numOfPeople).toFixed(2);
    const totalPerPerson = (totalAmount / numOfPeople).toFixed(2);

    tipTotal.textContent = `$${tipPerPerson}`;
    finalTotal.textContent = `$${totalPerPerson}`;
  }

  //Handle button clicks
  tipBtns.forEach((button) => {
    button.addEventListener("click", () => {
      //buttons all have selected class, remove them from all but one
      tipBtns.forEach((btn) => btn.classList.remove("selected"));
      button.classList.add("selected");
      //get the selected tip by parsing the input
      customTipInput.value = "";
      customTipInputWrapper.style.display = "none";
      //call the calculate function
      calculate();
    });
  });

  //Handle custom button click
  customBtn.addEventListener("click", () => {
    if (
      customTipInputWrapper.style.display === "none" ||
      customTipInputWrapper.style.display === ""
    ) {
      customTipInputWrapper.style.display = "block";
    } else {
      customTipInputWrapper.style.display = "none";
    }
    customTipInput.value = ""; // Clear input when toggling
  });

  //   customBtn.addEventListener("click", () => {
  //     customTipInputWrapper.style.display = "block";
  //     customBtn.style.display = "none";
  //     customTipInput.focus();
  //   });

  //Handle reset click
  resetBtn.addEventListener("click", () => {
    billInput.value = "";
    peopleInput.value = "";
    customTipInput.value = "";
    customTipInputWrapper.style.display = "none";
    customBtn.style.display = "block";
    errorMsgs.forEach((error) => {
      error.style.display = "none";
    });
    tipBtns.forEach((button) => button.classList.remove("selected"));
    //since it's a value you want to display it's good that this is a text, no user interaction
    tipTotal.textContent = "$0.00";
    finalTotal.textContent = "$0.00";
  });

  //Handle input changes
  //At the end because you need to ensure functionality
  //"input" triggers immidiately, rel-time responses, enter not needed
  billInput.addEventListener("input", calculate);
  peopleInput.addEventListener("input", calculate);
  customTipInput.addEventListener("input", calculate);

  //Initial State
  tipTotal.textContent = "$0.00";
  finalTotal.textContent = "$0.00";
});
