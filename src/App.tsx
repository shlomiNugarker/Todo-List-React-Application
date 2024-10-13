import { useState } from "react";
import TodoForm from "./cmps/TodoForm ";
import { Task } from "./interfaces/Task";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (newTask: Task) => {
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
