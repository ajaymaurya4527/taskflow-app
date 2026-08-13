import React from "react";
import TaskCard from "./TaskCard";

export default function Column({ column, columns, priorityFilter, onEdit, onDelete, onMove }) {
  // Apply Client-Side Filter based on Priority Dropdown
  const filteredTasks = column.tasks.filter((task) => {
    if (priorityFilter === "All") return true;
    return task.priority === priorityFilter;
  });

  return (
    <div className="bg-slate-100/70 p-4 rounded-2xl border border-slate-200/80 flex flex-col gap-4 min-w-[300px] w-full max-w-sm">
      {/* Column Header */}
      <div className="flex justify-between items-center pb-2 border-b border-slate-200">
        <h3 className="font-bold text-slate-700 text-sm tracking-wide uppercase">{column.name}</h3>
        <span className="bg-slate-200 text-slate-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
          {filteredTasks.length}
        </span>
      </div>

      {/* Task List */}
      <div className="flex flex-col gap-3 min-h-[150px]">
        {filteredTasks.length === 0 ? (
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center text-xs text-slate-400">
            No tasks in this column
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              columns={columns}
              onEdit={onEdit}
              onDelete={onDelete}
              onMove={onMove}
            />
          ))
        )}
      </div>
    </div>
  );
}