import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const CustomTooltipBar = ({ active, payload, total }) => {
  if (active && payload && payload.length) {
    const percent = total > 0 ? ((payload[0].value / total) * 100).toFixed(0) : 0;
    return (
      <div className="bg-white dark:bg-slate-900 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 shadow-lg">
        <p className="text-sm font-medium text-slate-900 dark:text-white">{payload[0].payload.name}</p>
        <p className="text-sm text-slate-600 dark:text-slate-300">{payload[0].value} tasks</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">{percent}% of total</p>
      </div>
    );
  }
  return null;
};

function TaskStatusChart({ completed = 0, pending = 0 }) {
  const data = [
    { name: 'Completed', value: completed, color: '#22c55e' },
    { name: 'Pending', value: pending, color: '#60a5fa' }
  ];

  const total = completed + pending;

  if (total === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Task Status</h3>
        <div className="h-64 flex items-center justify-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">No tasks yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">Task Status</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">All tasks</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500 dark:text-slate-400">Total</p>
          <p className="text-lg font-semibold text-slate-900 dark:text-white">{total}</p>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#cbd5e1', fontSize: 12 }}
            axisLine={{ stroke: '#475569' }}
          />
          <YAxis 
            tick={{ fill: '#cbd5e1', fontSize: 12 }}
            axisLine={{ stroke: '#475569' }}
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
          <span className="text-slate-600 dark:text-slate-400">Completion Rate</span>
          <span className="font-semibold text-slate-900 dark:text-white">
            {total > 0 ? ((completed / total) * 100).toFixed(0) : 0}%
          </span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
          <div 
            className="bg-slate-900 dark:bg-slate-700 h-2 rounded-full transition-all duration-500"
            style={{ width: `${total > 0 ? (completed / total) * 100 : 0}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default TaskStatusChart;
