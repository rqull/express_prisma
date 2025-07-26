import { PrismaClient } from "../generated/prisma";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export { getAllUsers };
