import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltipArea = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-lg">
        <p className="text-sm font-medium text-slate-900">{payload[0].payload.day || payload[0].payload.month}</p>
        <p className="text-sm text-slate-600">₹{payload[0].value.toLocaleString('en-IN')}</p>
      </div>
    );
  }
  return null;
};

function ExpenseTrendChart({ data, title = "Daily Expenses", subtitle = "Last 7 days" }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-base font-semibold text-slate-900 mb-4">{title}</h3>
        <div className="h-64 flex items-center justify-center">
          <p className="text-sm text-slate-500">No data available</p>
        </div>
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.amount, 0);
  const avg = total / data.length;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500">Average</p>
          <p className="text-lg font-semibold text-slate-900">₹{avg.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0f172a" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#0f172a" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey={data[0]?.day ? "day" : "month"} 
            tick={{ fill: '#64748b', fontSize: 12 }}
            axisLine={{ stroke: '#cbd5e1' }}
          />
          <YAxis 
            tick={{ fill: '#64748b', fontSize: 12 }}
            axisLine={{ stroke: '#cbd5e1' }}
            tickFormatter={(value) => `₹${value}`}
          />
          <Tooltip content={<CustomTooltipArea />} />
          <Area 
            type="monotone" 
            dataKey="amount" 
            stroke="#0f172a" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorAmount)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpenseTrendChart;
