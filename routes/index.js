const router = require("express").router();

router.use(require('./income'));
router.use(require('./user'));

module.exports=router;

