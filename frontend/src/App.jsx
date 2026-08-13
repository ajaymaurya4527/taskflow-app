import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import TaskBoard from "./components/TaskBoard";
import TaskModal from "./components/TaskModal";
import * as api from "./services/api";

export default function App() {
  const [board, setBoard] = useState(null);
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Fetch Board Data
  const fetchBoard = async () => {
    try {
      const data = await api.getBoardData();
      setBoard(data);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to load board data";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    fetchBoard();
  }, []);

  // Create or Update Task Handler
  const handleSaveTask = async (taskFormData) => {
    try {
      if (editingTask) {
        await api.updateTask(editingTask.id, taskFormData);
        toast.success("Task updated successfully!");
      } else {
        await api.createTask(taskFormData);
        toast.success("Task created successfully!");
      }
      setIsModalOpen(false);
      setEditingTask(null);
      fetchBoard();
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Operation failed";
      toast.error(errorMessage);
    }
  };

  // Delete Task Handler
  const handleDeleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await api.deleteTask(id);
      toast.success("Task deleted");
      fetchBoard();
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to delete task";
      toast.error(errorMessage);
    }
  };

  // Move Task Handler
  const handleMoveTask = async (id, targetColumnId) => {
    try {
      await api.moveTask(id, targetColumnId);
      toast.success("Task moved successfully");
      fetchBoard();
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to move task";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Toast Notification Container */}
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

      {/* Navigation & Header */}
      <Navbar
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        onOpenCreateModal={() => {
          setEditingTask(null);
          setIsModalOpen(true);
        }}
      />

      {/* Main Kanban Task Board */}
      <TaskBoard
        board={board}
        priorityFilter={priorityFilter}
        onEdit={(task) => {
          setEditingTask(task);
          setIsModalOpen(true);
        }}
        onDelete={handleDeleteTask}
        onMove={handleMoveTask}
      />

      {/* Modal for Creating & Editing Tasks */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSubmit={handleSaveTask}
        initialTask={editingTask}
        columns={board?.columns || []}
      />
    </div>
  );
}