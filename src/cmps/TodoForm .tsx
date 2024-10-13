import { useState } from "react";
import { Task } from "../interfaces/Task";

interface Props {
  onAddTask: (t: Task) => void;
}

const TodoForm = ({ onAddTask }: Props) => {
  const [task, setTask] = useState<string>("");
  const [assignee, setAssignee] = useState<string>("");
  const [priority, setPriority] = useState<string>("Low");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTask = {
      task,
      assignee,
      priority,
    };
    onAddTask(newTask);
    setTask("");
    setAssignee("");
    setPriority("Low");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Task:</label>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Assignee:</label>
        <input
          type="text"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Priority:</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TodoForm;
