import { createStaff, updateStaff } from "./staff-data-access";

jest.mock("./staff-data-access");
import { Staff } from "./staff.model";

describe("Staff module  tests", () => {
  it("Should return true", () => {
    expect(true).toBeTruthy();
  });
});

describe("Staff data access functions", () => {
  let staff: Staff = {
    userCode: "324734",
    staffCode: "3247984ewe",
    firstName: "Jamie",
    middleName: "Surbur",
    lastName: "Blanka",
    dob: new Date(),
    nationality: "Nigerian",
    stateOfOrigin: 23,
    lgaOfOrigin: 244,
    emailAddress: "jamie@blanka.com",
  };

  it("should save staff", async () => {
    const gen = createStaff(staff);
    const df = await gen;
    expect(df).toEqual(staff.staffCode);
    expect(createStaff).toHaveBeenCalledWith(staff);
    expect(createStaff).toHaveBeenCalledTimes(1);
  });

  it("Should update staff", async () => {
    const gen = updateStaff(staff);
    const df = await gen;
    expect(df).toEqual(staff.staffCode);
    expect(createStaff).toHaveBeenCalledWith(staff);
    expect(createStaff).toHaveBeenCalledTimes(1);
  });
});

describe("Create staff use cases tests", () => {
  it("Create staff should create staff", async () => {});
});
