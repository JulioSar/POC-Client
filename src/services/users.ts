// import users from "@/MOCK_DATA.json";
import { type User } from "@/types";
import axios from "axios";
// export const fetchDataUser = async (): Promise<User[]> => {
//   try {
//     const response = await fetch(
//       "https://ncaa-neil-th-occurs.trycloudflare.com/user",
//       { mode: "cors" }
//     );
//     const data = await response.json();
//     console.log(data.data);
//     return data.data;
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };

export async function fetchDataUser() {
  try {
    const response = await axios.get("http://localhost:3000/user");
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function addUserData(user: User) {
  const responseAdd = await axios.put(`http://localhost:3000/user/${user.id}`, {
    name: user.name,
    mail: user.mail,
    status: user.status,
  });
  return responseAdd;
}

export async function updateUser(user: User) {
  const response = await axios.patch(`http://localhost:3000/user/${user.id}`, {
    name: user.name,
    mail: user.mail,
  });
  return response;
}

// export const fetchDataUser = () => {
//   return users as User[];
// };

export async function deleteUserService(id: string) {
  console.log(id);
  const response = await axios.delete(`http://localhost:3000/user/${id}`);
  console.log(response);
  return response;
}
