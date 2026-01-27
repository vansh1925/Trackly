import Expense from "../models/expense.model.js";
import mongoose from "mongoose";
const addexpense = async (req, res) => {
  try {
    const { title, amount, date, category, description } = req.body;

    if (!title || !amount || !date || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingExpense = await Expense.findOne({
      title,
      amount,
      date,
      category,
      userId: req.user._id
    });

    if (existingExpense) {
      return res.status(400).json({ message: "Expense already exists" });
    }

    const expense = await Expense.create({
      title,
      amount,
      date,
      category,
      description,
      userId: req.user._id
    });

    res.status(201).json({ message: "Expense added successfully", expense });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getexpense=async(req,res)=>{
    
 try {
   const expense=await Expense.findOne({_id:req.params.id,userId:req.user._id});
   if(!expense){
     return res.status(404).json({message:"Expense not found"});
   }
   res.status(200).json({message:"Expense fetched successfully",expense});
 } catch (error) {
    res.status(500).json({message:"Server error",error:error.message});
  
 }
}
const getallexpenses=async(req,res)=>{
  try {
    const userid=req.user._id;
    const page=parseInt(req.query.page)||1;
    const limit=parseInt(req.query.limit)||10;
    const skip=(page-1)*limit;
    const expenses=await Expense.find({userId:userid}).skip(skip).limit(limit).sort({createdAt:-1});
    const totalExpenses=await Expense.countDocuments({userId:userid});
    const totalpages=Math.ceil(totalExpenses/limit);
    res.status(200).json({message:"Expenses fetched successfully",expenses,page,totalpages,totalExpenses});
  } catch (error) {
    res.status(500).json({message:"Server error",error:error.message});
    
  }
}

const deleteexpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateexpense = async (req, res) => {
  try {
    const { title, amount, date, category, description } = req.body;
    if (!title || !amount || !date || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { title, amount, date, category, description },
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({ message: "Expense updated successfully", expense });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getDateRange=(period,value)=>{
  let startDate, endDate;

  if (period === "daily") {
    startDate = new Date(value);
    startDate.setHours(0, 0, 0, 0);

    endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);
  }

  if (period === "monthly") {
    const [year, month] = value.split("-");

    startDate = new Date(year, month-1 , 1);//AS MONTH 0 INDEXED HOTA HAI JS MEIN
    endDate = new Date(year, month , 1);
    //if month=01 (jan) , THEN INDEX=0
    endDate = new Date(year, month, 1);
  }

  if (period === "yearly") {
    const year = Number(value);

    startDate = new Date(year, 0, 1);
    endDate = new Date(year + 1, 0, 1);
  }
  return { startDate, endDate };
}


const totalexpense=async(req,res)=>{
  try {
    
      const period=req.query.period;//daily,monthly,yearly
      const value=req.query.value;//for daily->2024-01-10 , for monthly->2024-01 , for yearly->2024
      if(!period || !value){
        return res.status(400).json({message:"Period and value are required"});
      }
      const {startDate,endDate}=getDateRange(period,value);
      const totalExpense=await Expense.aggregate([//aggregate() hamesha ARRAY return karta hai
        { $match: {
            userId: new mongoose.Types.ObjectId(req.user._id),
            date: { $gte: startDate, $lt: endDate }//$gte = Greater Than or Equal to (>=) , $lt = Less Than (<)
          }
        },
        {
          $group: {
            _id: null,//sab documents ko ek hi group bana do as hame category wise group ni krna ie group by sql vala
            totalAmount: { $sum: "$amount" }  
          }
  
  
        }
      ]); //[  { _id: null, totalAmount: 2500 }] asia kuch result hoga
      const totalAmount=totalExpense.length>0?totalExpense[0].totalAmount : 0||0;
  
      res.status(200).json({message:"Total expense fetched successfully",totalAmount});
    } catch (error) {
    res.status(500).json({message:"Server error",error:error.message});
    
  }
};


export {addexpense,getexpense,getallexpenses,deleteexpense,updateexpense,totalexpense};