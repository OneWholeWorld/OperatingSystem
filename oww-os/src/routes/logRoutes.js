const express = require("express");
const logController = require("../controllers/logController");
const router = express.Router();

router.get("/", logController.getAllLogs);

module.exports = router;
