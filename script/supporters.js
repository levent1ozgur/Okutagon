// Okutagon by Levent Özgür is licensed under CC BY-NC-SA 4.0 

  // URL of your Cloudflare Worker
    const workerUrl = process.env.CF_WORKER_URL;

    // Fetch the supporter data from the Cloudflare Worker
    fetch(workerUrl)
      .then(response => response.text())
      .then(data => {
        const supporterList = document.getElementById('supporter-list');
        const status = document.getElementById('status');

        if (data.includes('There are currently 0 supporters')) {
          status.textContent = 'There are currently 0 supporters on Patreon.';
        } else {
          status.textContent = 'Thank you for the supporters:';
          // Add each supporter to the list
          const supporters = data.match(/<li>(.*?)<\/li>/g);
          if (supporters) {
            supporters.forEach(supporter => {
              const listItem = document.createElement('li');
              listItem.className = 'supporter';
              listItem.innerHTML = supporter.replace(/<li>|<\/li>/g, '');
              supporterList.appendChild(listItem);
            });
          }
        }
      })
      .catch(err => {
        console.error('Error fetching supporters:', err);
        const status = document.getElementById('status');
        status.textContent = 'There was an error loading the supporters list.';
      });
