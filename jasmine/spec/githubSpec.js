describe("GitHub Search", function() {
  const dummyMethod = new GitHub().dummyMethod();

  it("dummyMethod should return 1", function() {
    expect(dummyMethod).toEqual(1);
  });
});

// I have to pass on this one. I did not figure out how to unit test
// a method that does not return any value...
