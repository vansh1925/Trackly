import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#0f172a', '#1e293b', '#334155', '#475569', '#64748b', '#94a3b8', '#cbd5e1', '#e2e8f0'];

const CustomTooltipPie = ({ active, payload, total }) => {
  if (active && payload && payload.length) {
    const percent = ((payload[0].value / total) * 100).toFixed(1);
    return (
      <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-lg">
        <p className="text-sm font-medium text-slate-900">{payload[0].name}</p>
        <p className="text-sm text-slate-600">₹{payload[0].value.toLocaleString('en-IN')}</p>
        <p className="text-xs text-slate-500">{percent}% of total</p>
      </div>
    );
  }
  return null;
};

function ExpenseByCategoryChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-base font-semibold text-slate-900 mb-4">Expenses by Category</h3>
        <div className="h-64 flex items-center justify-center">
          <p className="text-sm text-slate-500">No expense data available</p>
        </div>
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900">Expenses by Category</h3>
          <p className="text-sm text-slate-500 mt-1">This month</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500">Total</p>
          <p className="text-lg font-semibold text-slate-900">₹{total.toLocaleString('en-IN')}</p>
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
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltipPie total={total} />} />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value) => (
              <span className="text-sm text-slate-700">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpenseByCategoryChart;
