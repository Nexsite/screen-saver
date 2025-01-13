// Get the theme selector dropdown
const themeSelector = document.getElementById('theme-selector');

// Function to change the theme
function changeTheme(theme) {
  // Add or remove the 'dark' class to the body based on the selected theme
  if (theme === 'dark') {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
}

// Set the default theme when the page loads
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light'; // Get saved theme from localStorage
  themeSelector.value = savedTheme; // Set dropdown to saved theme
  changeTheme(savedTheme); // Apply saved theme
});

// Event listener for when the theme is changed
themeSelector.addEventListener('change', (e) => {
  const selectedTheme = e.target.value;
  localStorage.setItem('theme', selectedTheme); // Save the selected theme to localStorage
  changeTheme(selectedTheme); // Apply the new theme
});



function updateClock() {
    const clockElement = document.getElementById('clock');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);
updateClock(); // Initial call to display clock immediately



let deferredPrompt;

  // Listen for the beforeinstallprompt event
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault(); // Prevent the default prompt
deferredPrompt = e; // Save the event to trigger it later
    showInstallButton(); // Show custom install button
  });
  
  // Show the install button
  function showInstallButton() {
    const installButton = document.getElementById('installButton');
    installButton.style.display = 'block'; // Make the button visible
  }
  
  // Handle the custom install button click
  document.getElementById('installButton').addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Show the install prompt
      const { outcome } = await deferredPrompt.userChoice; // Wait for user choice
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      deferredPrompt = null; // Reset deferredPrompt
    }
  });
  
  // Handle the appinstalled event
  window.addEventListener('appinstalled', (e) => {
    console.log('PWA was installed');
    document.getElementById('installButton').style.display = 'none'; // Hide install button after installation
  });