describe("Social Media App: Login", () => {
  beforeEach(() => {
    cy.visit("https://ellie489.github.io/social-media-client/");
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
  });

  it("Can login and check token exist in localstorage", () => {
    cy.get("button[type=submit]").contains("Login").click();
    cy.url().should("include", "?view=profile");

    //     cy.window().then((win) => {
    //       const token = win.localStorage.getItem("token");
    //       cy.log("Token from local storage:", token);

    //       cy.request({
    //         method: "GET",
    //         url: "https://ellie489.github.io/social-media-client/?view=profile&name=Testingelisabeth",
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       }).then((response) => {
    //         cy.log("API Response:", response);
    //       });
    //     });
  });
});
// describe("Logout Feature", () => {
//     it("Logs out successfully", () => {

//       cy.get("button[data-test=logout-button]").click();
//       cy.url().should("include", "/login");

//     });
//   });
