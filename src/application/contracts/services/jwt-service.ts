export type JWTPayload = {
  userId: string;
};

export interface IJWTGeneratorConfig {
  secret?: string;
  expiresIn?: number;
}

export interface IJWTService {
  sign(payload: JWTPayload, config?: IJWTGeneratorConfig): string;
  decode(token: string): JWTPayload;
}
