import dotenv from 'dotenv';
dotenv.config();

export const { PORT, NODE_ENV, DATABASE_URL } = process.env;
