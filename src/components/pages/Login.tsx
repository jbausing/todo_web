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

  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);

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

  /* ...imports and state unchanged... */

  return (
    <div className="flex flex-col items-center p-20 relative">
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
          <span>
            {" "}
            <Link to="/home" className="font-bold">
              To Do List
            </Link>{" "}
          </span>
        </div>

        {/* right group (Log in, Sign in) */}
        <div className="flex items-center gap-6 font-[Poppins] font-bold">
          <Link
            to="/login"
            className="cursor-pointer text-primary underline-offset-4 hover:underline"
          >
            Log in
          </Link>
          <Link
            to="/signin"
            className="cursor-pointer text-primary underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </div>
      </nav>

      {/* Outer: centers page and restricts width */}
      <div className="w-full max-w-6xl mx-auto py-20 px-6">
        {/* Parent: stacked on small, side-by-side on md+ */}
        <div className="w-full flex flex-col md:flex-row md:items-center gap-12">
          {/* LEFT: keep your exact bordered box classes unchanged, but give it a fixed width on md+ */}
          <div className="border-2 p-20 border-black flex flex-col gap-6 w-full md:w-[520px]">
            <div>
              <h1 className="font-[Poppins] text-b font-bold text-center">
                Log in — it’s your daily dose of digital discipline.
              </h1>
            </div>

            <div className="flex flex-col gap-2">
              <Input
                placeholder="Username"
                className="bg-black text-white h-10 px-4 outline-none focus-visible:ring-0 focus:ring-0 ring-0 shadow-none !rounded-none"
              />

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="bg-black text-white h-10 px-4 outline-none focus-visible:ring-0 focus:ring-0 ring-0 shadow-none !rounded-none pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="font-[Poppins] absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400 focus:outline-none"
                  tabIndex={-1}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="text-center">
              <span className="text-sm font-[Poppins] font-bold">
                Forgot Password
              </span>
            </div>
            <div>
              <Button className="font-[Poppins] text-base uppercase font-bold bg-[#EFEFEF] h-10 w-full px-4 text-black hover:!bg-[#EFEFEF] hover:!text-black !rounded-none cursor-pointer">
                Log in
              </Button>
            </div>
          </div>

          {/* RIGHT: vertical center & take remaining space; content centered on small screens */}
          <aside className="flex-1 flex flex-col items-center justify-center gap-6 px-6 text-center">
            <h2 className="font-[Poppins] text-lg font-semibold text-center max-w-md">
              Don't have an account? Click{" "}
              <Link
                to="/signin"
                className="uppercase font-bold underline underline-offset-2"
              >
                SIGN IN
              </Link>{" "}
              to make one or log in with:
            </h2>

            <div className="flex gap-6 justify-center md:justify-start mt-2">
              <img
                src="/fb.png"
                alt="Facebook"
                className="w-10 h-10 cursor-pointer hover:scale-110 transition-transform"
              />
              <img
                src="/gmail.png"
                alt="Gmail"
                className="w-10 h-10 cursor-pointer hover:scale-110 transition-transform"
              />
              <img
                src="/apple.png"
                alt="Apple"
                className="w-10 h-10 cursor-pointer hover:scale-110 transition-transform"
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Home;
