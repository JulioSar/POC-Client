/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-floating-promises */
import {
  fetchDataUser,
  updateUser,
  addUserData,
  deleteUserService,
} from "@/services/users.ts";
import { type User } from "../types";
import { useEffect, useState } from "react";

// Mapping the data from the API to the correct format
async function useUsers() {
  const users = await fetchDataUser(); // Add await once the API is ready

  const mappedUsers = users.data.map((user: User) => ({
    id: user.id,
    name: user.name,
    mail: user.mail,
    status: user.status,
    profile_picture: user.profile_picture,
  }));

  return { usersMapped: mappedUsers };
}

// Hook to get the users
export function useGetUsers() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { usersMapped } = await useUsers();
      setUsers(usersMapped);
    };
    fetchUsers();
  }, []);

  return { users };
}

export function useUpdateUser() {
  let updateResponseStatus: number = 0;
  const postUser = async (user: User) => {
    try {
      const response = await updateUser(user);
      updateResponseStatus = response.status;
    } catch (error) {
      console.log(error);
    }
  };

  return { postUser, updateResponseStatus };
}

export function useAddUser() {
  let addUserResponse: number = 0;
  const addUser = async (user: User) => {
    try {
      const responseAdd = await addUserData(user);
      addUserResponse = responseAdd.data.status;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return { addUser, addUserResponse };
}

export function useDeleteUser() {
  let deleteUserResponse: number = 0;

  const deleteUser = async (id: string) => {
    try {
      const response = await deleteUserService(id);
      deleteUserResponse = response.data.status;
      console.log(deleteUserResponse);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return { deleteUser, deleteUserResponse };
}
