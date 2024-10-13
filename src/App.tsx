/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import TodoForm from "./cmps/TodoForm ";

function App() {
  const [tasks, setTasks] = useState<any[]>([]);

  const addTask = (newTask: any[]) => {
    setTasks([...tasks, newTask]);
  };
  return (
    <>
      <div>
        <h1>Todo List</h1>
        <TodoForm onAddTask={addTask} />
      </div>
    </>
  );
}

export default App;
