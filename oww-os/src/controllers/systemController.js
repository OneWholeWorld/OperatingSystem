const systemService = require("../services/systemService");

const createSystem = async (req, res) => {
  try {
    const { name, type } = req.body;
    const system = await systemService.createSystem(name, type);
    res.status(201).json(system);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSystem = async (req, res) => {
  try {
    const { id } = req.params;
    const system = await systemService.getSystemById(id);
    if (!system) {
      return res.status(404).json({ message: "System not found" });
    }
    res.status(200).json(system);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllSystems = async (req, res) => {
  try {
    const systems = await systemService.getAllSystems();
    res.status(200).json(systems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSystem,
  getSystem,
  getAllSystems,
};
