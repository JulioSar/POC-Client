import axios from "axios";
import { updateUser } from "@/services/users";
import { UsersAdmin } from "../../src/components/UsersAdmin/UsersAdmin";
import { render, waitFor } from "@testing-library/react";
import { UsersModal } from "../../src/components/UsersAdmin/UsersModal";
import UserMother from "../backoffice/users/__mothers__/user.mother";
import { ResizeObserverMock } from "../backoffice/resizeObserver";

describe("Users table GET", () => {
  const resize = ResizeObserverMock;
  console.log(resize);
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
