import { Staff } from "../staff.model";

let __staff: Staff = {
  userCode: "324734",
  staffCode: "324734",
  firstName: "Jamie",
  middleName: "Surbur",
  lastName: "Blanka",
  dob: new Date(),
  nationality: "Nigerian",
  stateOfOrigin: 23,
  lgaOfOrigin: 244,
  emailAddress: "jamie@blanka.com",
};

export const createStaff = jest.fn((__staff) => __staff.staffCode);

export const updateStaff = jest.fn((__staff) => {
  console.log("updating in mock");

  return __staff.staffCode;
});
