describe("template spec", () => {
  it("passes", () => {
    cy.visit("/");

    // API test
    cy.request("GET", "http://localhost:3000/?page=1&limit=10").then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body.success).to.eq(true);
        expect(response.body.data).to.have.length(10);
      }
    );

    // Frontend Test
    cy.get("[data-testid='fetch-data-button']").click();
    cy.get("[data-testid='data-list']").should("exist").as("dataList");

    Array.from({ length: 10 }).forEach((_, index) => {
      cy.get("[data-testid='more-data-button']").click();
      cy.get("@dataList")
        .children()
        .should("have.length", 10 * (index + 1));
    });
  });
});
