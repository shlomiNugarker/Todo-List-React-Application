import { Priority } from "../types";

interface Props {
  assigneeFilter: string;
  setAssigneeFilter: React.Dispatch<React.SetStateAction<string>>;
  availableAssignees: string[];
  priorityFilter: Priority;
  setPriorityFilter: React.Dispatch<React.SetStateAction<Priority>>;
  availablePriorities: string[];
  resetFilters: () => void;
}

export const TaskFilters = ({
  assigneeFilter,
  setAssigneeFilter,
  availableAssignees,
  priorityFilter,
  setPriorityFilter,
  availablePriorities,
  resetFilters,
}: Props) => {
  const selectClasses =
    "flex justify-center border  text-white text-sm rounded-lg w-full p-2.5 bg-gray-600 border-gray-600 placeholder-gray-400";

  return (
    <div className="flex gap-4 mb-4">
      <div className="flex flex-col text-center">
        <label
          htmlFor="assigneeFilter"
          className=" font-medium text-gray-400 mb-1 text-xl"
        >
          Assignee
        </label>
        <select
          id="assigneeFilter"
          aria-label="Filter by Assignee"
          className={
            "flex justify-center border  text-white text-sm rounded-lg   w-full p-2.5 bg-gray-600 border-gray-600 placeholder-gray-400"
          }
          value={assigneeFilter}
          onChange={(e) => setAssigneeFilter(e.target.value)}
        >
          {availableAssignees.map((assignee) => (
            <option
              key={assignee}
              value={assignee}
              className="hover:bg-blue-600"
            >
              {assignee}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col text-center">
        <label
          htmlFor="priorityFilter"
          className="font-medium text-gray-400 mb-1 text-xl"
        >
          Priority
        </label>
        <select
          id="priorityFilter"
          aria-label="Filter by Priority"
          className={selectClasses}
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value as Priority)}
        >
          {availablePriorities.map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col text-center">
        <div className="font-medium text-gray-400 mb-1 text-xl">Reset</div>
        <button
          className={`${selectClasses} ${
            assigneeFilter === "All" && priorityFilter === "All"
              ? "cursor-not-allowed bg-gray-600 text-gray-500"
              : " text-white bg-blue-800 hover:bg-blue-600"
          }`}
          onClick={resetFilters}
          disabled={assigneeFilter === "All" && priorityFilter === "All"}
        >
          <svg
            className="text-xl"
            viewBox="0 0 21 21"
            fill="currentColor"
            height="1em"
            width="1em"
          >
            <g
              fill="none"
              fillRule="evenodd"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3.578 6.487A8 8 0 112.5 10.5M7.5 6.5h-4v-4" />
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
};
