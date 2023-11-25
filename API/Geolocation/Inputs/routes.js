const { Router } = require('express');
const controller = require('./controller');
const router = Router();

router.get('/customers-cvegeos/:nivelsocioeconomico/:edades/:escolaridad/:situacioneconomica/:situacionescolar/:situacionconyugal/:religion/:limitacion', controller.getSettlementByInputs);
router.get('/customers-cvegeos-density/:nivelsocioeconomico/:edades/:escolaridad/:situacioneconomica/:situacionescolar/:situacionconyugal/:religion/:limitacion', controller.getSettlementByInputsDensity);

module.exports = router;