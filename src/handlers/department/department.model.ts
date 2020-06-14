export interface Department {
  id?: any;
  departmentName: string;
  departmentCode?: string;
}

export interface DepartmentUnit {
  id?: any;
  departmentCode: string;
  zonallCommandCode: string;
  departmentName: string;
  zonalCommandName: string;
}
