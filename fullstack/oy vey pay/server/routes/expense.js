const express = require("express");
const router = express.Router();

const {
    addExpense,
    getTotalExpenses,
    updateExpense,
    deleteExpense,
    getExpense,
  } = require("../controllers/expense");



router.post('/add-expense/:userId',addExpense);
router.patch('/update-expense/:userId/:expenseId',updateExpense);
router.delete('/delete-expense/:userId/:expenseId',deleteExpense);
router.get("/get-total-expenses/:userId", getTotalExpenses);
router.get("/get-expense/:userId", getExpense);

module.exports = router;

