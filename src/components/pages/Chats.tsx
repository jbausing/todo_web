import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import type { Todo } from "./Home";
import { Button } from "../ui/button";
import { useGetToDoQuery } from "@/store/api/ToDoApi";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";

function Chats() {
  const getTodo = useGetToDoQuery({});
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col items-center p-20 relative gap-8">
        <nav className="absolute top-6 left-8 right-8 flex items-center justify-between text-sm">
          {/* left group (History, Dark mode, To Do List) */}
          <div className="flex items-center gap-8 font-[Poppins]">
            <Sheet>
              <SheetTrigger className="cursor-pointer font-bold">
                History
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>History</SheetTitle>
                  <SheetDescription>
                    View your past tasks and their statuses here.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid flex-1 auto-rows-min gap-2 px-4">
                  {getTodo?.data?.data
                    ?.filter(
                      (item: Todo) =>
                        item.date_finished !== null ||
                        item.date_deleted !== null
                    )
                    .map((item: Todo) => (
                      <div
                        key={item.id}
                        className={`p-4 ${
                          item.date_finished
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        <p key={item.id} className="font-medium">
                          {item.description}
                        </p>
                        <span className="text-xs text-gray-500">
                          {item.date_finished
                            ? `Finished on: ${
                                new Date(item.date_finished)
                                  .toISOString()
                                  .split("T")[0]
                              }`
                            : `Deleted on: ${
                                new Date(item.date_deleted!)
                                  .toISOString()
                                  .split("T")[0]
                              }`}
                        </span>
                      </div>
                    ))}
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button variant="outline">Close</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
            <span
              className="cursor-pointer font-bold"
              onClick={() => navigate("/home")}
            >
              Home
            </span>
            <span className="cursor-pointer font-bold">Chats</span>
          </div>
        </nav>

        <div className="bg-red-100 w-3/4 h-[600px] p-1 flex">
          <div className="bg-orange-50 w-1/4 p-1">
            <div className="bg-green-100 p-2">name here</div>
          </div>
          <div className="bg-purple-100 w-3/4 p-1 relative">
            <div className="flex w-full items-center gap-2 absolute bottom-0 p-2">
              <Input type="text" placeholder="message" className="w-full" />
              <Button type="submit" variant="outline">
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chats;
