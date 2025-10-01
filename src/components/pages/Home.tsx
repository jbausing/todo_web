import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type Todo = {
  id: number;
  desc: string;
  date: string;
  status: number;
};

function Home() {
  const [todo, setTodo] = useState<Todo[]>([
    {
      id: 1,
      desc: "sample task",
      date: "2025-09-25",
      status: 1,
    },
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
    <div className="flex flex-col items-center p-4 ">
      <div className="flex w-3/5 gap-2">
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        <Button onClick={addTask}>Add</Button>
      </div>

      <div className="flex flex-col w-3/5 pt-4">
        <div>Your Task: </div>
        {todo.map((item) => (
          <div key={item.id} className="pl-4 flex justify-between">
            <p>{item.desc}</p> <p>{item.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
