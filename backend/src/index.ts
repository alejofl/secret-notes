import { PrismaClient } from "@prisma/client"
import fastify from "fastify"
import cors from '@fastify/cors'
import { decrypt, encrypt } from "./services/crypto";

const server = fastify()
const prisma = new PrismaClient()

server.register(cors, {
    origin: "*",
    methods: ["GET", "POST"],
});

server.get("/notes", async (request, reply) => {
    const { orderBy = "title", ascending = true } = request.query as { orderBy?: string, ascending?: boolean };
    if (!["title", "createdAt"].includes(orderBy)) {
        return reply.status(400).send({ error: "Invalid orderBy parameter" });
    }

    const notes = await prisma.note.findMany({
        select: {
            id: true,
            title: true,
            createdAt: true,
        },
        orderBy: {
            [orderBy]: ascending ? "asc" : "desc",
        },
    });

    return notes;
});

server.get("/notes/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const { passphrase } = request.query as { passphrase?: string };
    if (!id || !passphrase) {
        return reply.status(400).send({ error: "Missing id or passphrase" });
    }

    const note = await prisma.note.findUnique({
        where: { id },
    });
    if (!note) {
        return reply.status(404).send({ error: "Note not found" });
    }

    const { encrypted, ...rest } = note;
    const text = decrypt(encrypted, passphrase);

    return { ...rest, text };
});

server.post("/notes", async (request, reply) => {
    const { title, text, passphrase } = request.body as { title: string, text: string, passphrase: string };
    if (!title || !text || !passphrase) {
        return reply.status(400).send({ error: "Missing title, text or passphrase" });
    }

    const encrypted = encrypt(text, passphrase);
    await prisma.note.create({
        data: {
            title,
            encrypted,
        },
    });

    return reply.status(201).send();
});

server.listen({
    host: process.env.BACKEND_HOST || "0.0.0.0",
    port: +(process.env.BACKEND_PORT || 3000),
}, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});