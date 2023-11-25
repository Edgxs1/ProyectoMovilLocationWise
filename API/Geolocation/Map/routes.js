const { Router } = require('express');
const controller = require('./controller');
const router = Router();

router.AppendTrailingSlash = true;
router.get('/', controller.GetAllSettlements);
router.get('/:cvegeo', controller.GetAgebByCvegeo);
router.get('/getsimilarsettlements/:lw_economiapred/:pobtotSTART/:pobtotEND/:graproesSTART/:graproesEND/:lw_edpromSTART/:lw_edpromEND', controller.GetSimilarSettlements);

module.exports = router;