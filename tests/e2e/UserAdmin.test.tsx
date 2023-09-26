import { UsersAdmin } from "../../src/components/UsersAdmin/UsersAdmin";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ResizeObserverMock } from "../backoffice/resizeObserver";

describe("UsersAdmin", () => {
  const resize = ResizeObserverMock;
  console.log(resize);

  const user = userEvent.setup();

  beforeEach(() => {
    render(<UsersAdmin></UsersAdmin>);
  });
  test("should render users module", () => {
    expect(screen.getByText("Users")).toBeDefined();
  });

  test("should render users table", () => {
    expect(screen.getByText("Name")).toBeDefined();
    expect(screen.getByText("Status")).toBeDefined();
  });

  test("should not render modal on load", () => {
    expect(screen.queryByPlaceholderText("Email")).toBeNull();
  });

  test("should render modal on add new user click", async () => {
    const addNewBtn = screen.getByText("Add New User");
    await user.click(addNewBtn);

    expect(screen.getByText("Profile")).toBeDefined();
  });
});
