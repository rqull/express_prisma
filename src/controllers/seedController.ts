import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const seedDatabase = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: "John Doe",
        email: "user@example.com",
        profile: {
          create: {
            bio: "I love Prisma!",
          },
        },
        posts: {
          create: [
            { title: "First Post", content: "Hello World" },
            { title: "Second Post", content: "Belajar Prisma" },
          ],
        },
      },
      include: {
        profile: true,
        posts: true,
      },
    });

    res.status(201).json({
      message: "Database seeded successfully",
      user,
    });
  } catch (error) {
    console.error("Error seeding database:", error);
    res.status(500).json({
      error: "Failed to seed database",
      details: error instanceof Error ? error.message : String(error),
    });
  }
};
