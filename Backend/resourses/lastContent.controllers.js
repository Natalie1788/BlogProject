import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const getLatestContent = async (req, res) => {
    try {
        const latestPosts = await prisma.post.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            take: 3,
           
        });

        const latestUsers = await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            take: 3,
        });

        res.status(200).json({ latestPosts, latestUsers });
    } catch (error) {
        console.error("Error details:", error);
        res.status(500).json({ error: "Database query failed!" });
    }
};
