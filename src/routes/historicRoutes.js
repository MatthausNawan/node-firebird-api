const express = require("express");
const router = express.Router();

const historicController = require("../controllers/historicController");

router.get('/customer/historic',historicController.getHistoric);

module.exports = router;