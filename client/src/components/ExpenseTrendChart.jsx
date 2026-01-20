import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltipArea = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-900 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 shadow-lg">
        <p className="text-sm font-medium text-slate-900 dark:text-white">{payload[0].payload.day || payload[0].payload.month}</p>
        <p className="text-sm text-slate-600 dark:text-slate-300">₹{payload[0].value.toLocaleString('en-IN')}</p>
      </div>
    );
  }
  return null;
};

function ExpenseTrendChart({ data, title = "Daily Expenses", subtitle = "Last 7 days" }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">{title}</h3>
        <div className="h-64 flex items-center justify-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">No data available</p>
        </div>
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.amount, 0);
  const avg = total / data.length;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">{title}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500 dark:text-slate-400">Average</p>
          <p className="text-lg font-semibold text-slate-900 dark:text-white">₹{avg.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.35}/>
              <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.05}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis 
            dataKey={data[0]?.day ? "day" : "month"} 
            tick={{ fill: '#cbd5e1', fontSize: 12 }}
            axisLine={{ stroke: '#475569' }}
          />
          <YAxis 
            tick={{ fill: '#cbd5e1', fontSize: 12 }}
            axisLine={{ stroke: '#475569' }}
            tickFormatter={(value) => `₹${value}`}
          />
          <Tooltip content={<CustomTooltipArea />} />
          <Area 
            type="monotone" 
            dataKey="amount" 
            stroke="#38bdf8" 
            strokeWidth={2.2}
            fillOpacity={0.9} 
            fill="url(#colorAmount)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpenseTrendChart;
