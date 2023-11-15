import { logout } from "../src/js/api/auth/logout";
import { localStorageMock } from "./localStorageMock";

describe("logout function", () => {
  beforeEach(() => {
    global.localStorage = localStorageMock;
  });

  it("clears token and profile from localStorage", () => {
    localStorageMock.setItem("token", "fakeToken");
    localStorageMock.setItem(
      "profile",
      JSON.stringify({ username: "testUser", email: "test@noroff.no" }),
    );
    expect(localStorageMock.getItem("token")).toBeDefined();
    logout();
    expect(localStorageMock.getItem("token")).toBeUndefined();
    expect(localStorageMock.getItem("profile")).toBeUndefined();
  });
});
