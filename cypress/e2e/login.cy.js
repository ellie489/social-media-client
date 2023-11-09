describe("Social Media App: Existing User", () => {
  beforeEach(() => {
    cy.visit("https://ellie489.github.io/social-media-client/");
    cy.clearLocalStorage();

    // Click on the login button within the register form
    cy.wait(1000);
    cy.get("#registerModal").contains("Login").click();

    // Wait for the login form to appear
    cy.get("#loginForm").should("be.visible");

    // Type email and password
    cy.get("#loginForm #loginEmail").should("exist").click();
    cy.wait(1000);
    cy.get("#loginForm #loginEmail")
      .should("exist")
      .type("testingelisabeth@noroff.no");

    cy.get("#loginForm #loginPassword")
      .should("exist")
      .type("Testing123{enter}");
  });
  it("Can login and check token exist in localstorage", () => {
    cy.get("button[type=submit]").contains("Login").click();
    cy.wait(1000);

    cy.window().then((win) => {
      const token = win.localStorage.getItem("token");
      cy.log("Token from local storage:", token);

      cy.request({
        method: "GET",
        url: "https://ellie489.github.io/social-media-client/?view=profile&name=Testingelisabeth",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        cy.log("API Response:", response);
      });
    });
  });
});
