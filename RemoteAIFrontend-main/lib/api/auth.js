import { authFetch, setToken, clearToken } from "./authClient";

export async function register({ email, password, name }) {
  const data = await authFetch("/auth/register", { method: "POST", body: { email, password, name } });
  setToken(data.token);
  return data.user;
}

export async function login({ email, password }) {
  const data = await authFetch("/auth/login", { method: "POST", body: { email, password } });
  setToken(data.token);
  return data.user;
}

export async function logout() {
  try {
    await authFetch("/auth/logout", { method: "POST" });
  } finally {
    // Token is cleared client-side regardless of whether the server call
    // succeeds — if the network request fails, the user still expects
    // to be logged out locally.
    clearToken();
  }
}

export async function getMe() {
  const data = await authFetch("/auth/me");
  return data.user;
}

export async function updateProfile({ name }) {
  const data = await authFetch("/auth/me", { method: "PUT", body: { name } });
  return data.user;
}

export async function changePassword({ currentPassword, newPassword }) {
  await authFetch("/auth/change-password", { method: "PUT", body: { currentPassword, newPassword } });
}
