// import users from "@/MOCK_DATA.json";
import { type User } from "@/types";
import axios from "axios";

export async function fetchDataUser() {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/user`);
    return response.data;
  } catch (error) {
    return [];
  }
}

export async function addUserData(user: User) {
  const responseAdd = await axios.put(
    `${import.meta.env.VITE_API_URL}/user/${user.id}`,
    {
      name: user.name,
      mail: user.mail,
      status: user.status,
    }
  );
  return responseAdd;
}

export async function updateUser(user: User) {
  const response = await axios.patch(
    `${import.meta.env.VITE_API_URL}/user/${user.id}`,
    {
      name: user.name,
      mail: user.mail,
    }
  );
  return response;
}

// export const fetchDataUser = () => {
//   return users as User[];
// };

export async function deleteUserService(id: string) {
  const response = await axios.delete(
    `${import.meta.env.VITE_API_URL}/user/${id}`
  );
  return response;
}
