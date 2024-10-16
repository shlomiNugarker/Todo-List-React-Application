import { useEffect, useRef, useState } from "react";
import { Task } from "../types";
import { CloseIcon } from "./Icons";
import { SelectField } from "./SelectField";
import InputField from "./InputField";

interface Props {
  saveTask: (task: Task) => void;
  close: () => void;
  task: Task;
}

const TaskFormModal = ({ saveTask, close, task }: Props) => {
  const [taskToSave, setTaskToSave] = useState<Task>(task);
  const [errors, setErrors] = useState<{ task?: string; assignee?: string }>(
    {}
  );
  const [isClosing, setIsClosing] = useState(false);

  const taskInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    taskInputRef.current?.focus();
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
      setIsClosing(true);
      setTimeout(() => {
        saveTask(taskToSave);
      }, 300);
    }
  };

  const handleClose = (
    ev:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    ev.stopPropagation();
    setIsClosing(true);
    setTimeout(() => {
      close();
    }, 300);
  };

  const anumationClass = ` ${
    isClosing ? "animate-fade-out-scale" : "animate-fade-in-scale"
  }`;

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed  z-50 outline-none focus:outline-none min-w-[30vw]"
      >
        <div
          className={`relative my-6 mx-auto max-w-3xl border-0 rounded-lg shadow-lg flex flex-col w-full bg-gray-800 text-white outline-none focus:outline-none transition-transform
            ${anumationClass}`}
        >
          {/* Header */}
          <div className="flex items-start justify-between p-5 border-b border-gray-700 rounded-t">
            <h3 className="text-2xl font-semibold">
              {taskToSave.id ? "Edit Task" : "Add Task"}
            </h3>
            <div
              className="flex items-center absolute top-3 right-2.5 text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8  justify-center items-cente hover:bg-gray-600 hover:text-white"
              onClick={handleClose}
            >
              <span className="bg-transparent text-white h-6 w-6 text-2xl  outline-none focus:outline-none flex justify-center items-center">
                <CloseIcon className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4">
            <InputField
              id="task"
              label="Task"
              value={taskToSave.task}
              error={errors.task}
              handleChange={handleInputChange}
              inputRef={taskInputRef}
            />
            <InputField
              id="assignee"
              label="Assignee"
              value={taskToSave.assignee}
              error={errors.assignee}
              handleChange={handleInputChange}
            />

            <SelectField
              id="priority"
              label="Priority"
              value={taskToSave.priority}
              options={["High", "Medium", "Low"]}
              handleChange={handleInputChange}
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end p-6 border-t border-gray-700 rounded-b">
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
              type="button"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="bg-emerald-500 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg focus:outline-none mr-1 mb-1"
              type="submit"
            >
              Save
            </button>
          </div>
        </div>
      </form>
      <div
        onClick={handleClose}
        className={`fixed inset-0 z-40 bg-slate-900 bg-opacity-50 backdrop-blur-sm ${anumationClass}`}
      ></div>
    </>
  );
};

export default TaskFormModal;
