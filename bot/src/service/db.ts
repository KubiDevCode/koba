import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@app/database';
import { appConfig } from '../config.js';

const adapter = new PrismaPg({ connectionString: appConfig.databaseUrl });

export const prisma: PrismaClient = new PrismaClient({ adapter });
