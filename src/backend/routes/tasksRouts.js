import express from "express";
import TaskController from "../controllers/tasksController.js";

const router = express.Router();

router
    .get("/api/v1/task", TaskController.getTasks)
    .get("/api/v1/task/:id", TaskController.getTasksById)
    .post("/api/v1/task", TaskController.addTask)
    .put("/api/v1/task/:id", TaskController.updateTask)
    .delete("/api/v1/task/:id", TaskController.deleteTask)

export default router;