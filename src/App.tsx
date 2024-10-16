import { useEffect, useMemo, useState } from "react";
import { Priority, Task } from "./types";
import TodoListTable from "./cmps/TodoListTable";
import TaskFormModal from "./cmps/TaskFormModal";
import ConfirmDeleteModal from "./cmps/ConfirmDeleteModal";
import { tasksData } from "./data";
import { generateRandomId } from "./utils";
import { SortingState } from "@tanstack/react-table";
import { TaskFilters } from "./cmps/TaskFilters";
import { AddIcon } from "./cmps/Icons";

const emptyTask: Task = { task: "", assignee: "", priority: "Low" };

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : tasksData;
  });
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [assigneeFilter, setAssigneeFilter] = useState<string>("All");
  const [priorityFilter, setPriorityFilter] = useState<Priority>("All");
  const [notifications, setNotifications] = useState<string[]>([]); // Array of notifications

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        const assigneeMatches =
          assigneeFilter === "All" || task.assignee === assigneeFilter;
        const priorityMatches =
          priorityFilter === "All" || task.priority === priorityFilter;
        return assigneeMatches && priorityMatches;
      })
      .reverse();
  }, [assigneeFilter, priorityFilter, tasks]);

  const addTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
    showNotification("Task added successfully!");
  };

  const editTask = (updatedTask: Task) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    showNotification("Task edited successfully!");
  };

  const onClickEdit = (taskToEdit: Task | null) => {
    setTaskToEdit(taskToEdit);
  };

  const onClickDelete = (task: Task) => {
    setTaskToDelete(task);
  };

  const confirmDeleteTask = () => {
    if (taskToDelete) {
      const updatedTasks = tasks.filter((task) => task.id !== taskToDelete.id);
      setTasks(updatedTasks);
      setTaskToDelete(null);
      showNotification("Task deleted successfully!");
    }
  };

  const showNotification = (message: string) => {
    setNotifications((prevNotifications) => [...prevNotifications, message]); // Add the new notification

    setTimeout(() => {
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notif) => notif !== message)
      );
    }, 3000);
  };

  const saveTask = (task: Task) => {
    if (task.id) editTask(task);
    else addTask({ ...task, id: generateRandomId() });
    setTaskToEdit(null);
  };

  const resetFilters = () => {
    setAssigneeFilter("All");
    setPriorityFilter("All");
    setSorting([]);
  };

  const availableAssignees = useMemo(() => {
    const assignees = tasks.map((task) => task.assignee);
    return ["All", ...new Set(assignees)];
  }, [tasks]);

  const availablePriorities: Priority[] = ["All", "High", "Medium", "Low"];

  return (
    <>
      <main className="h-screen flex justify-center items-center p-4">
        <div className="flex justify-center items-center flex-col h-full">
          <h1 className="mb-2 text-4xl font-medium leading-tight text-gray-400">
            Todo List
          </h1>
          <TaskFilters
            assigneeFilter={assigneeFilter}
            setAssigneeFilter={setAssigneeFilter}
            availableAssignees={availableAssignees}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            availablePriorities={availablePriorities}
            resetFilters={resetFilters}
          />
          <TodoListTable
            tasks={filteredTasks}
            onClickEdit={onClickEdit}
            deleteTask={onClickDelete}
            sorting={sorting}
            setSorting={setSorting}
          />
          <button
            aria-label="Add Task"
            onClick={() => {
              setTaskToEdit(emptyTask);
            }}
            className="mt-4 block text-gray-100 bg-blue-800 hover:bg-blue-600 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600hover:bg-blue-70 focus:ring-blue-800"
            type="button"
          >
            <AddIcon className="text-3xl" />
          </button>
          {!!taskToEdit && (
            <TaskFormModal
              close={() => setTaskToEdit(null)}
              saveTask={saveTask}
              task={taskToEdit}
            />
          )}
          <ConfirmDeleteModal
            isOpen={!!taskToDelete}
            onClose={() => setTaskToDelete(null)}
            onConfirm={confirmDeleteTask}
            message="Are you sure you want to delete this task?"
          />
        </div>

        <div className="fixed top-4 right-4 space-y-2 z-50">
          {notifications.map((notif, index) => (
            <div
              key={index}
              className="bg-emerald-500 text-white p-3 rounded-lg shadow-md"
            >
              {notif}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
