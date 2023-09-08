const router = require("express").Router();
const scrapController = require("../controllers/scrapController");

const { getCna, getLtn, getltnMilitary, getUdn } = scrapController;

router.get("/cna/:id", getCna);
router.get("/ltn/:id", getLtn);
router.get("/ltn/ltn-military/:id", getltnMilitary);
router.get("/udn/:id", getUdn);

module.exports = router;
