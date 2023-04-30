import 'whatwg-fetch';

export async function fetchAsync(url: string) {
  const response = await fetch(url);

  return await response.json();
}
