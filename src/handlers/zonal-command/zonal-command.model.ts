export interface ZonalCommand {
  id?: any;
  zonalCommandName: string;
  zonalCommandCode?: string;
  active: boolean;
  state: number;
  lga: number;
}

export interface UnitRequest {
  departmentCode: string;
  zonalCommandCode: string;
}
