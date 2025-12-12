export const API_URL = "https://vortex-desafio-incrivel-api.onrender.com";

export async function handleResponse(response: Response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Something went wrong");
  }
  return response.json();
}
