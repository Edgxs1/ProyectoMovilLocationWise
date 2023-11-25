const { Router } = require('express');
const controller = require('./controller');
const router = Router();

router.get('/login/:usr_email/:usr_pass', controller.validateUser);
router.get('/loginSession', controller.verifyToken);
router.get('/adminSession/:adm_email', controller.verifyAdmin);

module.exports = router;