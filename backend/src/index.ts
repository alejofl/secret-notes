import { PrismaClient } from "@prisma/client"
import fastify from "fastify"

const server = fastify()
const prisma = new PrismaClient()

server.get("/ping", async (request, reply) => {
    const notes = await prisma.note.findMany()
    return { notes }
})

server.listen({
    host: process.env.BACKEND_HOST || "0.0.0.0",
    port: +(process.env.BACKEND_PORT || 3000),
}, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})