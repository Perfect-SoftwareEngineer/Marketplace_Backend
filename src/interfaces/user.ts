export interface SaveUserRequest {
  public_address: string;
}

export interface GetUserRequest {
  public_address?: string;
}

export interface UpdateUserRequest {
  public_address: string;
  username: string;
}

export interface UpdateDbUserRequest {
  username?: string;
  nonce?: number;
}

export interface User {
  public_address: string;
  username: string;
  nonce: number;
}
