const { z } = require("zod");
const User = require("../models/user");
const { userIdValidation } = require("../lib/validation/user");
const { expenseIdValidation, expenseSchema } = require("../lib/validation/expense");
const Expense = require("../models/expense");

const addExpense = async (req, res) => {
  try {
    if (req.user.id !== req.params.userId) {
      return res.status(403).json({ message: "forbidden" });
    }

    const userId = userIdValidation.parse(req.params.userId);
    const { title, description, amount, tag, currency } = expenseSchema.parse(req.body);

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    const BASE_CURRENCEY = "ILS";
    let exchangeAmount;
    if (currency !== BASE_CURRENCEY) {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_API_KEY}/pair/${currency}/${BASE_CURRENCEY}/${amount}`
      );

      if (!response.ok) {
        return res.status(400).json({ message: "Failed to convert currency" });
      }
      const data = await response.json();
      exchangeAmount = data.conversion_result;
    }

    const expense = new Expense({
      title,
      description,
      amount,
      tag,
      currency,
      exchangeAmount,
    });

    await expense.save();

    userExists.expenses.push(expense);

    await userExists.save();

    return res.status(201).json({ message: "Expense added successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }
  }
  return res.status(500).json({ message: "Internal server error" });
};

const getExpense = async (req, res) => {
  try {
    if (req.user.id !== req.params.userId) {
      return res.status(403).json({ message: "forbidden" });
    }

    const userId = userIdValidation.parse(req.params.userId);

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    const expenses = await Expense.find({ _id: { $in: userExists.expenses } });

    return res.status(200).json(expenses);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateExpense = async (req, res) => {
  try {
    if (req.user.id !== req.params.userId) {
      return res.status(403).json({ message: "forbidden" });
    }

    const userId = userIdValidation.parse(req.params.userId);
    const expenseId = expenseIdValidation.parse(req.params.expenseId);

    const { title, description, amount, tag, currency } = expenseSchema.parse(req.body);

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!userExists.expenses.includes(expenseId)) {
      return res.status(400).json({ message: "Expense not found" });
    }

     BASE_CURRENCY = "ILS";
    if (currency !== BASE_CURRENCY) {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_API_KEY}/pair/${currency}/${BASE_CURRENCY}/${amount}`
      );
      if (!response.ok) {
        return res.status(400).json({ message: "Failed to convert currency" });
      }
      const data = await response.json();
      exchangeAmount = data.conversion_result;
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
      expenseId,
      {
        title,
        description,
        amount,
        tag,
        currency,
        exchangeAmount: exchangeAmount || (currency === BASE_CURRENCY ? amount : 0), //אם הערך הוא לא מוגדר מחזיר 0
      },
      { new: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    await updatedExpense.save();

    return res.status(200).json({
      message: "Expense updated successfully",
    });
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};


const deleteExpense = async (req, res) => {
  try {
    if (req.user.id !== req.params.userId) {
      return res.status(403).json({ message: "forbidden" });
    }

    const userId = userIdValidation.parse(req.params.userId);
    const expenseId = expenseIdValidation.parse(req.params.expenseId);

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!userExists.expenses.includes(expenseId)) {
      return res.status(404).json({ message: "Expense not found" });
    }

    const deletedExpense = await Expense.findByIdAndDelete(expenseId);
    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    userExists.expenses = userExists.expenses.filter((id) => id.toString() !== expenseId);
    await userExists.save();

    return res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getTotalExpenses = async (req, res) => {
  try {
    if (req.user._id != req.params.userId) {
      return res.status(403).json({ message: "forbidden" });
    }

    const userId = userIdValidation.parse(req.params.userId);

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "user not found" });
    }

    const expenses = await Expense.find({ _id: { $in: userExists.expenses } });

   
    const totalExpenses = expenses.reduce((total, expense) => {
      return total + (expense.exchangeAmount);
    }, 0);

    return res.status(200).json(totalExpenses);
  } catch (error) {
    console.log(error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }
    return res.status(500).json({ message: "internal server error" });
  }
};


module.exports = {
  addExpense,
  getExpense,
  updateExpense,
  deleteExpense,
  getTotalExpenses,
};
