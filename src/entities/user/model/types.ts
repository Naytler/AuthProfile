export interface User {
  id: number | string;
  username: string;
  email: string;
  phone?: string;
}

export interface UpdateUserRequest {
  id: string;
  username?: string;
  country?: string;
  city?: string;
  birthday?: string;
  address?: string;
  avatarUrl?: string;
  avatarImage?: string;
}
