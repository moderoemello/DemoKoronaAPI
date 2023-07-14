// Get the input element for loyalty card number
const loyaltyCardNumberInput = document.getElementById('loyaltyCardNumber');

// Function to handle key press on the keypad
function handleKeyPress(key) {
  // Get the current value of the loyalty card number
  let currentValue = loyaltyCardNumberInput.value;

  // Handle different key presses
  switch (key) {
    case 'clear':
      // Clear the loyalty card number
      loyaltyCardNumberInput.value = '';
      break;
    case 'backspace':
      // Remove the last character from the loyalty card number
      loyaltyCardNumberInput.value = currentValue.slice(0, -1);
      break;
    default:
      // Append the key value to the loyalty card number
      loyaltyCardNumberInput.value = currentValue + key;
  }
}

// Add event listener to the keypad buttons
const keypadButtons = document.querySelectorAll('.keypad-button');
keypadButtons.forEach(button => {
  button.addEventListener('click', function() {
    const key = this.getAttribute('data-key');
    handleKeyPress(key);
  });
});
