import express from "express";
import UserController from "../controllers/usersController.js";

const router = express.Router();

router
    .get("/api/v1/users", UserController.getUsers)
    .get("/api/v1/users/:id", UserController.getUsersById)
    .post("/api/v1/users", UserController.addUser)
    .put("/api/v1/users/:id", UserController.updateUser)
    .delete("/api/v1/users/:id", UserController.deleteUser)
    export default router;
