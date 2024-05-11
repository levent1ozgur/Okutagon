console.log("Script is executing...");
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

    // Create a textarea element
    const textarea = document.createElement('textarea');
    
    // Set the value of textarea to the command string
    textarea.value = commandString;
     // Adjust the size of textarea based on its content
    textarea.style.width = "100%";
    textarea.style.height = "auto";
    // Set textarea to be readonly
    textarea.setAttribute('readonly', true);
    // Disable scrollbar
    // textarea.style.overflow = "hidden";    
    // Disable textarea resizing
    textarea.style.resize = "none";
    // Append textarea to a container, e.g., a div with id "generatedCodeContainer"
    document.getElementById('generatedCodeContainer').innerHTML = '';
    document.getElementById('generatedCodeContainer').appendChild(textarea);

    // Copy the command string to the clipboard
    navigator.clipboard.writeText(commandString)
      .then(() => {
        // Show a success message
        alert('the generated chocolatey-based script code has been copied to the clipboard.');
      })
      .catch(() => {
        // Show an error message
        alert('failed to copy the command to the clipboard.');
      });
  });
});
