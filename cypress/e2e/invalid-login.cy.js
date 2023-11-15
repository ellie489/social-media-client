describe("Social Media App: Invalid Login Attempts", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.clearLocalStorage();
    cy.wait(1000);

    cy.get("#registerModal").contains("Login").click();
    cy.get("#loginForm").should("be.visible");
  });

  it("Cannot login with invalid email and shows error message", () => {
    cy.wait(1000);
    cy.get("#loginForm #loginEmail").type("invalid-email@something.com");
    cy.get("#loginForm #loginPassword").type("ValidPassword{enter}");

    cy.get(".alert").should("be.visible");
  });

  it("Cannot login with invalid password and shows error message", () => {
    cy.wait(1000);
    cy.get("#loginForm #loginEmail").type("testingelisabeth@noroff.no");
    cy.get("#loginForm #loginPassword").type("invalid-password{enter}");

    cy.get(".alert").should("be.visible");
  });
});
