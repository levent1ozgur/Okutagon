		// function to copy crypto addresses to clipboard
		function copyToClipboard(text) {
			var dummy = document.createElement("textarea");
			document.body.appendChild(dummy);
			dummy.value = text;
			dummy.select();
			document.execCommand("copy");
			document.body.removeChild(dummy);
			// show message to inform user that address was copied
			var message = "The address has been copied to your clipboard: " + text;
			alert(message);
		}
		// function to generated script code
document.addEventListener("DOMContentLoaded", function() {
  const generateButton = document.querySelector(".custom-btn.win");

  generateButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form submission

    // Get all the selected checkboxes
    const selectedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    // If no checkboxes are selected, display a message and return
    if (selectedCheckboxes.length === 0) {
      alert('Please select at least one checkbox.');
      return;
    }

    // Create an array to store the names of the selected apps
    const selectedApps = [];

    // Loop through the selected checkboxes and push their values to the array
    selectedCheckboxes.forEach(function(checkbox) {
      selectedApps.push(checkbox.value);
    });

    // Construct the string with the selected apps
    const selectedAppsString = selectedApps.join(' ');

    // Construct the final command string
    const commandString = `Set-ExecutionPolicy Bypass -Scope Process -Force;
      [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072;
      iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'));
      choco install ${selectedAppsString} -y;`;

    // Copy the command string to the clipboard
    navigator.clipboard.writeText(commandString)
      .then(() => {
        // Show a success message
        alert('The command has been copied to the clipboard.');
      })
      .catch(() => {
        // Show an error message
        alert('Failed to copy the command to the clipboard.');
      });
  });
});







