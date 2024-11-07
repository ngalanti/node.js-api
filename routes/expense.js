const router = require("express").Router();
const {addExpanse,getExpense,updateExpense,deleteExpense}=require('../controllers/expense');




router.post('/add-expense/:userId',addExpanse);
router.get('/get-expense/:userId',getExpense);
router.patch('/update-expense/:userId/:expenseId',updateExpense);
router.delete('/delete-expense/:userId/:expenseId',deleteExpense);
module.exports = router;
