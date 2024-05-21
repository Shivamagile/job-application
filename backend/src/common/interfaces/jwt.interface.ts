export interface JwtPayload {
  id: number;
  email: string;
  role?: string;
  type?: string;
}
