import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/taskControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const taskRouter = express.Router();

taskRouter.post("/createTask", authMiddleware, createTask);
taskRouter.get("/getAllTasks", authMiddleware, getTasks);
taskRouter.get("/getAllTasks/:id", authMiddleware, getTaskById);
taskRouter.patch("/updateTask/:id", authMiddleware, updateTask);
taskRouter.delete("/deleteTask/:id", authMiddleware, deleteTask);

export default taskRouter;
