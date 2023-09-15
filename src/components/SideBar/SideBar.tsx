import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AvatarPic from "@/assets/avatar_pic.webp";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AiOutlinePoweroff } from "react-icons/ai";

export function SideBar() {
  const name = "Julio Sarmiento";
  return (
    <aside className=" bg-gray-100 h-full dark:bg-gray-900">
      {/* User Info */}
      <section className=" grid grid-rows-2 grid-flow-col gap-0 max-h-80 lg:grid-cols-[4rem_10rem] pt-10 ml-5">
        <Avatar className="row-span-2 w-14 h-14">
          {/* .original is used to access the data value of the row */}
          <AvatarImage src={AvatarPic} alt="User picture" />
          <AvatarFallback>
            {name
              .split(" ")
              .slice(0, 2)
              .map((value) => value[0].toUpperCase())}
          </AvatarFallback>
        </Avatar>
        <p className="text-gray-500 text-xs flex flex-col-reverse">
          Welcome back
        </p>
        <h3 className="">Jhon</h3>
      </section>
      {/* Menu */}
      <section className=" mt-10">
        <Accordion type="single" collapsible className="px-8">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-md font-light">
              Configurations
            </AccordionTrigger>
            <AccordionContent>
              <section className="flex flex-col c">
                <a href="google.com" className="pr-5 pb-2 cursor-pointer">
                  Applications
                </a>
                <a className="pr-5 pb-2 cursor-pointer">
                  App Configuration Groups
                </a>
              </section>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion
          type="single"
          collapsible
          className="px-8 orange-background text-white"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-md font-light ">
              Users
            </AccordionTrigger>
            <AccordionContent>
              <section className="flex flex-col ">
                <a className="pr-5 pb-2 cursor-pointer">Users</a>
                <a className="pr-5 pb-2 cursor-pointer">User Managment Log</a>
                <a className="pr-5 pb-2 cursor-pointer">Portal Data Audit</a>
              </section>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible className="px-8">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-md font-light">
              Interests
            </AccordionTrigger>
            <AccordionContent>
              <a className="pr-5 pb-2 cursor-pointer">Interests Categories</a>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible className="px-8">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-md font-light">
              Settings
            </AccordionTrigger>
            <AccordionContent>
              <a className="pr-5 pb-2 cursor-pointer">Portal Configurations</a>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible className="px-8">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-md font-light">
              Tools
            </AccordionTrigger>
            <AccordionContent>
              <a className="pr-5 pb-2 cursor-pointer">Document Upload</a>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
      <section className="justify-self-end fixed bottom-3">
        <button className="py-2 flex flex-row p-8 gap-2">
          {<AiOutlinePoweroff className="mt-1" />} Sign Out
        </button>
      </section>
    </aside>
  );
}
