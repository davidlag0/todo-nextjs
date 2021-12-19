import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const tasks = await prisma.task.findMany();

  if (tasks.length !== 0) {
    res.json(tasks);
  } else {
    res.status(404).send({ error: "No Task Found" });
  }
}
