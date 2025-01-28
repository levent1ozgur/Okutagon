// Okutagon by Levent Özgür is licensed under CC BY-NC-SA 4.0 

console.log("Ü");
document.addEventListener("DOMContentLoaded", function () {
  const selectedAppsContainer = document.getElementById(
    "selected-apps-container"
  );

  // Function to generate script code for Windows
  const generateWindowsScript = () => {
    // Get all the selected checkboxes
    const selectedCheckboxes = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );

    // If no checkboxes are selected, clear the textarea and return
    if (selectedCheckboxes.length === 0) {
      selectedAppsContainer.innerHTML = ""; // Clear the textarea
      return;
    }

    // Create an array to store the names of the selected apps
    const selectedApps = [];

    // Loop through the selected checkboxes and push their values to the array
    selectedCheckboxes.forEach(function (checkbox) {
      selectedApps.push(checkbox.value);
    });

    // Construct the string with the selected apps
    const selectedAppsString = selectedApps.join(" ");

    // Construct the final command string
    const commandString = `Set-ExecutionPolicy Bypass -Scope Process -Force;
      [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072;
      iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'));
      choco install ${selectedAppsString} -y;`;

    // Create a textarea element
    const textarea = document.createElement("textarea");
    textarea.rows = 10;
    textarea.cols = 50;
    textarea.value = commandString;
    // Adjust the size of textarea based on its content
    textarea.style.width = "100%";
    textarea.style.height = "auto";
    // Set textarea to be readonly
    textarea.setAttribute("readonly", true);
    // Disable textarea resizing
    textarea.style.resize = "none";

    // Clear the container and append the textarea
    selectedAppsContainer.innerHTML = "";
    selectedAppsContainer.appendChild(textarea);
  };

  // Add event listeners to checkboxes
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", generateWindowsScript);
  });
});
   
