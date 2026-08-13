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
    <main className="p-6 overflow-x-auto">
      <div className="flex gap-6 items-start justify-start min-w-max pb-4">
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