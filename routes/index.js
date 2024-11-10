const express = require("express");
const router = express.Router();
router.use(require('./income'));
router.use(require('./user'));
router.use(require('./expense'));


module.exports=router;

