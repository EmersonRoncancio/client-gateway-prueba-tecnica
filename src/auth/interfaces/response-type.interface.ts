export interface ResponseType {
  user: User;
  token: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
}
