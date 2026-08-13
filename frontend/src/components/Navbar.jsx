import React from "react";
import { Filter, Plus } from "lucide-react";

export default function Navbar({ priorityFilter, setPriorityFilter, onOpenCreateModal }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="flex items-center gap-2">
        <div className="bg-blue-600 text-white font-bold p-2 rounded-lg text-lg">TF</div>
        <h1 className="text-xl font-bold text-slate-800">TaskFlow Board</h1>
      </div>

      <div className="flex items-center gap-4 w-full sm:w-auto">
        {/* Priority Filter */}
        <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg w-full sm:w-auto">
          <Filter size={16} className="text-slate-500" />
          <span className="text-sm font-medium text-slate-600">Priority:</span>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bg-transparent text-sm font-semibold text-slate-800 outline-none cursor-pointer"
          >
            <option value="All">All Tasks</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Create Task Button */}
        <button
          onClick={onOpenCreateModal}
          className="flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors cursor-pointer whitespace-nowrap"
        >
          <Plus size={18} />
          Add Task
        </button>
      </div>
    </header>
  );
}