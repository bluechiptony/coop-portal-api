describe("Qualification module  tests", () => {
  beforeEach(() => {
    console.log("Before each happeens !!");
  });

  beforeAll(() => {
    console.log("Befoer all");
  });

  it("Should return true", () => {
    expect(true).toBeTruthy();
  });

  it("Should be truthy again", () => {
    expect(4 - 2).toBe(2);
  });

  it.skip("Should be skipped again", () => {
    expect(4 - 2).toBe(478);
  });

  it("Ayn test", (done) => {
    setTimeout(done, 4000);
  });
});
