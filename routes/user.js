const {signUp,signIn}=require('../controllers/user');

const router = require("express").Router();



router.post('/sign-up', signUp);
router.post('/sign-in',signIn)

module.exports = router;
