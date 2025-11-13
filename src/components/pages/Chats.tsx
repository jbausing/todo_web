import React, { useEffect, useState } from "react";
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
import {
  useGetToDoQuery,
  useGetUsersQuery,
  useSendMessageMutation,
} from "@/store/api/ToDoApi";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { toast } from "sonner";

type Users = {
  id: number;
  name: string;
};

type Message = {
  receiver: number;
  message: string;
};

type AllMessage = {
  id: number;
  message: string;
};

function Chats() {
  const getTodo = useGetToDoQuery({});
  const navigate = useNavigate();

  const uid = localStorage.getItem("uid");
  const [activeId, setActiveId] = useState(0);
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<AllMessage[]>([]);

  const getUsers = useGetUsersQuery({});
  console.log(getUsers?.data?.data);

  const [sendMessage] = useSendMessageMutation();

  const submit = async () => {
    if (message !== "") {
      try {
        const addMessage: Message = {
          receiver: activeId,
          message: message,
        };

        const checkstat = await sendMessage(addMessage).unwrap();

        if (checkstat.success) {
          setMessage("");
        }

        console.log(checkstat);
      } catch (error) {}
    } else {
      toast.error("Please input some message!");
    }
  };

  useEffect(() => {
    const ws = new WebSocket(
      // `${import.meta.env.VITE_WS_URL}/message/${uid}_${activeId}`
      `${import.meta.env.VITE_WS_URL}/message/${uid}_${activeId}`
    );

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Data here: ", data);

      setMessages((prev) => [...prev, data]);

      // if (data.event === "login" && currentId === parseInt(data.id)) {
      //   // console.log("Ako yun!");
      //   setDupUser(true);
      //   localStorage.setItem("cdup", "true");
      // }
    };

    return () => {
      ws.close();
    };
  }, [activeId]);

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

        <div className=" w-3/4 h-[600px] p-1 flex border">
          <div className=" w-1/4 p-1 border flex flex-col gap-1">
            {getUsers?.data?.data.map((item: Users) => (
              <div
                className={`p-2 cursor-pointer ${
                  activeId === item.id ? `bg-blue-500` : `bg-gray-200`
                } `}
                key={item.id}
                onClick={() => setActiveId(item.id)}
              >
                {item.name}
              </div>
            ))}
          </div>
          <div className="bg-purple-100 w-3/4 p-1 relative">
            <div className="h-[calc(100%-50px)] bg-blue-100 p-1 flex flex-col gap-2 overflow-auto">
              {messages.map((item) => (
                <div className="p-2 bg-red-100 rounded-lg" key={item.id}>
                  {item.message}
                </div>
              ))}
              {/* <div className="p-2 bg-red-100 rounded-lg">Message 1</div>
              <div className="p-2 bg-red-100 rounded-lg">Message 2</div>
              <div className="p-2 bg-red-100 rounded-lg">Message 1</div>
              <div className="p-2 bg-red-100 rounded-lg">Message 2</div>
              <div className="p-2 bg-red-100 rounded-lg">Message 1</div>
              <div className="p-2 bg-red-100 rounded-lg">Message 2</div>
              <div className="p-2 bg-red-100 rounded-lg">Message 1</div>
              <div className="p-2 bg-red-100 rounded-lg">Message 2</div>
              <div className="p-2 bg-red-100 rounded-lg">Message 1</div>
              <div className="p-2 bg-red-100 rounded-lg">Message 2</div>
              <div className="p-2 bg-red-100 rounded-lg">Message 1</div>
              <div className="p-2 bg-red-100 rounded-lg">Message 2</div>
              <div className="p-2 bg-red-100 rounded-lg">Message 1</div>
              <div className="p-2 bg-red-100 rounded-lg">Message 2</div>
              <div className="p-2 bg-red-100 rounded-lg">Message 1</div>
              <div className="p-2 bg-red-100 rounded-lg">Message 2</div>
              <div className="p-2 bg-red-100 rounded-lg">Message 1</div>
              <div className="p-2 bg-red-100 rounded-lg">Message 2</div> */}
            </div>
            <div className="flex w-full items-center gap-2 absolute bottom-0 p-2">
              <Input
                type="text"
                placeholder="message"
                className="w-full"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={activeId === 0}
              />
              <Button
                type="submit"
                variant="outline"
                onClick={submit}
                disabled={activeId === 0}
              >
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
