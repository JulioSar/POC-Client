/* eslint-disable @typescript-eslint/indent */
import type { User } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function UserAudit({ userState }: { userState: User }) {
  const currentTime = new Date().toLocaleString();
  return (
    <section className="mt-12">
      <div className="grid grid-cols-3 gap-6 p-2 mt-6">
        <Card className="bg-gray-100 ">
          <CardHeader>
            <CardTitle>Deploy Application</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Agency Tool </p>
            <span>{currentTime}</span>
          </CardContent>
        </Card>
        <Card className="bg-gray-100 ">
          <CardHeader>
            <CardTitle>Change MFA Conf</CardTitle>
          </CardHeader>
          <CardContent>
            <p>User changed from TOTP to SMS </p>
            <span>{currentTime}</span>
          </CardContent>
        </Card>
        <Card className="bg-gray-100 ">
          <CardHeader>
            <CardTitle>Change mobile number</CardTitle>
          </CardHeader>
          <CardContent>
            <p>User changed mobile number to 123-456-789</p>
            <span>{currentTime}</span>
          </CardContent>
        </Card>
        <Card className="bg-gray-100 ">
          <CardHeader>
            <CardTitle>Change profile picture</CardTitle>
          </CardHeader>
          <CardContent>
            <p>User changed profile picture</p>
            <span>{currentTime}</span>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
