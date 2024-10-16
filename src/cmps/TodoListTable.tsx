import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
  SortingState,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { Task } from "../types";
import { DeleteIcon, EditIcon } from "./Icons";

interface Props {
  tasks: Task[];
  onClickEdit: (task: Task) => void;
  deleteTask: (task: Task) => void;
  sorting: SortingState;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
}

const priorityOrder = {
  High: 1,
  Medium: 2,
  Low: 3,
  All: 4,
};

const getRowClassByPriority = (priority: string) => {
  switch (priority) {
    case "High":
      return "text-red-500";
    case "Medium":
      return "text-yellow-300";
    case "Low":
      return "text-green-500 ";
    default:
      return "";
  }
};

const TodoListTable = ({
  tasks,
  onClickEdit,
  deleteTask,
  sorting,
  setSorting,
}: Props) => {
  const columns: ColumnDef<Task>[] = useMemo(
    () => [
      {
        accessorKey: "task",
        header: "Task",
      },
      {
        accessorKey: "assignee",
        header: "Assignee",
      },
      {
        accessorKey: "priority",
        header: "Priority",
        sortingFn: (rowA, rowB) => {
          const priorityA = priorityOrder[rowA.original.priority];
          const priorityB = priorityOrder[rowB.original.priority];
          return priorityA - priorityB;
        },
      },
      {
        accessorKey: "edit",
        header: "",
        cell: ({ row }) => (
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => onClickEdit(row.original)}
            aria-label="Edit Task"
          >
            <EditIcon className="text-xl" />
          </button>
        ),
      },
      {
        accessorKey: "delete",
        header: "",
        cell: ({ row }) => (
          <button
            aria-label="Delete Task"
            className="text-red-500 hover:text-red-700"
            onClick={() => deleteTask(row.original)}
          >
            <DeleteIcon className="text-xl" />
          </button>
        ),
      },
    ],
    [onClickEdit, deleteTask]
  );

  const table = useReactTable({
    data: tasks,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    enableSorting: true,
  });

  const tableClassNames =
    "w-full text-sm text-left rtl:text-right text-gray-500 text-gray-400";
  const thClassNames =
    "text-center px-3 py-2 sm:px-6 sm:py-3 bg-gray-50 bg-gray-800 cursor-pointer text-xl sm:text-l";

  return (
    <div className="w-full relative overflow-x-auto shadow-md rounded-lg">
      {tasks.length === 0 ? (
        <div className="flex justify-center items-center">
          <p>No tasks available</p>
        </div>
      ) : (
        <table className={tableClassNames}>
          <thead className="sticky top-0 bg-gray-800 z-10 border-b-1">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className={"flex flex-col sm:table-row text-2xl"}
              >
                {headerGroup.headers.map((header) => (
                  <th
                    className={`${thClassNames} ${
                      header.column.id === "edit" ||
                      header.column.id === "delete"
                        ? "hidden sm:table-cell"
                        : ""
                    }`}
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted()
                      ? header.column.getIsSorted() === "asc"
                        ? " 🔼"
                        : " 🔽"
                      : null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-gray-900">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={`flex flex-col sm:table-row hover:bg-gray-700 ${getRowClassByPriority(
                  row.original.priority
                )}`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="truncate text-center px-3 py-2 sm:px-6 sm:py-1 font-medium whitespace-nowrap text-wrap"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TodoListTable;
