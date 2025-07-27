import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        profile: true,
        posts: true,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      error: "Failed to fetch users",
      details: error instanceof Error ? error.message : String(error),
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, bio } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        profile: bio
          ? {
              create: {
                bio,
              },
            }
          : undefined,
      },
      include: {
        profile: true,
        posts: true,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      error: "Failed to create user",
      details: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
        posts: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      error: "Failed to fetch user",
      details: error instanceof Error ? error.message : String(error),
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, bio } = req.body;

    const user = await prisma.user.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(bio && {
          profile: {
            upsert: {
              create: { bio },
              update: { bio },
            },
          },
        }),
      },
      include: {
        profile: true,
        posts: true,
      },
    });

    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      error: "Failed to update user",
      details: error instanceof Error ? error.message : String(error),
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.user.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      error: "Failed to delete user",
      details: error instanceof Error ? error.message : String(error),
    });
  }
};
