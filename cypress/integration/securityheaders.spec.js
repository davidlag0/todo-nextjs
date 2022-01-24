describe("Navigation", () => {
  it("should navigate to the main page and receive all proper security headers", () => {
    // Start from the index page
    cy.request("http://localhost:3000/").as("mainPage");

    cy.get("@mainPage").should((response) => {
      expect(response.headers, "response headers").to.include({
        "x-frame-options": "SAMEORIGIN",
      });
    });
  });
});
