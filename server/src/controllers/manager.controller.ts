import { Request, Response } from 'express';
import { wktToGeoJSON } from '@terraformer/wkt';
import expressAsyncHandler from 'express-async-handler';
import { ErrorResponse } from '../middlewares/error.middleware';
import { prisma } from '../db';

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

export const getManagerProperties = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { cognitoId } = req.params;

    const properties = await prisma.property.findMany({
      where: { managerCognitoId: cognitoId },
      include: { location: true },
    });

    const propertiesWithFormattedLocation = await Promise.all(
      properties.map((property) => {
        const coordinatesWKT = property.location
          .coordinates as unknown as string;
        if (!coordinatesWKT) {
          return {
            ...property,
            location: {
              ...property.location,
              coordinates: null,
            },
          };
        }

        try {
          const geoJSON = wktToGeoJSON(coordinatesWKT) as {
            type: string;
            coordinates: [number, number];
          };
          return {
            ...property,
            location: {
              ...property.location,
              coordinates: {
                longitude: geoJSON.coordinates[0],
                latitude: geoJSON.coordinates[1],
              },
            },
          };
        } catch (error) {
          console.error('Error parsing WKT to GeoJSON:', error);
          return {
            ...property,
            location: {
              ...property.location,
              coordinates: null,
            },
          };
        }
      })
    );

    res.status(200).json(propertiesWithFormattedLocation);
  }
);
