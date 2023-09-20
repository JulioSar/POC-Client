/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { setupServer } from "msw/node";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UsersModal } from "../UsersModal";
import { type User } from "@/types";
import { UsersAdmin } from "../UsersAdmin";
import { rest } from "msw";
import { v4 } from "uuid";

const userId = v4();

const server = setupServer(
  rest.put(`http://localhost:3000/user/${userId}`, async (req, res, ctx) => {
    console.log("SErver handler called");
    return await res(
      ctx.status(201), // Set the response status to 201
      ctx.json({ message: "Data added correctly" }) // Set the response body
    );
  })
);

beforeAll(() => {
  console.log("Server is listening...");
  server.listen();
});
afterEach(() => {
  console.log("reseting");
  server.resetHandlers();
});
afterAll(() => {
  console.log("Closing");
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
  const inputEmail = screen.getByPlaceholderText(/email/i) as HTMLInputElement;
  // THEN
  expect(inputEmail.value).toBe("");
});

test("should render user info", () => {
  // GIVEN
  const userClicked: User = {
    name: "Jhon Doe",
    mail: "jhon.doe@mail.com",
    status: true,
    id: "123-456-789",
    profile_picture: "",
  };
  // WHEN
  render(
    <UsersModal
      user={userClicked}
      showModal={() => {}}
      refresh={false}
      setRefresh={() => {}}
    ></UsersModal>
  );
  const inputEmail = screen.getByPlaceholderText(/email/i) as HTMLInputElement;
  // THEN
  expect(inputEmail.value).toBe("jhon.doe@mail.com");
});

test("should render modal's charts tab", async () => {
  // GIVEN
  const userClicked: User = {
    name: "Jhon Doe",
    mail: "jhon.doe@mail.com",
    status: true,
    id: "123-456-789",
    profile_picture: "",
  };
  // WHEN
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
  // THEN
  expect(screen.getByText(/Chart goes here/i)).toBeDefined();
});

test("should render modal's audits tab", async () => {
  // GIVEN
  const userClicked: User = {
    name: "Jhon Doe",
    mail: "jhon.doe@mail.com",
    status: true,
    id: "123-456-789",
    profile_picture: "",
  };
  // WHEN
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

  const userClicked: User = {
    name: "Jhon Doe",
    mail: "jhon.doe@mail.com",
    status: true,
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
  const submitBtn = screen.getByText(/submit/i);
  await userEvent.clear(inputEmail);
  await userEvent.type(inputEmail, "test@mail.com");
  console.log("before");
  const response = await userEvent.click(submitBtn);
  console.log("after");
  // THEN
  await waitFor(() => {
    expect(inputEmail.value).toBe("test@mail.com");
    expect(screen.getByText(/Data added correctly/i)).toBeDefined();
  });
});

test("submit user with failure notification", async () => {
  // GIVEN

  const userClicked: User = {
    name: "Jhon Doe",
    mail: "jhon.doe@mail.com",
    status: true,
    id: userId,
    profile_picture: "",
  };

  server.use(
    rest.put(`http://localhost:3000/user/${userId}`, async (req, res, ctx) => {
      console.log("------------------------------");
      console.log("Server handler called");
      console.log(userId);
      console.log(req.bodyUsed);
      console.log(res);
      console.log("-------------------------------");
      return await res(ctx.status(500));
    })
  );
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
  const submitBtn = screen.getByText(/submit/i);
  await userEvent.clear(inputEmail);
  await userEvent.type(inputEmail, "test@mail.com");
  await userEvent.click(submitBtn);
  // THEN
  await waitFor(() => {
    expect(inputEmail.value).toBe("test@mail.com");
    expect(screen.getByText(/Unable to add user data/i)).toBeDefined();
  });
});
