import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../src/config/db.js';
import Expense from '../src/models/expense.model.js';
import Task from '../src/models/task.model.js';

dotenv.config();

// Configurable via env or args (node scripts/seedSampleData.js <userId> [days])
const userId = process.env.SEED_USER_ID || process.argv[2];
const days = Number(process.env.SEED_DAYS || process.argv[3] || 14);
const expensesPerDayMin = Number(process.env.SEED_EXP_MIN || 1);
const expensesPerDayMax = Number(process.env.SEED_EXP_MAX || 3);
const tasksPerDayMin = Number(process.env.SEED_TASK_MIN || 1);
const tasksPerDayMax = Number(process.env.SEED_TASK_MAX || 4);
const highSpendDays = Number(process.env.SEED_HIGH_SPEND_DAYS || 3);
const highSpendMultiplier = Number(process.env.SEED_HIGH_SPEND_MULTIPLIER || 2.5);
const zeroProductivityDays = Number(process.env.SEED_ZERO_PROD_DAYS || 2);

if (!userId) {
  console.error('Please provide a user id via SEED_USER_ID env or as the first argument');
  process.exit(1);
}

const categories = ['Food', 'Transport', 'Health', 'Shopping', 'Bills', 'Entertainment', 'Other'];
const titles = ['Groceries', 'Taxi', 'Snacks', 'Gym', 'Coffee', 'Dinner', 'Electricity', 'Movie', 'Medication', 'Gift'];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const rand = (min, max) => Math.round(Math.random() * (max - min) + min);

// Precompute which day offsets are high-spend or zero-productivity
const chooseOffsets = (count, maxDay) => {
  const set = new Set();
  while (set.size < Math.min(count, maxDay)) {
    set.add(rand(0, maxDay - 1));
  }
  return set;
};

const highSpendOffsets = chooseOffsets(highSpendDays, days);
const zeroProdOffsets = chooseOffsets(zeroProductivityDays, days);

const generateExpenses = () => {
  const items = [];
  for (let offset = 0; offset < days; offset++) {
    const date = new Date();
    date.setDate(date.getDate() - offset);
    date.setHours(rand(8, 20), rand(0, 59), 0, 0);

    const count = rand(expensesPerDayMin, expensesPerDayMax);
    for (let i = 0; i < count; i++) {
      const baseAmount = Number((Math.random() * 80 + 10).toFixed(2));
      const amount = highSpendOffsets.has(offset)
        ? Number((baseAmount * highSpendMultiplier).toFixed(2))
        : baseAmount;

      items.push({
        title: pick(titles),
        amount,
        date,
        category: pick(categories),
        description: highSpendOffsets.has(offset)
          ? 'High-spend day seed'
          : 'Seeded sample expense',
        userId
      });
    }
  }
  return items;
};

const generateTasks = () => {
  const items = [];
  for (let offset = 0; offset < days; offset++) {
    const date = new Date();
    date.setDate(date.getDate() - offset);
    date.setHours(rand(6, 22), rand(0, 59), 0, 0);

    const count = rand(tasksPerDayMin, tasksPerDayMax);
    for (let i = 0; i < count; i++) {
      const zeroProdDay = zeroProdOffsets.has(offset);
      const completed = zeroProdDay ? false : Math.random() > 0.2;
      const duration = zeroProdDay ? 0 : rand(20, 180);

      items.push({
        title: `Task ${offset + 1}-${i + 1}`,
        duration,
        completed,
        date,
        userId
      });
    }
  }
  return items;
};

const run = async () => {
  try {
    await connectDB();

    const expenseDocs = generateExpenses();
    const taskDocs = generateTasks();

    const [expensesResult, tasksResult] = await Promise.all([
      Expense.insertMany(expenseDocs),
      Task.insertMany(taskDocs)
    ]);

    console.log(`Inserted expenses: ${expensesResult.length}`);
    console.log(`Inserted tasks: ${tasksResult.length}`);
    console.log(`High-spend days: ${[...highSpendOffsets].join(', ')}`);
    console.log(`Zero-productivity days: ${[...zeroProdOffsets].join(', ')}`);
  } catch (err) {
    console.error('Seeding failed:', err.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

run();
