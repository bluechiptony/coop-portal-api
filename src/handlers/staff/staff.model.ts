export interface Staff {
  id?: any;
  userCode?: string;
  staffCode?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  dob: Date;
  nationality: string;
  stateOfOrigin: number;
  lgaOfOrigin: number;
  phoneNumber?: string;
  emailAddress: string;
}

export interface StaffEmploymentDetails {
  userCode?: string;
  staffCode?: string;
  staffNumber?: string;
  zonalCommand: string;
  department: string;
  designation: string;
  gradeLevel: string;
  step: string;
  unit?: string;
  employedDate: Date;
  serviceRetirementDate?: Date;
  statutoryRetirementDate?: Date;
}

export interface StaffContact {
  userCode?: any;
  staffCode: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
}
