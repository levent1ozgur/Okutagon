export async function handler(event) {
  try {
    // Forward only necessary headers (optional: filter headers if needed)
    const headers = { ...event.headers };
    delete headers['host']; // Remove Netlify's host header

    // Construct the fetch request WITHOUT the body for GET/HEAD requests
    const fetchOptions = {
      method: event.httpMethod,
      headers: headers,
    };

    // Only include a body for non-GET/HEAD requests
    if (event.httpMethod !== 'GET' && event.httpMethod !== 'HEAD') {
      fetchOptions.body = event.body;
    }

    // Fetch data from your Cloudflare Worker
    const response = await fetch(process.env.CF_WORKER_URL, fetchOptions);
    const data = await response.text();

    // Return the response to the client
    return {
      statusCode: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'text/plain',
      },
      body: data,
    };
  } catch (err) {
    console.error('Proxy error:', err);
    return {
      statusCode: 500,
      body: 'Internal Server Error',
    };
  }
}
