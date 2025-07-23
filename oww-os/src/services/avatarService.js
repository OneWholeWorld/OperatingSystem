const prisma = require("../utils/prisma");
const { createLog } = require("./logService");

const createAvatar = async (systemId, name) => {
  const avatar = await prisma.avatar.create({
    data: {
      systemId,
      name,
    },
  });
  await createLog(
    "AVATAR_CREATED",
    `Avatar "${name}" created for System ID: ${systemId} with ID: ${avatar.id}`,
    avatar.id,
    { systemId }
  );
  return avatar;
};

const getAvatarById = async (id) => {
  return await prisma.avatar.findUnique({
    where: { id },
    include: { system: true, goals: true },
  });
};

const getAvatarsBySystemId = async (systemId) => {
  return await prisma.avatar.findMany({
    where: { systemId },
    include: { goals: true },
  });
};

module.exports = {
  createAvatar,
  getAvatarById,
  getAvatarsBySystemId,
};
