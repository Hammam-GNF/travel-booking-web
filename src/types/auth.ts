export interface AuthTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
}
