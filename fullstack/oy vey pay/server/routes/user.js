const {signUp,signIn,logOut,me}=require('../controllers/user');
const auth = require('../middleware/auth');
const router = require("express").Router();



router.post('/sign-up', signUp);
router.post('/sign-in',signIn);
router.post('/log-out',logOut);
router.get('/me',auth,me);
module.exports = router;
