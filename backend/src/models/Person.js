import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({})

const personModel = prisma.person;

export default personModel