const prisma = require("../utils/prisma");

const createLog = async (
  type,
  description,
  entityId = null,
  metadata = null
) => {
  try {
    const log = await prisma.log.create({
      data: {
        type,
        description,
        entityId,
        metadata: metadata ? JSON.stringify(metadata) : undefined,
      },
    });
    return log;
  } catch (error) {
    console.error("Error creating log:", error);
  }
};

const getAllLogs = async () => {
  return await prisma.log.findMany({
    orderBy: {
      timestamp: "desc",
    },
  });
};

module.exports = {
  createLog,
  getAllLogs,
};
