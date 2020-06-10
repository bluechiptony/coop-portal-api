import { AccountTypes } from "../authentication/authentication.model";

export interface User {
  userId?: number;
  userCode: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber?: string;
  accountType: AccountTypes;
  createdDate?: Date;
  updatedDate?: Date;
  createdBy?: number;
  updatedBy?: number;
}

export interface UserAccount {
  userCode: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber?: string;
  accountType: AccountTypes;
  createdDate?: Date;
  updatedDate?: Date;
  createdBy?: number;
  updatedBy?: number;
  active?: boolean;
  enabled?: boolean;
}

export class User {}
