import { validateIfArray, validateEmailAddress, validatePhoneNumber, validateRequiredNumericProperty, validateRequiredStringProperty } from "./validation";

describe("Validation module  tests", () => {
  it("Should return true", () => {
    expect(true).toBeTruthy();
  });
});

describe("Validate array function", () => {
  let array = ["1", "2", "3"];
  let nonArray = 1234;
  let label = "field label";
  let nullValue: any = null || undefined;

  it("should throw error if value is not an array", () => {
    expect(() => {
      validateIfArray(label, nonArray);
    }).toThrow(new Error("field label must be provided"));
  });

  it("should throw error if undefined", () => {
    expect(() => {
      validateIfArray(label, nullValue);
    }).toThrow();
  });
});

describe("validate numeric property", () => {
  let Stringnumber = "0828327382328";
  let number = 2137634734;
  let alphabet = "JackJon";
  let label = "field label";
  let nullValue: any = null || undefined;

  it("it should throw error where there is invalid data", () => {
    expect(() => {
      validateRequiredNumericProperty(label, alphabet);
    }).toThrow(new Error("field label is of an invalid data type"));
  });

  it("should throw error un undefined", () => {
    expect(() => {
      validateRequiredNumericProperty(label, nullValue);
    }).toThrow(new Error("field label must be provided"));
  });
});

describe("validate string property", () => {
  let number = 2137634734;
  let label = "field label";

  it("it should throw error where there is invalid data", () => {
    expect(() => {
      validateRequiredStringProperty(label, number);
    }).toThrow(new Error("field label is of an invalid data type"));
  });

  it("should throw error on undefined", () => {
    expect(() => {
      validateRequiredStringProperty(label, null);
    }).toThrow(new Error("field label must be provided"));
  });
});

describe("Validate email address", () => {
  it("Should throw error if email is invalid", () => {
    expect(() => {
      validateEmailAddress("anthonyegwu");
    }).toThrow("Invalid email address");
  });
});
