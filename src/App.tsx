import { useState } from "react";
import TodoForm from "./cmps/TodoForm ";
import { Task } from "./interfaces/Task";
import TodoListTable from "./cmps/TodoListTable";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };

  const handleEdit = (updatedTask: Task) => {
    // const updatedTasks = tasks.map((task) =>
    //   task.task === updatedTask.task ? updatedTask : task
    // );
    // setTasks(updatedTasks);
  };

  const handleDelete = (taskToDelete: Task) => {
    const updatedTasks = tasks.filter(
      (task) => task.task !== taskToDelete.task
    );
    setTasks(updatedTasks);
  };

  return (
    <main className="h-screen flex justify-center items-center">
      <div>
        <h1>Todo List</h1>
        <TodoForm onAddTask={addTask} />
        <TodoListTable
          tasks={tasks}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    </main>
  );
}

export default App;
