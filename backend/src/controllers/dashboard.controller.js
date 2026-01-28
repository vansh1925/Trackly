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

    // Last 7 days for trend chart
    const last7Days = new Date(startdate);
    last7Days.setDate(last7Days.getDate() - 6);

    // Last 6 months for monthly chart
    const last6Months = new Date(startdate);
    last6Months.setMonth(last6Months.getMonth() - 5);
    last6Months.setDate(1);

    // ---- Build all queries to run in parallel ----
    const totalExpensesTodayQ = Expense.aggregate([
      { $match: { userId, date: { $gte: startdate, $lt: enddate } } },
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
    ]);

    const totalExpensesThisMonthQ = Expense.aggregate([
      { $match: { userId, date: { $gte: startmonth, $lt: endmonth } } },
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
    ]);

    const expensesByCategoryQ = Expense.aggregate([
      { $match: { userId, date: { $gte: startmonth, $lt: endmonth } } },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
          count: { $sum: 1 }
        }
      },
      { $sort: { total: -1 } },
      { $limit: 8 }
    ]);

    const dailyExpensesQ = Expense.aggregate([
      { $match: { userId, date: { $gte: last7Days, $lt: enddate } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const monthlyExpensesQ = Expense.aggregate([
      { $match: { userId, date: { $gte: last6Months } } },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" }
          },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    const totalProductivityTodayQ = Task.aggregate([
      {
        $match: {
          userId,
          completed: true,
          date: { $gte: startdate, $lt: enddate }
        }
      },
      { $group: { _id: null, totalDuration: { $sum: "$duration" } } }
    ]);

    const taskstatusQ = Task.aggregate([
      { $match: { userId } },
      { $group: { _id: "$completed", totalTask: { $sum: 1 } } }
    ]);

    const [
      totalExpensesToday,
      totalExpensesThisMonth,
      expensesByCategory,
      dailyExpenses,
      monthlyExpenses,
      totalProductivityToday,
      taskstatus
    ] = await Promise.all([
      totalExpensesTodayQ,
      totalExpensesThisMonthQ,
      expensesByCategoryQ,
      dailyExpensesQ,
      monthlyExpensesQ,
      totalProductivityTodayQ,
      taskstatusQ
    ]);

    let completed = 0;
    let pending = 0;
    taskstatus.forEach(t => {
      if (t._id === true) completed = t.totalTask;
      else pending = t.totalTask;
    });

    // Format category data
    const categoryData = expensesByCategory.map(item => ({
      category: item._id || "Uncategorized",
      amount: item.total,
      count: item.count
    }));

    // Format daily trend data (fill gaps for missing days)
    const dailyTrend = [];
    const dailyMap = new Map(dailyExpenses.map(d => [d._id, d.total]));
    for (let i = 6; i >= 0; i--) {
      const d = new Date(startdate);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      dailyTrend.push({
        date: dateStr,
        day: dayName,
        amount: dailyMap.get(dateStr) || 0
      });
    }

    // Format monthly data
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthlyTrend = monthlyExpenses.map(item => ({
      month: `${monthNames[item._id.month - 1]} ${item._id.year}`,
      amount: item.total
    }));

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
      },
      charts: {
        byCategory: categoryData,
        dailyTrend,
        monthlyTrend
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default dashboard;
