export async function handler(event) {
  const response = await fetch(process.env.CF_WORKER_URL, {
    method: event.httpMethod,
    headers: event.headers,
    body: event.body,
  });
  const data = await response.text();
  return {
    statusCode: 200,
    body: data,
  };
}
