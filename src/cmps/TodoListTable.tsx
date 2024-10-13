import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { Task } from "../interfaces/Task";

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
];

interface Props {
  tasks: Task[];
}

const TodoListTable = ({ tasks }: Props) => {
  const table = useReactTable({
    data: tasks,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
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
  );
};

export default TodoListTable;
