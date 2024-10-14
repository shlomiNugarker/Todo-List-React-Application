import { useMemo, useState } from "react";
import { Priority, Task } from "./interfaces/Task";
import TodoListTable from "./cmps/TodoListTable";
import TaskFormModal from "./cmps/TaskFormModal";
import ConfirmDeleteModal from "./cmps/ConfirmDeleteModal";
import { tasksData } from "./data";
import { generateRandomId } from "./services/utils";
import { SortingState } from "@tanstack/react-table";
import { TaskFilters } from "./cmps/TaskFilters";

function App() {
  const [tasks, setTasks] = useState<Task[]>(tasksData as Task[]);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [assigneeFilter, setAssigneeFilter] = useState<string>("All");
  const [priorityFilter, setPriorityFilter] = useState<Priority>("All");
  const emptyTask: Task = { task: "", assignee: "", priority: "Low" };

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
  };

  const editTask = (updatedTask: Task) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
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
      setTaskToDelete(null);
    }
  };

  const saveTask = (task: Task) => {
    if (task.id) editTask(task);
    else addTask({ ...task, id: generateRandomId() });
    setTaskToEdit(null);
  };

  const resetFilters = () => {
    setAssigneeFilter("All");
    setPriorityFilter("All");
  };

  const availableAssignees = useMemo(() => {
    const assignees = tasks.map((task) => task.assignee);
    return ["All", ...new Set(assignees)];
  }, [tasks]);

  const availablePriorities: Priority[] = ["All", "High", "Medium", "Low"];

  return (
    <>
      <main className="min-h-screen flex justify-center items-center p-4">
        <div className="flex justify-center items-center flex-col ">
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
            className="mt-4 block text-white hover:bg-blue-800 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600hover:bg-blue-70 focus:ring-blue-800"
            type="button"
          >
            <svg
              viewBox="0 0 1024 1024"
              fill="currentColor"
              height="1em"
              width="1em"
              className="text-3xl"
            >
              <defs>
                <style />
              </defs>
              <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z" />
              <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z" />
            </svg>
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
      </main>
    </>
  );
}

export default App;
