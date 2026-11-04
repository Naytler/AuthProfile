// Access token храним только в памяти.
// Refresh token должен храниться сервером в httpOnly cookie.
let accessToken: string | null = null;

export function getAccessToken() {
  return accessToken;
}

export function setAccessToken(token: string | null) {
  accessToken = token;
}
