import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../lib/prisma";
import { getServerSession } from "next-auth/next";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handle(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    if (req.method === "GET") {
      const tasks = await prisma.task.findMany();

      if (tasks.length !== 0) {
        res.json(tasks);
      } else {
        res.status(404).send({ error: "No Task Found" });
      }
    } else if (req.method === "POST") {
      const { name } = req.body;

      if (!name) {
        return res
          .status(400)
          .send({ error: "Missing 'name' value in request body" });
      }

      const result = await prisma.task.create({
        data: {
          name: name,
          author: { connect: { email: session?.user?.email } },
        },
      });

      res.json(result);
    } else {
      res.status(405).send({ error: "Method Not Allowed" });
    }
  } else {
    res.status(401).send({ error: "Valid Credentials Required" });
  }
}
