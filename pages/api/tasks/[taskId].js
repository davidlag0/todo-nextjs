import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function handle(req, res) {
  const session = await getSession({ req });

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
