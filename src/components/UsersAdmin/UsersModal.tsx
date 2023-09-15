/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { type User } from "../../types";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAddUser, useUpdateUser } from "../../hooks/useUsers";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface UsersModalProps {
  user: User;
  showModal: () => void;
}

export function UsersModal({ user, showModal }: UsersModalProps) {
  const isNewUser = Boolean(!user.name);
  const { register, handleSubmit } = useForm<User>();
  const [userState, setUserState] = useState<User>(user);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(user.status);
  const [editName, setEditName] = useState(isNewUser);
  const { addUser, addUserResponse } = useAddUser();
  const { postUser, updateResponseStatus } = useUpdateUser();
  const [refresh, setRefresh] = useState(false);

  // Submit handler. It takes all the new data and set it to the state
  const onSubmit: SubmitHandler<User> = (data) => {
    setUserState((prevState) => ({
      ...prevState,
      name: data.name ? data.name : prevState.name,
      mail: data.mail,
      status: switchChecked,
    }));
    setSubmitClicked(true);
  };

  // Function to handle the call to custom hooks in order to save the data. Depends on bool to call add or update service
  const submitPostUser = async () => {
    let response: number | undefined = 0;
    isNewUser ? await addUser(userState) : await postUser(userState);
    isNewUser
      ? (response = addUserResponse)
      : (response = updateResponseStatus);
    if (response === 200) {
      console.log("success");
    } else {
      console.log(response);
    }
  };
  // Calling the service handler function inside an useEffect that is accessible only if state submitClicked is true
  useEffect(() => {
    if (submitClicked) {
      submitPostUser();
      setRefresh(!refresh);
    }
  }, [userState]);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center transition-opacity duration-300 ease-in-ou opacity-100 bg-black/20 ">
      <div className="bg-white rounded-lg w-3/4 h-3/4 md:w-3/4 md:h-3/4 lg:w-3/4 lg:h-3/4 p-6 overflow-x-hidden overflow-y-auto max-h-full">
        {/* Header */}
        <section className="grid gird-cols-6 gap-4 p-2">
          <div className="col-start-1 col-end-3 col-span-2 flex flex-row justify-start items-center gap-10">
            {isNewUser ? (
              <input className="w-24 h-24 rounded-full bg-slate-500" />
            ) : (
              <Avatar className="w-24 h-24 text-3xl">
                {/* .original is used to access the data value of the row */}
                <AvatarImage src={userState.profile_picture} />
                <AvatarFallback>
                  {userState.name
                    .split(" ")
                    .slice(0, 2)
                    .map((value) => value[0].toUpperCase())}
                </AvatarFallback>
              </Avatar>
            )}

            <div className="flex flex-col gap-2">
              <h1 className="text-2xl">
                {userState.name ? userState.name : ""}
              </h1>
              {!isNewUser && (
                <a
                  className="text-xs cursor-pointer"
                  onClick={() => setEditName(!editName)}
                >
                  Edit name
                </a>
              )}
            </div>
          </div>
          <div className="col-end-7 col-span-2 flex flex-row justify-end items-start relative left-24 bottom-24">
            <button
              onClick={showModal}
              className=" text-black rounded-full p-2 flex flex-row-reverse m-20"
            >
              X
            </button>
          </div>
        </section>

        {/* Body */}
        <h2 className=" p-2">Contact Information</h2>

        <section className="grid grid-rows-1 grid-flow-row p-2 gap-10 shadow-sm w-full text-black">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row gap-5 ">
              {editName && (
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    placeholder="Name"
                    defaultValue={userState.name ? user.name : ""}
                    {...register("name")}
                  />
                </div>
              )}
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Email"
                  defaultValue={userState.mail ? user.mail : ""}
                  {...register("mail", { required: true })}
                />
              </div>
              <div className="flex items-center space-x-2 pt-5">
                <Switch
                  className={`${
                    switchChecked ? "orange-background" : "bg-gray-500"
                  }`}
                  id="user_status"
                  defaultChecked={switchChecked}
                  onCheckedChange={(checked) => setSwitchChecked(checked)}
                />
                <Label htmlFor="user_status">Active</Label>
              </div>
            </div>
            <input type="submit" value="Submit" className="button-add mt-6" />
          </form>
        </section>
      </div>
    </div>
  );
}
