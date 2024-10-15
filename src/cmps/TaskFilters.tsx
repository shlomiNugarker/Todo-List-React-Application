import { ResetIcon } from "./Icons";
import { Priority } from "../types";
import { SelectField } from "./SelectField";

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
    "flex justify-center border text-white text-sm rounded-lg w-full p-2.5 bg-gray-600 border-gray-600 placeholder-gray-400";

  return (
    <div className="flex gap-4 mb-4">
      <SelectField
        id={"assigneeFilter"}
        label="Assignee"
        value={assigneeFilter}
        options={availableAssignees}
        handleChange={(e) => setAssigneeFilter(e.target.value)}
        className="flex flex-col text-center"
      />

      <SelectField
        id={"priorityFilter"}
        label="Priority"
        value={priorityFilter}
        options={availablePriorities}
        handleChange={(e) => setPriorityFilter(e.target.value as Priority)}
        className="flex flex-col text-center"
      />

      <div className="flex flex-col text-center justify-between">
        <div className="block mb-2 text-sm font-medium text-gray-300 ">
          Reset:
        </div>
        <button
          className={`${selectClasses} ${
            assigneeFilter === "All" && priorityFilter === "All"
              ? "cursor-not-allowed bg-gray-600 text-gray-500"
              : " text-white bg-blue-800 hover:bg-blue-600"
          }`}
          onClick={resetFilters}
          disabled={assigneeFilter === "All" && priorityFilter === "All"}
        >
          <ResetIcon className="text-xl" />
        </button>
      </div>
    </div>
  );
};
