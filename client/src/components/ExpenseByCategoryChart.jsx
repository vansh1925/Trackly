import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#38bdf8', '#a78bfa', '#22c55e', '#f59e0b', '#f97316', '#ef4444', '#67e8f9', '#c084fc'];
/*
active (boolean) = Is the mouse hovering over a slice?
payload (array) = Data of the hovered slice
total (number) = Total of all expenses (passed from parent)
*/
const CustomTooltipPie = ({ active, payload, total }) => {
  if (active && payload && payload.length) {
    const percent = ((payload[0].value / total) * 100).toFixed(1);
    return (
      <div className="bg-white dark:bg-slate-900 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 shadow-lg">
        <p className="text-sm font-medium text-slate-900 dark:text-white">{payload[0].name}</p>
        <p className="text-sm text-slate-600 dark:text-slate-300">₹{payload[0].value.toLocaleString('en-IN')}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">{percent}% of total</p>
      </div>
    );
  }
  return null;
};

function ExpenseByCategoryChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Expenses by Category</h3>
        <div className="h-64 flex items-center justify-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">No expense data available</p>
        </div>
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">Expenses by Category</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">This month</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500 dark:text-slate-400">Total</p>
          <p className="text-lg font-semibold text-slate-900 dark:text-white">₹{total.toLocaleString('en-IN')}</p>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="amount"
            nameKey="category"
          >
            {data.map(( _, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltipPie total={total} />} />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value) => (
              <span className="text-sm text-slate-700 dark:text-slate-300">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpenseByCategoryChart;
