import { useState, useEffect } from 'react'
import { IndianRupee, TrendingUp, Clock, CheckCircle2 } from 'lucide-react';
import api from '../api/axios.js';
import StatCard from '../components/StatCard.jsx';
import Loading from '../components/Loading.jsx';
import ExpenseByCategoryChart from '../components/ExpenseByCategoryChart.jsx';
import ExpenseTrendChart from '../components/ExpenseTrendChart.jsx';
import TaskStatusChart from '../components/TaskStatusChart.jsx';

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (signal) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/dashboard', { signal });
      setData(res.data);
    } catch (err) {
      if (signal?.aborted || err?.name === 'CanceledError' || err?.code === 'ERR_CANCELED') return;
      let message = 'Failed to load dashboard.';
      if (err?.response?.data?.message) {
        message = err.response.data.message;
      } else if (err?.code === 'ERR_NETWORK' || err?.message?.toLowerCase?.().includes('network')) {
        message = 'Network error. Check your internet connection.';
      } else if (err?.message) {
        message = err.message;
      }
      setError(message);
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-lg border border-red-200 dark:border-slate-700 p-6">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-50 dark:bg-slate-800 flex items-center justify-center">
              <span className="text-red-600 dark:text-red-300 text-xl">⚠</span>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">Error Loading Dashboard</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{error}</p>
              <button 
                onClick={() => fetchData()}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const expensesToday = data?.expenses?.today ?? 0;
  const expensesThisMonth = data?.expenses?.thisMonth ?? 0;
  const productivityToday = data?.productivity?.today ?? 0;
  const completedTasks = data?.tasks?.completed ?? 0;
    const pendingTasks = data?.tasks?.pending ?? 0;

    const categoryData = data?.charts?.byCategory || [];
    const dailyTrend = data?.charts?.dailyTrend || [];
    const monthlyTrend = data?.charts?.monthlyTrend || [];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Dashboard</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Overview of your expenses and productivity</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Today's Expense" 
            value={`₹${expensesToday.toLocaleString('en-IN')}`}
            icon={IndianRupee}
          />
          <StatCard 
            title="This Month" 
            value={`₹${expensesThisMonth.toLocaleString('en-IN')}`}
            icon={TrendingUp}
          />
          <StatCard 
            title="Productivity Today" 
            value={`${productivityToday} min`}
            icon={Clock}
          />
          <StatCard 
            title="Completed Tasks" 
            value={completedTasks}
            icon={CheckCircle2}
          />
        </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <ExpenseByCategoryChart data={categoryData} />
            <TaskStatusChart completed={completedTasks} pending={pendingTasks} />
          </div>

          {/* Trend Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <ExpenseTrendChart data={dailyTrend} title="Daily Expenses" subtitle="Last 7 days" />
            <ExpenseTrendChart data={monthlyTrend} title="Monthly Expenses" subtitle="Last 6 months" />
          </div>
      </div>
    </div>
  )
}

export default Dashboard
