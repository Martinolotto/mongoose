import { Router } from "express";

import {
  createRole,
  getAllRoles,
  getRoleById,
} from "../controllers/role.controller.js";

export const roleRouter = Router();

roleRouter.post("/role", createRole);

roleRouter.get("/role", getAllRoles);

roleRouter.get("/role/:id", getRoleById);