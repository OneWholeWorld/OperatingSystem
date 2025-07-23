const needService = require("../services/needService");

const createNeed = async (req, res) => {
  try {
    const { goalId, description } = req.body;
    const need = await needService.createNeed(goalId, description);
    res.status(201).json(need);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getNeed = async (req, res) => {
  try {
    const { id } = req.params;
    const need = await needService.getNeedById(id);
    if (!need) {
      return res.status(404).json({ message: "Need not found" });
    }
    res.status(200).json(need);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getNeedsForGoal = async (req, res) => {
  try {
    const { goalId } = req.params;
    const needs = await needService.getNeedsByGoalId(goalId);
    res.status(200).json(needs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createNeed,
  getNeed,
  getNeedsForGoal,
};
