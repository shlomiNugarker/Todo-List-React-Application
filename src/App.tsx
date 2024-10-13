import { useState } from "react";
import TodoForm from "./cmps/TodoForm ";
import { Task } from "./interfaces/Task";
import TodoListTable from "./cmps/TodoListTable";

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
        <TodoListTable tasks={tasks} />
      </div>
    </>
  );
}

export default App;
