import users from "../MOCK_DATA.json";
import axios from "axios";
import { fetchDataUser } from "@/services/users";

describe("render table data", () => {
  test("make a GET request to fetch users", async () => {
    // given
    const usersMock = users.data;
    axios.get = vi.fn().mockResolvedValue({
      data: usersMock,
    });
    // when
    const usersFetch = await fetchDataUser();

    // then
    expect(axios.get).toHaveBeenCalledWith(
      `${import.meta.env.VITE_API_URL}/user`
    );
    expect(usersFetch).toStrictEqual(usersMock);
  });
});
