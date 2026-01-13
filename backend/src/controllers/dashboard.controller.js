import mongoose from "mongoose";
import Expense from "../models/expense.model.js";
import Task from "../models/task.model.js";

const dashboard = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);

    // ---- DATE SETUP ----
    const startdate = new Date();
    startdate.setHours(0, 0, 0, 0);

    const enddate = new Date(startdate);
    enddate.setDate(enddate.getDate() + 1);

    const startmonth = new Date(startdate.getFullYear(), startdate.getMonth(), 1);
    const endmonth = new Date(startdate.getFullYear(), startdate.getMonth() + 1, 1);

    // ---- EXPENSES ----
    const totalExpensesToday = await Expense.aggregate([
      { $match: { userId, date: { $gte: startdate, $lt: enddate } } },
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
    ]);

    const totalExpensesThisMonth = await Expense.aggregate([
      { $match: { userId, date: { $gte: startmonth, $lt: endmonth } } },
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
    ]);

    // ---- PRODUCTIVITY ----
    const totalProductivityToday = await Task.aggregate([
      {
        $match: {
          userId,
          completed: true,
          date: { $gte: startdate, $lt: enddate }
        }
      },
      { $group: { _id: null, totalDuration: { $sum: "$duration" } } }
    ]);

    // ---- TASK STATUS ----
    const taskstatus = await Task.aggregate([
      { $match: { userId } },
      { $group: { _id: "$completed", totalTask: { $sum: 1 } } }
    ]);

    let completed = 0;
    let pending = 0;

    taskstatus.forEach(t => {
      if (t._id === true) completed = t.totalTask;
      else pending = t.totalTask;
    });

    res.status(200).json({
      message: "Dashboard data fetched successfully",
      expenses: {
        today: totalExpensesToday[0]?.totalAmount || 0,
        thisMonth: totalExpensesThisMonth[0]?.totalAmount || 0
      },
      productivity: {
        today: totalProductivityToday[0]?.totalDuration || 0
      },
      tasks: {
        completed,
        pending
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default dashboard;
