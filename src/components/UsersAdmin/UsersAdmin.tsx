/* eslint-disable @typescript-eslint/no-misused-promises */
import { useGetUsers, useDeleteUser } from "../../hooks/useUsers";
import { TableAdmin } from "../Table/TableAdmin";
import { columns } from "../Table/ColumnsTable";
import { UsersModal } from "./UsersModal";
import { useState } from "react";
import { type User } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/components/ui/use-toast";

export function UsersAdmin() {
  const { users, refresh, setRefresh } = useGetUsers();
  const [modalVisible, setModalVisible] = useState(false);
  const [userClicked, setUserClicked] = useState<User>();
  const { toast } = useToast();

  const showModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleEditClick = (id: string) => {
    const userClickedHandler = users.find((user) => user.id === id);
    setModalVisible(!modalVisible);
    setUserClicked(userClickedHandler);
  };

  const handleNewUserClick = () => {
    const newUser: User = {
      name: "",
      mail: "",
      status: false,
      id: uuidv4(),
      profile_picture: "",
    };
    setModalVisible(!modalVisible);
    setUserClicked(newUser);
  };

  const handleDeleteClick = async (id: string) => {
    const { deleteUser } = useDeleteUser();

    const deleteUserResponse = await deleteUser(id);
    if (deleteUserResponse === 204) {
      setRefresh(!refresh);
      toast({
        title: "User deleted successfully",
        description: "The user data has been deleted from data base correctly.",
      });
    }
  };

  return (
    <div
      className={`${
        modalVisible && "bg-sky-500/[.06]"
      } flex flex-col items-center justify-center w-full h-full`}
    >
      <section className="grid grid-cols-6 gap-4 w-full pr-10">
        <button
          onClick={handleNewUserClick}
          className="p-2 button-add col-start-7 col-span-2 text-white dark:shadow-none"
        >
          Add New User
        </button>
      </section>

      <TableAdmin
        columns={columns({ handleEditClick, handleDeleteClick })}
        data={users}
      />

      {modalVisible && userClicked && (
        <UsersModal
          user={userClicked}
          showModal={showModal}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      )}
    </div>
  );
}
