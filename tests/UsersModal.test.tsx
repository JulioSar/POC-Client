/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { setupServer } from "msw/node";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UsersModal } from "../src/components/UsersAdmin/UsersModal";
import { type User } from "../src/types";
import { UsersAdmin } from "../src/components/UsersAdmin/UsersAdmin";
import { rest } from "msw";
import { v4 } from "uuid";

describe("Rendering UserModel", () => {
  const server = setupServer();

  beforeAll(() => {
    server.listen();
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });

  const ResizeObserverMock = vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  vi.stubGlobal("ResizeObserver", ResizeObserverMock);

  test("should render modal", () => {
    // GIVEN
    const newUser: User = {
      name: "",
      mail: "",
      status: false,
      id: "123-456-789",
      profile_picture: "",
    };
    // WHEN
    render(
      <UsersModal
        user={newUser}
        showModal={() => {}}
        refresh={false}
        setRefresh={() => {}}
      ></UsersModal>
    );
    const inputEmail = screen.getByPlaceholderText(
      /email/i
    ) as HTMLInputElement;
    // THEN
    expect(inputEmail.value).toBe("");
  });

  test("should render user info", () => {
    // given
    const userClicked: User = {
      name: "Jhon Doe",
      mail: "jhon.doe@mail.com",
      status: true,
      id: "123-456-789",
      profile_picture: "",
    };

    // when
    render(
      <UsersModal
        user={userClicked}
        showModal={() => {}}
        refresh={false}
        setRefresh={() => {}}
      ></UsersModal>
    );
    const inputEmail = screen.getByPlaceholderText(
      /email/i
    ) as HTMLInputElement;
    // then
    expect(inputEmail.value).toBe("jhon.doe@mail.com");
  });

  test("should render modal's charts tab", async () => {
    // given
    const userClicked: User = {
      name: "Jhon Doe",
      mail: "jhon.doe@mail.com",
      status: true,
      id: "123-456-789",
      profile_picture: "",
    };
    // when
    render(
      <UsersModal
        user={userClicked}
        showModal={() => {}}
        refresh={false}
        setRefresh={() => {}}
      ></UsersModal>
    );
    const chartBtn = screen.getByText(/chart/i);
    await userEvent.click(chartBtn);
    // then
    expect(screen.getByText(/Chart goes here/i)).toBeDefined();
  });

  test("should render modal's audits tab", async () => {
    // given
    const userClicked: User = {
      name: "Jhon Doe",
      mail: "jhon.doe@mail.com",
      status: true,
      id: "123-456-789",
      profile_picture: "",
    };
    // when
    render(
      <UsersModal
        user={userClicked}
        showModal={() => {}}
        refresh={false}
        setRefresh={() => {}}
      ></UsersModal>
    );
    const chartBtn = screen.getByText(/Audit/i);
    await userEvent.click(chartBtn);
    // THEN
    expect(screen.getByText(/This is audit/i)).toBeDefined();
  });

  test("submit user with success notification", async () => {
    // GIVEN
    const userId = v4();
    server.use(
      rest.patch(
        `${import.meta.env.VITE_API_URL}/user/${userId}`,
        async (req, res, ctx) => {
          console.log("SErver handler called");
          return await res(ctx.status(200));
        }
      )
    );
    console.log(userId);
    const userClicked: User = {
      name: "",
      mail: "",
      status: false,
      id: userId,
      profile_picture: "",
    };
    // WHEN
    render(
      <>
        <UsersAdmin />
        <UsersModal
          user={userClicked}
          showModal={() => {}}
          refresh={false}
          setRefresh={() => {}}
        ></UsersModal>
      </>
    );
    const inputEmail = screen.getByPlaceholderText("Email") as HTMLInputElement;
    const inputName = screen.getByPlaceholderText("Name") as HTMLInputElement;

    const submitBtn = screen.getByText(/submit/i);
    await userEvent.clear(inputEmail);
    await userEvent.clear(inputName);
    await userEvent.type(inputName, "Jhon Doe");
    await userEvent.type(inputEmail, "test@mail.com");
    await userEvent.click(submitBtn);
    // THEN
    await waitFor(() => {
      expect(inputEmail.value).toBe("test@mail.com");
      expect(screen.getByText(/Data added/i)).toBeDefined();
    });
  });
});
