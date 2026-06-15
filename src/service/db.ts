import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma/client.js';
import { appConfig } from '../config.js';

const adapter = new PrismaPg({ connectionString: appConfig.databaseUrl });

export const prisma = new PrismaClient({ adapter });
