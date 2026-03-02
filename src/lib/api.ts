const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function api(endpoint: string, options?: RequestInit) {
  const url = `${BASE_URL}${endpoint}`;
  const res = await fetch(url, options);
  return res;
}
