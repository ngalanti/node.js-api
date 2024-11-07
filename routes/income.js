const router = require("express").Router();
const {addIncome,getIncomes,updateIncome}=require('../controllers/income');




router.post('/add-income/:userId',addIncome);
router.get('/get-income/:userId',getIncomes);
router.patch('/update-income/:userId',updateIncome);
module.exports = router;
