import {PrismaClient} from '@prisma/client'
export const Prismaclient = new PrismaClient({
    log: ["query"],
  });