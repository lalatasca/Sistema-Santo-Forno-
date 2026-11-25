import { PrismaClient } from '@prisma/client';

// Cria uma única instância do Prisma para ser reaproveitada em todo o back-end
const prisma = new PrismaClient();

export default prisma;
