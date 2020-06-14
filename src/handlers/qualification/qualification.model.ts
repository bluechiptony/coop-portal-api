export interface Qualification {
  id?: any;
  qualificationCode: string;
  qualificationName: string;
  type: string;
  fileUrl: string;
  createdDate: Date;
  updatedDate: Date;
  createdBy?: string;
  updatedBy?: string;
}

export interface QualificationName {
  name: string;
  type: string;
}

export enum QualificationType {
  PROFFESIONAL,
  EDUCATIONAL,
}
