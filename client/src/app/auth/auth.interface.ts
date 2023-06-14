export interface User {
  email: string;
  password: number;
}

export interface TokenData {
  token: string | null;
  expiresIn: string | null;
}
