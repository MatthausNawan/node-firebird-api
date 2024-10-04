const express = require("express");
const router = express.Router();

const billController = require("../controllers/billController");

router.get("/customer/bills", billController.getBills);
router.get("/customer/bills/:id", billController.getBoleto);
router.get("/customer/bills/download/:id",billController.download);


module.exports = router;
