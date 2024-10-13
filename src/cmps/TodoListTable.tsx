import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
  SortingState,
} from "@tanstack/react-table";
import { Task } from "../interfaces/Task";
import { useState } from "react";

interface Props {
  tasks: Task[];
  handleEdit: (task: Task) => void;
  handleDelete: (task: Task) => void;
}

const TodoListTable = ({ tasks, handleEdit, handleDelete }: Props) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: ColumnDef<Task>[] = [
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
    },
    {
      header: "Edit",
      cell: ({ row }) => (
        <button onClick={() => handleEdit(row.original)}>Edit</button>
      ),
    },
    {
      header: "Delete",
      cell: ({ row }) => (
        <button onClick={() => handleDelete(row.original)}>Delete</button>
      ),
    },
  ];

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

  return (
    <>
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
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
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default TodoListTable;
