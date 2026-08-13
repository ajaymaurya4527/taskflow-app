import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export const getBoardData = async () => {
  const response = await api.get("/board");
  return response.data.data;
};

export const createTask = async (taskData) => {
  const response = await api.post("/tasks", taskData);
  return response.data.data;
};

export const updateTask = async (id, taskData) => {
  const response = await api.put(`/tasks/${id}`, taskData);
  return response.data.data;
};

export const deleteTask = async (id) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data.data;
};

export const moveTask = async (id, column_id) => {
  const response = await api.patch(`/tasks/${id}/move`, { column_id });
  return response.data.data;
};

export const getTasksCountPerColumn = async () => {
  const response = await api.get("/analytics/tasks-count");
  return response.data.data;
};