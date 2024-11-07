const { z } = require("zod");
const User = require('../models/user');
const { expenseIdValidation } = require("../lib/validation/expense");
const { expenseSchema, expenseIdValidation } = require("../lib/validation/expense");
const Expense = require ('../models/expense');

const addExpanse = async (req, res) => {
  try {

    const userId = userIdValidation.parse(req.params.userId);
    const { title,description,amount,tag,currency} = expenseSchema.parse(req.body);

    const userExists = await User.findById(userId);
    if(!userExists){
        return res.status(404).json({message:'user not found'});
    }

    const expense = new Expanse({
        title,
        description,
        amount,
        tag,
        currency,
    })

    await expense.save();

    userExists.expenses.push(expense);

    await userExists.save();

    return res.status(201).json({ message: "expense added sucssefully" });
  } catch (error) {
    console.log(error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }
  }

  return res.status(500).json({ message: "internal server error"});
};

const getExpense = async (req,res) => {
  try {
    const userId =  userIdValidation.parse(req.params.userId);
    
    const userExists = await User.findById(userId);
    if(!userExists){
      return res.status(404).json({message:'User not found'});
    }

    const expenses = await   Expanse.find({_id:{$in:userExists.expenses}});
    return res.status(200).json(expenses);
    
  } catch (error) {
    console.log(error);
  
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }
  }
  return res.status(500).json({ message: "  Internal server error" });
  
}

const updateExpense = async (req,res) => {
try {
  const userId = userIdValidation.parse(req.params.userId);
  const expenseId =expenseIdValidation.parse(req.params.expenseId);      
  const { title,description,amount,tag,currency} = expenseSchema.parse(req.body);

  const userExists = await User.findById(userId);
    if(!userExists){
      return res.status(404).json({message:'User not found'});
    }

    if(!userExists.expenses.includes(expenseId)){
      return res.status(400).json({message:'Expense not found'});
    }

    const updatedExpense = await Expanse.findByIdAndUpdate(expenseId,{
      title,
      description,
      amount,
      tag,
      currency,
    });
    
    if (!updatedExpense) {
      return res.status(404).json({ message: "expense not found" });
    }
    await updatedIncome.save();

    return res.status(200).json({ message: "expense updated successfully" });

} catch (error) {
  console.log(error);

  if (error instanceof z.ZodError) {
    return res.status(400).json({ message: error.errors[0].message });
  }
}
return res.status(500).json({ message: "Internal server error" });
}

const deleteExpense = async (req, res) => {
  try {
    const userId = userIdValidation.parse(req.params.userId);
    const expenseId = expenseIdValidation.parse(req.params.expenseId);

    
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "user not found" });
    }

    
    if (!userExists.expenses.includes(expenseId)) {
      return res.status(404).json({ message: "expense not found" });
    }

    
    const deletedExpense = await Expense.findByIdAndDelete(expenseId);
    if (!deletedExpense) {
      return res.status(404).json({ message: "expense not found" });
    }

    
    userExists.expenses = userExists.expenses.filter(id => id.toString() !== expenseId);
    await userExists.save();

    return res.status(200).json({ message: "expense deleted successfully" });
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ messege: error.errors[0].message });
    }
    return res.status(500).json({ message: "internal server error" });
  }
};


module.exports = {
   addExpanse,
   getExpense,
   updateExpense,
   deleteExpense,
  };