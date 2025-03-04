import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, email, password } = req.body;
    console.log("req.body", req.body);
    if (!name || !email || !password) {
      res.status(400).json({
        message: "Please provide all required fields",
        status: 400,
      });
      return;
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    console.log("user", user);
    res.status(201).json({
      message: "User created successfully",
      status: 201,
      data: user,
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({
        message: err.message,
        status: 500,
      });
    }
  }
}

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({
      message: "All users",
      status: 200,
      data: users,
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({
        message: err.message,
        status: 500,
      });
    }
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      message: "User found",
      status: 200,
      data: user,
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({
        message: err.message,
        status: 500,
      });
    }
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    console.log("id is", id);
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({
        message: "email name or pwd is missing",
        status: 400,
      });
    }
    if (!id) {
      res.status(400).json({ message: "id is required", status: 400 });
    }
    const newUser = await prisma.user.update({
      where: { id: id },
      data: {
        name,
        email,
        password,
      },
    });
    res.status(201).json({
      message: "User updated",
      status: 201,
      newUser,
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({
        message: err.message,
        status: 500,
      });
    }
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        message: "id is required",
        status: 400,
      });
    }
    const delUser = await prisma.user.delete({
      where: { id: id },
    });
    res.status(200).json({
      message: "user removed",
      status: 200,
      delUser,
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({
        message: err.message,
        status: 500,
      });
    }
  }
}
