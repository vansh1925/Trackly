import mongoose from "mongoose";
import Expense from "../models/expense.model.js";
import Task from "../models/task.model.js";

// Insight severity thresholds for productivity correlation analysis
const INSIGHT_THRESHOLDS = {
  HIGH_PRODUCTIVITY_DROP: 30,
  MEDIUM_PRODUCTIVITY_DROP: 20,
  LOW_PRODUCTIVITY_DROP: 15,
  PRODUCTIVITY_GAIN: -20
};


const getAnalytics = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);

    // Calculate date range (last 7 days)
    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 6);
    startDate.setHours(0, 0, 0, 0);

    // Fetch expenses for the date range
    const expenses = await Expense.aggregate([
      {
        $match: {
          userId,
          date: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$date" }
          },
          totalExpense: { $sum: "$amount" }
        }
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          expense: "$totalExpense"
        }
      }
    ]);

    // Fetch completed tasks for the date range
    const productivity = await Task.aggregate([
      {
        $match: {
          userId,
          completed: true,
          date: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$date" }
          },
          totalMinutes: { $sum: "$duration" }
        }
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          productivity: "$totalMinutes"
        }
      }
    ]);

    // Merge expenses and productivity data by date
    const dataMap = {};

    expenses.forEach((e) => {
      dataMap[e.date] = {
        date: e.date,
        expense: e.expense,
        productivity: 0
      };
    });

    productivity.forEach((p) => {
      if (!dataMap[p.date]) {
        dataMap[p.date] = {
          date: p.date,
          expense: 0,
          productivity: p.productivity
        };
      } else {
        dataMap[p.date].productivity = p.productivity;
      }
    });

    const dailyData = Object.values(dataMap).sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    // Validate sufficient data availability
    if (dailyData.length === 0) {
      return res.status(200).json({
        message: "No data available for the specified period",
        range: "last_7_days",
        data: [],
        averages: {
          averageExpense: 0,
          averageProductivity: 0
        },
        insights: [
          {
            type: "INSUFFICIENT_DATA",
            severity: "info",
            value: 0,
            message: "Not enough data to generate insights"
          }
        ]
      });
    }

    // Calculate averages
    const averageExpense =
      dailyData.reduce((sum, day) => sum + day.expense, 0) / dailyData.length;
    const averageProductivity =
      dailyData.reduce((sum, day) => sum + day.productivity, 0) /
      dailyData.length;

    // Enrich data with high/low spend and productivity indicators
    const enrichedData = dailyData.map((d) => ({
      ...d,
      isHighSpend: d.expense > averageExpense,
      isLowProductivity: d.productivity < averageProductivity
    }));

    const highSpendDays = enrichedData.filter((d) => d.isHighSpend);
    const normalDays = enrichedData.filter((d) => !d.isHighSpend);

    // Handle insufficient variance in spending patterns
    if (highSpendDays.length < 2 || normalDays.length < 2) {
      return res.status(200).json({
        message: "Analytics data fetched successfully",
        range: "last_7_days",
        data: dailyData,
        averages: {
          averageExpense,
          averageProductivity
        },
        insights: [
          {
            type: "INSUFFICIENT_VARIANCE",
            severity: "info",
            value: 0,
            message:
              "Not enough variation in spending patterns to detect trends"
          }
        ]
      });
    }

    // Calculate average productivity for high and normal spend days
    const avgProductivityHighSpend =
      highSpendDays.reduce((sum, d) => sum + d.productivity, 0) /
        highSpendDays.length || 1;
    const avgProductivityNormal =
      normalDays.reduce((sum, d) => sum + d.productivity, 0) /
        normalDays.length || 1;

    // Calculate correlation: productivity drop percentage on high spend days
    const productivityDropPercentage =
      avgProductivityNormal > 0
        ? ((avgProductivityNormal - avgProductivityHighSpend) /
            avgProductivityNormal) * 100
        : 0;

    // Generate insights based on productivity correlation thresholds
    const insightsCard = [];

    if (productivityDropPercentage >= INSIGHT_THRESHOLDS.HIGH_PRODUCTIVITY_DROP) {
      insightsCard.push({
        type: "PRODUCTIVITY_DROP",
        severity: "high",
        value: Math.round(productivityDropPercentage),
        message: `High spending days reduce productivity by ${Math.round(
          productivityDropPercentage
        )}%`
      });
    } else if (
      productivityDropPercentage >=
      INSIGHT_THRESHOLDS.MEDIUM_PRODUCTIVITY_DROP
    ) {
      insightsCard.push({
        type: "PRODUCTIVITY_DROP",
        severity: "medium",
        value: Math.round(productivityDropPercentage),
        message: `Productivity drops by ${Math.round(
          productivityDropPercentage
        )}% on high spending days`
      });
    } else if (
      productivityDropPercentage >= INSIGHT_THRESHOLDS.LOW_PRODUCTIVITY_DROP
    ) {
      insightsCard.push({
        type: "PRODUCTIVITY_DROP",
        severity: "low",
        value: Math.round(productivityDropPercentage),
        message: "You are slightly less productive on higher spending days"
      });
    } else if (
      productivityDropPercentage <= INSIGHT_THRESHOLDS.PRODUCTIVITY_GAIN
    ) {
      insightsCard.push({
        type: "PRODUCTIVITY_GAIN",
        severity: "medium",
        value: Math.abs(Math.round(productivityDropPercentage)),
        message: "You are more productive on higher spending days"
      });
    } else {
      insightsCard.push({
        type: "NO_STRONG_CORRELATION",
        severity: "info",
        value: 0,
        message:
          "No strong relationship between spending and productivity detected"
      });
    }

    res.status(200).json({
      message: "Analytics data fetched successfully",
      range: "last_7_days",
      data: dailyData,
      averages: {
        averageExpense,
        averageProductivity
      },
      insights: insightsCard
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

export default getAnalytics;
