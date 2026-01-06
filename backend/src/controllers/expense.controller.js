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


// const totalexpense=async(req,res)=>{
  
//   const [period,value]=req.body;
//   if(!period || !value){
//     return res.status(400).json({message:"Period and value are required"});
//   }
//   if(period==="daily"){
    
//     const totalExpense=await Expense.aggregate([
//       { $match: {
//           userId: new mongoose.Types.ObjectId(userId),
//           date: {value}
//         },
//         {
//           $group: {
//             _id: null,
//             totalAmount: { $sum: "$amount" }  
//         }


//       }
//     ])};                   
//   }



export {addexpense,getexpense,deleteexpense,updateexpense,totalexpense};