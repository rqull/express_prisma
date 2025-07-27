import express from "express";
import {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController";

const router = express.Router();

// GET /users - Get all users
router.get("/", getAllUsers);

// POST /users - Create a new user
router.post("/", createUser);

// GET /users/:id - Get user by ID
router.get("/:id", getUserById);

// PUT /users/:id - Update user by ID
router.put("/:id", updateUser);

// DELETE /users/:id - Delete user by ID
router.delete("/:id", deleteUser);

export default router;
