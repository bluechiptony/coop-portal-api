import { adaptExpressRequest, getDateStringFromTime, isValidEmail, isValidPhoneNumber, generateToken } from "./helpers";

describe("Helpers module  tests", () => {
  it("Should return true", () => {
    expect(true).toBeTruthy();
  });

  it("Adaptrequest must return correct adapted request object", () => {
    let model = {
      method: "",
      body: "",
      path: "",
      user: "",
      params: {},
      query: {},
    };
    expect(adaptExpressRequest(model)).toHaveProperty("pathParams");
    expect(adaptExpressRequest(model)).toHaveProperty("body");
    expect(adaptExpressRequest(model)).toHaveProperty("user");
    expect(adaptExpressRequest(model)).toHaveProperty("path");
    expect(adaptExpressRequest(model)).toHaveProperty("method");
    expect(adaptExpressRequest(model)).toHaveProperty("queryParams");
  });
});

describe("Get date string from time fuction", () => {
  it("should return string", () => {
    let date = 12335647384934;
    expect(typeof getDateStringFromTime(date)).toBe("string");
  });
});
describe("validation boolean functions", () => {
  it("validate phone should return boolean", () => {
    let number = "12335647384934";
    expect(typeof isValidPhoneNumber(number)).toBe("boolean");
  });
  it("validate email should return boolean", () => {
    let email = "tony5egwu@gmail.com";
    expect(typeof isValidEmail(email)).toBe("boolean");
  });
});

describe("Generate functions", () => {
  it("Generate token should return string of provided length", () => {
    let length = 17;
    expect(typeof generateToken(length)).toBe("string");
    expect(generateToken(length).length).toBe(length);
  });
});
