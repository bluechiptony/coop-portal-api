export interface AuthenticationProfile {}
import { User } from "../users/users.model";

export enum AccountTypes {
  ADMINISTRATOR,
  SUPPORT,
  SUPERVISOR,
  STAFF,
  AGENT,
  BENEFICIARY,
  DEPENDENT,
}

export interface AuthenticatedUser {
  user: User;
  token: string;
}

export interface LoginRequest {
  emailAddress: string;
  password: string;
}

export interface PasswordChangeRequest {
  token: string;
  password: string;
}

export interface UserToken {
  token: string;
}

export interface AuthenticationProfile {
  authenticationId?: number;
  userCode: string;
  emailAddress: string;
  active: boolean;
  accountType: string;
  password?: string;
  verificationCode?: string;
  verificationCodeExpiry: number;
}
