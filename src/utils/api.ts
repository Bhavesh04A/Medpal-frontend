const API_BASE_URL = import.meta.env.VITE_API_URL;

export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}
