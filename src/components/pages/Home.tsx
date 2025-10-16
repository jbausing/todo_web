import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
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
import { Check, X } from "lucide-react";
import {
  useAddToDOMutation,
  useGetToDoQuery,
  useUpToDOMutation,
} from "@/store/api/ToDoApi";

type Todo = {
  id: number;
  description: string;
  date_added: string;
  status?: number;
  date_finished?: string;
  date_deleted?: string;
};

function Home() {
  const [todo, setTodo] = useState<Todo[]>([
    // {
    //   id: 1,
    //   desc: "sample task",
    //   date: "2025-09-25",
    //   status: 1,
    // },
  ]);

  const [input, setInput] = useState("");

  // const addTask = () => {
  //   if (input !== "") {
  //     const addTodo: Todo = {
  //       id: todo.length + 1,
  //       desc: input,
  //       date: new Date().toISOString().split("T")[0],
  //       status: 1,
  //     };
  //     setTodo([...todo, addTodo]);
  //     setInput("");
  //   } else {
  //     alert("Please enter some task");
  //   }
  // };

  const [addToDo] = useAddToDOMutation();

  const add = async () => {
    try {
      const addTodo: Todo = {
        id: todo.length + 1,
        description: input,
        date_added: new Date().toISOString().split("T")[0],
        status: 1,
      };

      const checkstat = await addToDo(addTodo).unwrap();

      if (checkstat.success) {
        setInput("");
      }

      console.log(checkstat);
    } catch (error) {}
  };

  const [upToDo] = useUpToDOMutation();

  const update = async (id: number, status: number) => {
    try {
      const datas = {
        id: id,
        status: status,
      };

      const checkstat = await upToDo(datas).unwrap();

      if (checkstat.success) {
        setInput("");
      }

      console.log(checkstat);
    } catch (error) {}
  };

  const getTodo = useGetToDoQuery({});

  console.log(getTodo?.data?.data);

  /* ...imports and state unchanged... */

  return (
    <div className="flex flex-col items-center p-20 relative gap-8">
      {/* NAV: absolute like your original, but stretches from left to right and uses justify-between */}
      <nav className="absolute top-6 left-8 right-8 flex items-center justify-between text-sm">
        {/* left group (History, Dark mode, To Do List) */}
        <div className="flex items-center gap-8 font-[Poppins]">
          <Sheet>
            <SheetTrigger className="cursor-pointer font-bold">
              History
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </SheetDescription>
              </SheetHeader>
              <div className="grid flex-1 auto-rows-min gap-6 px-4">
                <div className="grid gap-3">
                  <label htmlFor="sheet-demo-name">Name</label>
                  <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
                </div>
                <div className="grid gap-3">
                  <label htmlFor="sheet-demo-username">Username</label>
                  <Input id="sheet-demo-username" defaultValue="@peduarte" />
                </div>
              </div>
              <SheetFooter>
                <Button type="submit">Save changes</Button>
                <SheetClose asChild>
                  <Button variant="outline">Close</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          <span className="cursor-pointer font-bold">Dark mode</span>
        </div>
      </nav>

      {/* rest of your layout unchanged */}
      <div className="w-full max-w-3xl">
        <h1 className="font-[Poppins] font-extrabold text-[100px] leading-none tracking-tight text-black text-center">
          Get it done.
        </h1>
      </div>

      <div className="flex w-3/5">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              add();
            }
          }}
          placeholder="Add a task"
          className="bg-black text-white h-10 px-4 outline-none focus-visible:ring-0 focus:ring-0 ring-0 shadow-none !rounded-none"
        />
        <Button
          onClick={add}
          className="font-[Poppins] text-xs font-semibold bg-[#EFEFEF] h-10 px-4 text-black hover:!bg-[#EFEFEF] hover:!text-black !rounded-none cursor-pointer"
        >
          I'm on it
        </Button>
      </div>

      <div className="flex flex-col w-3/5 pt-4 space-y-2">
        {getTodo?.data?.data?.filter(
          (item: Todo) =>
            item.date_finished === null && item.date_deleted === null
        ).length > 0 && (
          <div className="font-[Poppins] text-center">Your Task: </div>
        )}
        {getTodo?.data?.data
          ?.filter(
            (item: Todo) =>
              item.date_finished === null && item.date_deleted === null
          )
          .map((item: Todo) => (
            <div
              key={item.id}
              className="mx-auto flex items-center justify-between border border-black w-[468px] h-10 px-3"
            >
              <p>{item.description}</p>{" "}
              <p>{new Date(item.date_added).toISOString().split("T")[0]}</p>
              <div className="flex items-center space-x-2">
                <button
                  aria-label="delete"
                  className="p-1 cursor-pointer"
                  onClick={() => update(item.id, 2)}
                >
                  <X className="h-4 w-4" />
                </button>
                <button
                  aria-label="done"
                  className="p-1 cursor-pointer"
                  onClick={() => update(item.id, 1)}
                >
                  <Check className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
