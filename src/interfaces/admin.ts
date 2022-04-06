export interface SaveAdminRequest {
  public_address: string;
}

export interface GetAdminRequest {
  public_address?: string;
}

export interface UpdateAdminRequest {
  public_address: string;
  username: string;
}

export interface UpdateDbAdminRequest {
  username?: string;
  nonce?: number;
}

export interface Admin {
  public_address: string;
  username: string;
  nonce: number;
}
