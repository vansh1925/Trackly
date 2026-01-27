import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
        <p className="text-sm font-semibold text-slate-900 dark:text-white mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.name === 'Expense' ? `$${entry.value}` : `${entry.value} min`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const AnalyticsChart = ({ data }) => {
  // Format the data for the chart
  const chartData = data.map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    Expense: item.expense.toFixed(2),
    Productivity: item.productivity
  }));

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
          <XAxis 
            dataKey="date" 
            className="text-xs text-slate-600 dark:text-slate-400"
            stroke="currentColor"
          />
          <YAxis 
            yAxisId="left"
            className="text-xs text-slate-600 dark:text-slate-400"
            stroke="currentColor"
            label={{ value: 'Expense ($)', angle: -90, position: 'insideLeft', className: 'text-slate-600 dark:text-slate-400' }}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            className="text-xs text-slate-600 dark:text-slate-400"
            stroke="currentColor"
            label={{ value: 'Productivity (min)', angle: 90, position: 'insideRight', className: 'text-slate-600 dark:text-slate-400' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="line"
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="Expense"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="Productivity"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ fill: '#10b981', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;
