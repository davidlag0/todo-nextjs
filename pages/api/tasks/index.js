import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handle(req, res) {
  const session = await getSession({ req });
  const token = await getToken({ req, secret });

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
          /*
          Leave this commented out for now. When tests are run with the below line,
          Jest complains about the one-to-many relationship between users and tasks.
          To get around the issue, a separate query is made to the DB during the JWT
          callback of NextAuth in which the authorID is saved thus why it can be used
          here, from the JWT token.

          Reference: https://github.com/prisma/prisma/discussions/11193
          */
          //author: { connect: { email: session?.user?.email } },
          authorId: token.authorId,
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
