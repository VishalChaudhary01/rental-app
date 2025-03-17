import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { prisma } from '../db';
import { ErrorResponse } from '../middlewares/error.middleware';

export const getManager = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { cognitoId } = req.params;
    const manager = await prisma.manager.findUnique({
      where: { cognitoId },
    });
    if (!manager) throw new ErrorResponse('Manager not found', 404);
    res.status(200).json(manager);
  }
);

export const createManager = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { cognitoId, name, email, phoneNumber } = req.body;
    const manager = await prisma.manager.create({
      data: {
        cognitoId,
        name,
        email,
        phoneNumber,
      },
    });
    res.status(201).json(manager);
  }
);

export const updateManager = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { cognitoId } = req.params;
    const { name, phoneNumber } = req.body;
    const updatedManger = await prisma.manager.update({
      where: { cognitoId },
      data: {
        name,
        phoneNumber,
      },
    });
    res.status(200).json(updatedManger);
  }
);
