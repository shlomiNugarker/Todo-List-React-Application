import { useEffect, useRef, useState } from "react";
import { Task } from "../types";

interface Props {
  saveTask: (task: Task) => void;
  close: () => void;
  task: Task;
}

const TaskFormModal = ({ saveTask, close, task }: Props) => {
  const [taskToSave, setTaskToSave] = useState<Task>({ ...task });
  const [errors, setErrors] = useState<{ task?: string; assignee?: string }>(
    {}
  );

  const taskInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (taskInputRef.current) {
      taskInputRef.current.focus();
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setTaskToSave((prev) => ({
      ...prev,
      [id]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: "",
    }));
  };

  const validateForm = () => {
    const newErrors: { task?: string; assignee?: string } = {};

    if (!taskToSave.task.trim()) {
      newErrors.task = "Task description is required.";
    }

    if (!taskToSave.assignee.trim()) {
      newErrors.assignee = "Assignee is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();

    if (validateForm()) {
      saveTask(taskToSave);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed  z-50 outline-none focus:outline-none min-w-[30vw]"
      >
        <div className="relative my-6 mx-auto max-w-3xl border-0 rounded-lg shadow-lg flex flex-col w-full bg-gray-800 text-white outline-none focus:outline-none">
          {/* Header */}
          <div className="flex items-start justify-between p-5 border-b  border-gray-700 rounded-t">
            <h3 className="text-2xl font-semibold">
              {taskToSave.id ? "Edit Task" : "Add Task"}
            </h3>
            <button
              className="flex items-center absolute top-3 right-2.5 text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8  justify-center items-cente hover:bg-gray-600 hover:text-white"
              onClick={close}
            >
              <span className="bg-transparent text-white h-6 w-6 text-2xl  outline-none focus:outline-none flex justify-center items-center">
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                  />
                </svg>
              </span>
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4">
            <div>
              <label
                htmlFor="task"
                className="block mb-2 text-sm font-medium text-gray-300"
              >
                Task:
              </label>
              <input
                id="task"
                type="text"
                value={taskToSave.task}
                onChange={handleInputChange}
                aria-label="Task Description"
                ref={taskInputRef}
                className={`border ${
                  errors.task ? "border-red-500" : "border-gray-300"
                }  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white`}
              />
              {errors.task && (
                <p className="text-red-500 text-sm mt-1">{errors.task}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="assignee"
                className="block mb-2 text-sm font-medium text-gray-300"
              >
                Assignee:
              </label>
              <input
                id="assignee"
                type="text"
                value={taskToSave.assignee}
                onChange={handleInputChange}
                aria-label="Assignee Name"
                className={`border ${
                  errors.assignee ? "border-red-500" : "border-gray-300"
                }  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white`}
              />
              {errors.assignee && (
                <p className="text-red-500 text-sm mt-1">{errors.assignee}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="priority"
                className="block mb-2 text-sm font-medium  text-gray-300"
              >
                Priority:
              </label>
              <select
                id="priority"
                aria-label="Priority Level"
                value={taskToSave.priority}
                onChange={handleInputChange}
                className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
              >
                {["High", "Medium", "Low"].map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end p-6 border-t border-gray-700 rounded-b">
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={(ev) => {
                ev.stopPropagation();
                close();
              }}
            >
              Cancel
            </button>
            <button
              className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="submit"
            >
              Save
            </button>
          </div>
        </div>
      </form>
      <div
        onClick={(ev) => {
          ev.stopPropagation();
          close();
        }}
        className="fixed inset-0 z-40 bg-slate-900 bg-opacity-50 backdrop-blur-sm"
      ></div>
    </>
  );
};

export default TaskFormModal;
