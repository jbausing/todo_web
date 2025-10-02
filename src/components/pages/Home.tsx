import React, { useState } from "react";
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

type Todo = {
  id: number;
  desc: string;
  date: string;
  status: number;
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

  const addTask = () => {
    if (input !== "") {
      const addTodo: Todo = {
        id: todo.length + 1,
        desc: input,
        date: new Date().toISOString().split("T")[0],
        status: 1,
      };
      setTodo([...todo, addTodo]);
      setInput("");
    } else {
      alert("Please enter some task");
    }
  };

  return (
    <div className="flex flex-col items-center p-20 ">
      <nav className="absolute top-6 left-8 flex items-center gap-8 text-sm">
        <Sheet>
          <SheetTrigger className="font-[Poppins]">History</SheetTrigger>
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
        {/* <span className="font-[Poppins]">History</span> */}
        <span className="font-[Poppins]">Dark mode</span>
      </nav>

      <div className="w-full max-w-3xl">
        {/* headline */}
        <h1 className="font-[Poppins] font-extrabold text-[100px] leading-none tracking-tight text-black text-center">
          Get it done.
        </h1>
      </div>

      <div className="flex w-3/5">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task"
          className="bg-black text-white h-10 px-4 outline-none focus-visible:ring-0 focus:ring-0 ring-0 shadow-none !rounded-none"
        />
        <Button
          onClick={addTask}
          className="font-[Poppins] text-xs font-semibold bg-[#EFEFEF] h-10 px-4 text-black hover:!bg-[#EFEFEF] hover:!text-black !rounded-none"
        >
          I'm on it
        </Button>
      </div>

      <div className="flex flex-col w-3/5 pt-4 space-y-2">
        <div className="font-[Poppins] text-center">Your Task: </div>
        {todo.map((item) => (
          <div
            key={item.id}
            className="mx-auto flex items-center justify-between border border-black w-[468px] h-10 px-3"
          >
            <p>{item.desc}</p> <p>{item.date}</p>
            <X />
            <Check />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
