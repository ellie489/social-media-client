import { login } from "../src/js/api/auth/login";
import { localStorageMock } from "./localStorageMock";
const email = "test@noroff.no";
const password = "myPassword";
const token = "My Access Token";

afterEach(() => {
  global.localStorage = undefined;
  global.fetch = undefined;
});

describe("login success", () => {
  beforeEach(() => {
    const mockSuccess = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({
        email: email,
        accessToken: token,
      }),
    });
    global.localStorage = localStorageMock;
    global.fetch = mockSuccess;
  });

  it("returns user data when successfully logged in", async () => {
    const data = await login(email, password);
    expect(data).toHaveProperty("email", email);
  });

  it("stores accessToken in localStorage when successfully logged in", async () => {
    const data = await login(email, password);
    expect(localStorage.getItem("accessToken")).toEqual(
      JSON.stringify(data.accessToken),
    );
  });
});

describe("invalid login", () => {
  beforeEach(() => {
    const mockFetchFailure = jest.fn().mockResolvedValue({
      ok: false,
      statusText: "Unauthorized",
    });
    global.localStorage = localStorageMock;
    global.fetch = mockFetchFailure;
  });

  it("throws an error when login is unsuccessful", async () => {
    await expect(login("test@invalid.com", "somePassword")).rejects.toThrow(
      "Unauthorized",
    );
  });
});
