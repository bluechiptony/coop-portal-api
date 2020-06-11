import { Staff } from "../staff/staff.model";

export interface Memo {
  id?: any;
  memoCode: string;
  memoTitle: string;
  memoCategory: string;
  memoOrigin: string;
  memoDescription: string;
  resolved: boolean;
  createdDate: Date;
  updatedDate: Date;
  memoPriority?: string;
  memoType?: string;
}

export enum ItemPriority {
  VERY_HIGH = "VERY HIGH",
  HIGH = "HIGH",
  NORMAL = "NORMAL",
  LOW = "LOW",
  VERY_LOW = "VERY LOW",
}

export interface MemoReply {
  id?: any;
  staff?: Staff;
  reply: string;
  createdDate: Date;
}
