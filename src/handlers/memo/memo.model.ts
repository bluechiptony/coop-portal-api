import { Staff } from "../staff/staff.model";

export interface Memo {
  id?: any;
  memoCode: string;
  title: string;
  category: string;
  origin: string;
  resolved: boolean;
  respondee: string;
  createdDate: Date;
  updatedDate: Date;
  priority?: string;
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
  urgency?: ItemPriority;
  replyDate: Date;
}
