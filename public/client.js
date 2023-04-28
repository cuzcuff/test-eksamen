// Get the current style preference from local storage
const currentStyle = localStorage.getItem('stylePreference');

// Set the default style preference to light mode
let stylePreference = 'style_light.css';

// If the user previously selected dark mode, update the style preference
if (currentStyle === 'style_dark.css') {
  stylePreference = 'style_dark.css';
}

// Set the stylesheet to the user's style preference
const styleSheet = document.getElementById('stylesheet');
styleSheet.setAttribute('href', stylePreference);

// Add an event listener to the toggle button to switch styles
const toggleButton = document.getElementById('mode-toggle');
toggleButton.addEventListener('click', () => {
  // Toggle the style preference between light and dark mode
  if (stylePreference === 'style_light.css') {
    stylePreference = 'style_dark.css';
  } else {
    stylePreference = 'style_light.css';
  }

  // Update the style preference in local storage
  localStorage.setItem('stylePreference', stylePreference);

  // Set the stylesheet to the user's updated style preference
  styleSheet.setAttribute('href', stylePreference);
});
