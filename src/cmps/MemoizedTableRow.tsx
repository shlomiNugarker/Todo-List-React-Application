import React from "react";
import { flexRender, Row } from "@tanstack/react-table";
import { Task } from "../types";

interface Props {
  row: Row<Task>;
}

const MemoizedTableRow: React.FC<Props> = React.memo(({ row }) => {
  return (
    <tr className="flex flex-col sm:table-row hover:bg-gray-700 text-gray-400 ">
      {row.getVisibleCells().map((cell) => (
        <td
          key={cell.id}
          className="truncate text-center px-3 py-2  sm:px-6 sm:py-1 font-medium whitespace-nowrap  text-wrap"
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
});

export default MemoizedTableRow;
