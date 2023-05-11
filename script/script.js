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
		// function to pop-up generated script code
const generateBtn = document.querySelector('.custom-btn');

generateBtn.addEventListener('click', () => {
  const apps = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(app => app.value);
  const message = `Set-ExecutionPolicy Bypass -Scope Process -Force;\n[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072;\niex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'));\nchoco install ${apps.join(' ')} -y;`;
  alert(message);
});


