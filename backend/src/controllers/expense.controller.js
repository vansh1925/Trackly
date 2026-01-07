import { parse } from "dotenv";
import Expense from "../models/expense.model.js";
const addexpense = async (req, res) => {
  try {
    const { title, amount, date, category, note } = req.body;

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
      note,
      userId: req.user._id
    });

    res.status(201).json({ message: "Expense added successfully", expense });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
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
    const page=parseInt(req.query.page)||1;//jo frontend main url main string main page bhejega wo yaha ayega use int main convert karenge
    const limit=parseInt(req.query.limit)||10;//example 10 items per page
    const skip=(page-1)*limit;//skip calculate karenge ki say 3 3age to as ek page pe 10 items hain to 2 page ke liye 20 items skip karne hain
    const expenses=await Expense.find({userId:userid}).skip(skip).limit(limit).sort({createdAt:-1});//latest expense pehle dikhaye
    const totalExpenses=await Expense.countDocuments({userId:userid});//total expenses count karenge
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
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

const updateexpense = async (req, res) => {
  try {
    const { title, amount, date, category, note } = req.body;
    if (!title || !amount || !date || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { title, amount, date, category, note },
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({ message: "Expense updated successfully", expense });
  } catch {
    res.status(500).json({ message: "Server error" });
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

    startDate = new Date(year, month , 1);
    endDate = new Date(year, month+1, 1);
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
    
      const {period,value}=req.body;
      if(!period || !value){
        return res.status(400).json({message:"Period and value are required"});
      }
      const {startDate,endDate}=getDateRange(period,value);
      const totalExpense=await Expense.aggregate([//aggregate() hamesha ARRAY return karta hai
        { $match: {
            userId: mongoose.Types.ObjectId(req.user._id),
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
      const totalAmount=totalExpense.length>0?.totalAmount||0;
  
      res.status(200).json({message:"Total expense fetched successfully",totalAmount});
    } catch (error) {
    res.status(500).json({message:"Server error",error:error.message});
    
  }
};


export {addexpense,getexpense,deleteexpense,updateexpense,totalexpense};