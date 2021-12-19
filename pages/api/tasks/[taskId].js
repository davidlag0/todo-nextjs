import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
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
}
