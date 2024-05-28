describe("Data Fetching Test", () => {
  it("Loads initial data and then more data", () => {
    cy.visit("http://127.0.0.1:5173/");

    cy.contains("button", "Fetch Data").should("be.visible").click();

    cy.get("div").find("p").should("have.length", 10);

    cy.contains("button", "More").should("be.visible").click();

    cy.get("div").find("p").should("have.length", 20);
  });
});
