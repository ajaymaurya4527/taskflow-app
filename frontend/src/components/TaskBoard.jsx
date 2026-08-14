import React from "react";
import Column from "./Column";

export default function TaskBoard({ board, priorityFilter, onEdit, onDelete, onMove }) {
  if (!board || !board.columns) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-400">
        Loading task board...
      </div>
    );
  }

  return (
    <main className="p-4 sm:p-6 w-full flex-1 flex flex-col">
      {/* Mobile: Vertical | Desktop: Full-width equal columns */}
      <div className="flex flex-col md:flex-row gap-6 items-stretch w-full flex-1">
        {board.columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            columns={board.columns}
            priorityFilter={priorityFilter}
            onEdit={onEdit}
            onDelete={onDelete}
            onMove={onMove}
          />
        ))}
      </div>
    </main>
  );
}