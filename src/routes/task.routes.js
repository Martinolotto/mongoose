import { Router } from "express";

import {
  createTask,
  getAllTasks,
  getTasksById,
  //   updateUser,
  //   deleteUser,
} from "../controllers/task.controller.js";


export const taskRouter = Router();

taskRouter.post("/task", createTask);

taskRouter.get("/task", getAllTasks);

taskRouter.get("/task/:id", getTasksById)
