import React from "react";
import { Edit2, Trash2, ArrowRightLeft } from "lucide-react";

const priorityColors = {
  High: "bg-red-100 text-red-700 border-red-200",
  Medium: "bg-amber-100 text-amber-700 border-amber-200",
  Low: "bg-emerald-100 text-emerald-700 border-emerald-200"
};

export default function TaskCard({ task, columns, onEdit, onDelete, onMove }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col gap-3">
      <div className="flex justify-between items-start gap-2">
        <h4 className="font-semibold text-slate-800 text-base leading-snug">{task.title}</h4>
        <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${priorityColors[task.priority] || priorityColors.Medium}`}>
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="text-xs text-slate-500 line-clamp-2">{task.description}</p>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-1">
        {/* Task Movement Controls */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <ArrowRightLeft size={14} />
          <select
            value={task.column_id}
            onChange={(e) => onMove(task.id, Number(e.target.value))}
            className="bg-slate-100 border border-slate-200 rounded px-2 py-1 text-xs text-slate-700 font-medium cursor-pointer outline-none focus:border-blue-500"
          >
            {columns.map((col) => (
              <option key={col.id} value={col.id}>
                Move to {col.name}
              </option>
            ))}
          </select>
        </div>

        {/* Edit / Delete Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 hover:bg-slate-100 text-slate-600 rounded transition-colors"
            title="Edit Task"
          >
            <Edit2 size={14} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1.5 hover:bg-red-50 text-red-600 rounded transition-colors"
            title="Delete Task"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}