import { useState, useEffect } from 'react';
import { fetchAnalytics } from '../api/analytics.api.js';
import Loading from '../components/Loading.jsx';
import AnalyticsChart from '../components/AnalyticsChart.jsx';
import InsightCard from '../components/InsightCard.jsx';
import { TrendingUp, DollarSign, Clock, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

function Analytics() {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAnalytics();
      setAnalyticsData(data);
    } catch (err) {
      setError(err.message || 'Failed to load analytics');
      toast.error(err.message || 'Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
            <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
            <button
              onClick={loadAnalytics}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Analytics Dashboard
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Insights from your spending and productivity patterns
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <Calendar className="w-4 h-4" />
              <span>Last 7 Days</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {analyticsData?.averages && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                    Average Daily Expense
                  </p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    ${analyticsData.averages.averageExpense.toFixed(2)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                    Average Daily Productivity
                  </p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    {analyticsData.averages.averageProductivity.toFixed(0)} min
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Chart */}
        {analyticsData?.data && analyticsData.data.length > 0 && (
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-6 mb-8">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                Spending vs Productivity Trend
              </h2>
            </div>
            <AnalyticsChart data={analyticsData.data} />
          </div>
        )}

        {/* Insights */}
        {analyticsData?.insights && analyticsData.insights.length > 0 && (
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
              Key Insights
            </h2>
            <div className="space-y-4">
              {analyticsData.insights.map((insight, index) => (
                <InsightCard key={index} insight={insight} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {(!analyticsData?.data || analyticsData.data.length === 0) && (
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-12 text-center">
            <TrendingUp className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              No Data Available
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Start tracking your expenses and tasks to see analytics insights here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Analytics;
