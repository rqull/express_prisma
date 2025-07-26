import express from "express";
import { getAllUsers } from "../controllers/userController";

const app = express();
const router = express.Router();

router.get("/", getAllUsers);


export default router;
