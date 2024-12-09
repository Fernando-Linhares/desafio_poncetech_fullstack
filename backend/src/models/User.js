import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({})

const userModel = prisma.user;

export default userModel