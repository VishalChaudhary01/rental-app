import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { prisma } from '../db';
import { ErrorResponse } from '../middlewares/error.middleware';

export const getTenant = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { cognitoId } = req.params;
    const tenant = await prisma.tenant.findUnique({
      where: { cognitoId },
      include: {
        favorites: true,
      },
    });
    if (!tenant) throw new ErrorResponse('Tenant not found', 404);
    res.status(200).json(tenant);
  }
);

export const createTenant = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    console.log('Create tenant');
    const { cognitoId, name, email, phoneNumber } = req.body;

    const tenant = await prisma.tenant.create({
      data: {
        cognitoId,
        name,
        email,
        phoneNumber,
      },
    });
    res.status(201).json(tenant);
  }
);

export const updateTenant = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { cognitoId } = req.params;
    const { name, phoneNumber } = req.body;

    const updatedTenant = await prisma.tenant.update({
      where: { cognitoId },
      data: {
        name,
        phoneNumber,
      },
    });
    res.status(200).json(updatedTenant);
  }
);
