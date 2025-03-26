import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { prisma } from '../db';
import { ErrorResponse } from '../middlewares/error.middleware';
import { wktToGeoJSON } from '@terraformer/wkt';

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

export const getCurrentResidences = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { cognitoId } = req.params;

    const properties = await prisma.property.findMany({
      where: { tenants: { some: { cognitoId } } },
      include: {
        location: true,
      },
    });

    const residencesWithFormattedLocation = await Promise.all(
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

    res.status(200).json(residencesWithFormattedLocation);
  }
);

export const addFavoriteProperty = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { cognitoId, propertyId } = req.params;

    const tenant = await prisma.tenant.findUnique({
      where: { cognitoId },
      include: { favorites: true },
    });

    if (!tenant) throw new ErrorResponse('Tenant not found', 404);

    const propertyIdNumber = Number(propertyId);
    const existingFavorites = tenant.favorites || [];

    if (!existingFavorites.some((fav) => fav.id === propertyIdNumber)) {
      const updatedTenant = await prisma.tenant.update({
        where: { cognitoId },
        data: {
          favorites: {
            connect: { id: propertyIdNumber },
          },
        },
        include: { favorites: true },
      });
      res.json(updatedTenant);
    } else {
      throw new ErrorResponse('Property already added as favorite', 409);
    }
  }
);

export const removeFavoriteProperty = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { cognitoId, propertyId } = req.params;
    const propertyIdNumber = Number(propertyId);

    const updatedTenant = await prisma.tenant.update({
      where: { cognitoId },
      data: {
        favorites: {
          disconnect: { id: propertyIdNumber },
        },
      },
      include: { favorites: true },
    });

    res.json(updatedTenant);
  }
);
