const express = require("express");
const router = express.Router();

const billController = require("../controllers/billController");

router.get("/bill/:id", billController.getBoleto);

module.exports = router;
