import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../lib/prisma";
import { getServerSession } from "next-auth/next";

export default async function handle(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    if (req.method === "GET") {
      const task = await prisma.task.findUnique({
        where: {
          id: Number(req.query.taskId),
        },
      });

      if (task !== null) {
        res.json(task);
      } else {
        res.status(404).send({ error: "Task Not Found" });
      }
    } else if (req.method === "DELETE") {
      const task = await prisma.task.delete({
        where: { id: Number(req.query.taskId) },
      });
      res.json(task);
    } else {
      res.status(405).send({ error: "Method Not Allowed" });
    }
  } else {
    res.status(401).send({ error: "Valid Credentials Required" });
  }
}
