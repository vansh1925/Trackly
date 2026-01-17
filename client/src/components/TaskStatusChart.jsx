import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const CustomTooltipBar = ({ active, payload, total }) => {
  if (active && payload && payload.length) {
    const percent = total > 0 ? ((payload[0].value / total) * 100).toFixed(0) : 0;
    return (
      <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-lg">
        <p className="text-sm font-medium text-slate-900">{payload[0].payload.name}</p>
        <p className="text-sm text-slate-600">{payload[0].value} tasks</p>
        <p className="text-xs text-slate-500">{percent}% of total</p>
      </div>
    );
  }
  return null;
};

function TaskStatusChart({ completed = 0, pending = 0 }) {
  const data = [
    { name: 'Completed', value: completed, color: '#0f172a' },
    { name: 'Pending', value: pending, color: '#cbd5e1' }
  ];

  const total = completed + pending;

  if (total === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-base font-semibold text-slate-900 mb-4">Task Status</h3>
        <div className="h-64 flex items-center justify-center">
          <p className="text-sm text-slate-500">No tasks yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900">Task Status</h3>
          <p className="text-sm text-slate-500 mt-1">All tasks</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500">Total</p>
          <p className="text-lg font-semibold text-slate-900">{total}</p>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#64748b', fontSize: 12 }}
            axisLine={{ stroke: '#cbd5e1' }}
          />
          <YAxis 
            tick={{ fill: '#64748b', fontSize: 12 }}
            axisLine={{ stroke: '#cbd5e1' }}
          />
          <Tooltip content={<CustomTooltipBar total={total} />} />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Progress bar */}
      <div className="mt-6 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Completion Rate</span>
          <span className="font-semibold text-slate-900">
            {total > 0 ? ((completed / total) * 100).toFixed(0) : 0}%
          </span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2">
          <div 
            className="bg-slate-900 h-2 rounded-full transition-all duration-500"
            style={{ width: `${total > 0 ? (completed / total) * 100 : 0}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default TaskStatusChart;
