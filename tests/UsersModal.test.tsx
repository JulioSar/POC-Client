/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UsersModal } from "../src/components/UsersAdmin/UsersModal";
import { UsersAdmin } from "../src/components/UsersAdmin/UsersAdmin";
import UserMother from "./backoffice/users/__mothers__/user.mother";
import axios from "axios";
import { updateUser } from "@/services/users";

describe("Rendering UserModel", () => {
  // beforeEach(() => {
  //   axios.patch.mockReset();
  // });
  // afterEach(() => {
  //   server.resetHandlers();
  // });
  // afterAll(() => {
  //   server.close();
  // });

  const ResizeObserverMock = vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  vi.stubGlobal("ResizeObserver", ResizeObserverMock);

  test("should render modal", () => {
    //  given
    const newUser = UserMother.random();
    // when
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
    // then
    expect(inputEmail.value).toBe(newUser.mail);
  });

  test("should render user info", () => {
    // given
    const userClicked = UserMother.random();

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
    expect(inputEmail.value).toBe(userClicked.mail);
  });

  test("should render modal's charts tab", async () => {
    // given
    const userClicked = UserMother.random();
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
    const userClicked = UserMother.random();
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
    // then
    expect(screen.getByText(/This is audit/i)).toBeDefined();
  });

  test("submit update user with success notification", async () => {
    // given
    const userClicked = UserMother.random();
    axios.patch = vi.fn().mockResolvedValue({
      data: userClicked,
      status: 200,
    });

    // when
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

    userClicked.mail = "test@mail.com";

    const updatedUser = await updateUser(userClicked);

    // then
    await waitFor(() => {
      expect(axios.patch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_URL}/user/${userClicked.id}`,
        {
          name: userClicked.name,
          mail: userClicked.mail,
        }
      );
      expect(updatedUser.data).toStrictEqual(userClicked);
    });
  });
});
