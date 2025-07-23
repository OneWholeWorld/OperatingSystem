const prisma = require("../utils/prisma");
const { createLog } = require("./logService");

const createNeed = async (goalId, description) => {
  const need = await prisma.need.create({
    data: {
      goalId,
      description,
    },
  });
  await createLog(
    "NEED_CREATED",
    `Need "${description}" created for Goal ID: ${goalId} with ID: ${need.id}`,
    need.id,
    { goalId }
  );
  return need;
};

const getNeedById = async (id) => {
  return await prisma.need.findUnique({
    where: { id },
    include: {
      goal: true,
      mappings: { include: { fulfillerSystem: true, fulfillerAvatar: true } },
    },
  });
};

const getNeedsByGoalId = async (goalId) => {
  return await prisma.need.findMany({
    where: { goalId },
    include: {
      mappings: { include: { fulfillerSystem: true, fulfillerAvatar: true } },
    },
  });
};

module.exports = {
  createNeed,
  getNeedById,
  getNeedsByGoalId,
};
