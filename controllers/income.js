const { z } = require("zod");
const User = require('../models/user');
const { userIdValidation } = require("../lib/validation/user");
const { incomeSchema, incomeIdValidation } = require("../lib/validation/income");
const Income = require ('../models/income');

const addIncome = async (req, res) => {
  try {

    const userId = userIdValidation.parse(req.params.userId);
    const { title,description,amount,tag,currency} = incomeSchema.parse(req.body);

    const userExists = await User.findById(userId);
    if(!userExists){
        return res.status(404).json({message:'user not found'});
    }

    const income = new Income({
        title,
        description,
        amount,
        tag,
        currency,
    })

    await income.save();

    userExists.incomes.push(income);

    await userExists.save();

    return res.status(201).json({ message: "income added sucssefully" });
  } catch (error) {
    console.log(error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }
  }

  return res.status(500).json({ message: "internal server error"});
};

const getIncomes = async (req,res) => {
  try {
    const userId =  userIdValidation.parse(req.params.userId);
    
    const userExists = await User.findById(userId);
    if(!userExists){
      return res.status(404).json({message:'User not found'});
    }

    const incomes = await   Income.find({_id:{$in:userExists.incomes}});
    return res.status(200).json(incomes);
    
  } catch (error) {
    console.log(error);
  
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }
  }
  return res.status(500).json({ message: "  Internal server error" });
  
}

const updateIncome = async (req,res) => {
try {
  const userId = userIdValidation.parse(req.params.userId);
  const incomeId =incomeIdValidation.parse(req.params.incomeId);      
  const { title,description,amount,tag,currency} = incomeSchema.parse(req.body);

  const userExists = await User.findById(userId);
    if(!userExists){
      return res.status(404).json({message:'User not found'});
    }

    if(!userExists.incomes.includes(incomeId)){
      return res.status(400).json({message:'Income not found'});
    }

    const updateIncome = await Income.findByIdAndUpdate(incomeId,{
      title,
      description,
      amount,
      tag,
      currency,
    });
    
} catch (error) {
  console.log(error);

  if (error instanceof z.ZodError) {
    return res.status(400).json({ message: error.errors[0].message });
  }
}
return res.status(500).json({ message: "Internal server error" });
}



module.exports = {
   addIncome,
   getIncomes,
   updateIncome,
  };