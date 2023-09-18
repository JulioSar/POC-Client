/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Dispatch, SetStateAction, useState } from "react";
import { type User } from "../../types";
import { UserContact } from "../UsersAdmin/UserContact";
import "animate.css";

interface UsersModalProps {
  user: User;
  showModal: () => void;
  refresh: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
}

export function UsersModal({
  user,
  showModal,
  refresh,
  setRefresh,
}: UsersModalProps) {
  const isNewUser = Boolean(!user.name);
  const [editName, setEditName] = useState(isNewUser);
  const [userState, setUserState] = useState<User>(user);
  const [tab, setTab] = useState("contact");

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center transition-opacity duration-300 ease-in-ou opacity-100 bg-black/20 ">
      <div className="bg-white dark:bg-slate-800 rounded-lg w-3/4 h-3/4 md:w-3/4 md:h-3/4 lg:w-3/4 lg:h-3/4 p-6 overflow-x-hidden overflow-y-auto max-h-full">
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
        <section className="">
          <div className="grid grid-cols-3 gap-10 mb-8 shadow-sm rounded-sm ">
            <button
              onClick={() => setTab("contact")}
              className={`${
                tab === "contact" ? "bg-gray-300 rounded-t-lg " : "bg-none"
              }`}
            >
              Profile
            </button>

            <button
              onClick={() => setTab("organization")}
              className={`${
                tab === "organization" ? "bg-gray-300 rounded-t-lg " : "bg-none"
              }`}
            >
              Chart
            </button>
            <button
              onClick={() => setTab("audit")}
              className={`${
                tab === "audit" ? "bg-gray-300 rounded-t-lg " : "bg-none"
              }`}
            >
              Audit
            </button>
          </div>
        </section>

        {tab === "contact" ? (
          <UserContact
            userState={userState}
            editName={editName}
            setUserState={setUserState}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        ) : tab === "organization" ? (
          <h1>Chart</h1>
        ) : (
          tab === "audit" && <h1>This is audit</h1>
        )}
      </div>
    </div>
  );
}
