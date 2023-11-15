describe("Social Media App: Logout", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.clearLocalStorage();
    cy.wait(1000);

    cy.get("#registerModal").contains("Login").click();

    cy.get("#loginForm").should("be.visible");

    cy.get("#loginForm #loginEmail").should("exist").click();
    cy.wait(1000);
    cy.get("#loginForm #loginEmail")
      .should("exist")
      .type("testingelisabeth@noroff.no");

    cy.get("#loginForm #loginPassword")
      .should("exist")
      .type("Testing123{enter}");

    cy.get("button[type=submit]").contains("Login").click();
    cy.url().should("include", "?view=profile");
  });

  it("should clear localStorage after clicking the logout button", () => {
    cy.get('[data-auth="logout"]').should("be.visible").click();
  });
});
