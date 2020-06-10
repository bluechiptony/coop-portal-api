export interface Staff {
  id?: any;
  userCode?: string;
  firstName: string;
  middeName?: string;
  lastName: string;
  dob: Date;
  nationality: string;
  stateOforigin: number;
  lgaOfOrigin: number;
  phoneNumber?: string;
  emailAddress: string;
}

export interface StaffDetails {
  userCode?: string;
  staffCode?: string;
  staffNumber?: string;
  zonalCommand: string;
  department: string;
  unit?: string;
}
