/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable multiline-ternary */
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAddUser, useUpdateUser } from "../../hooks/useUsers";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type User } from "../../types";
import { useToast } from "@/components/ui/use-toast";

interface UserContactProps {
  userState: User;
  editName: boolean;
  setUserState: Dispatch<SetStateAction<User>>;
  refresh: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
}

export function UserContact(
  { userState, editName, setUserState, refresh, setRefresh }: UserContactProps,
  isNewUser: boolean
) {
  const user = userState;
  const { register, handleSubmit } = useForm<User>();
  const [submitClicked, setSubmitClicked] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(user.status);
  const { postUser } = useUpdateUser();
  const { addUser } = useAddUser();
  const { toast } = useToast();

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
    const response = isNewUser
      ? await addUser(userState)
      : await postUser(userState);
    if (response === 201) {
      setRefresh(!refresh);
      toast({
        title: "Data added correctly",
        description: "The user data has been added to Data Base correctly.",
      });
    } else {
      console.log(response);
    }
  };
  // Calling the service handler function inside an useEffect that is accessible only if state submitClicked is true
  useEffect(() => {
    if (submitClicked) {
      submitPostUser();
    }
  }, [userState]);
  return (
    <>
      {/* Contact Information */}
      <h2 className=" text-xl p-2">Contact Information</h2>

      <section className="grid grid-rows-1 grid-flow-row p-2 gap-10 shadow-sm w-full text-black mt-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-3 gap-4 ">
            {editName && (
              <div className="grid w-full max-w-sm items-center gap-1.5 shadow-sm">
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
                className="border-none"
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                type="text"
                id="location"
                placeholder="Location"
                defaultValue="Madrid"
                className="border-none"
              />
            </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                type="text"
                id="company"
                placeholder="Company"
                defaultValue="Apex"
                className="border-none"
              />
            </div>
            <div>
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                type="text"
                id="jobTitle"
                placeholder="Job Title"
                defaultValue="Software Engineer, DevOps"
                className="border-none"
              />
            </div>
            <div>
              <Label htmlFor="department">Department</Label>
              <Input
                type="text"
                id="department"
                placeholder="Deparment"
                defaultValue="DevOps"
                className="border-none"
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
          <input
            type="submit"
            value="Submit"
            className="button-add mt-8 text-white shadow-gray-400"
          />
        </form>
      </section>
      {/* Organization */}
      <section className="mt-12">
        <h2 className="text-xl">Applications</h2>
        <div className="grid grid-cols-3 gap-6 p-2 mt-6">
          <Card className="bg-gray-300 ">
            <CardHeader>
              <CardTitle>Agency Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <p>An integrated loan agency and portfolio management platform</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-300 ">
            <CardHeader>
              <CardTitle>Participate</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Dynamic GP and LP Document and Data Portals</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-300 ">
            <CardHeader>
              <CardTitle>Spotlight Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Spotlight internal tools: Help and upload information</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
