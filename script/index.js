console.log("Script is executing...");

document.addEventListener("DOMContentLoaded", function() {
  // Check if JavaScript is enabled
  const jsEnabled = document.getElementById("js-enabled");
  jsEnabled.style.display = "block"; // Show the message

  // Hide the message if JavaScript is enabled
  jsEnabled.style.display = "none";
});
