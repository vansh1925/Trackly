import ExpenseItem from './ExpenseItem.jsx';

function ExpenseList({ expenses, loading, onEdit, onDelete }) {
  if (loading) {
    return (
      <div className="p-6 text-center text-slate-600 dark:text-slate-400">Loading expenses...</div>
    );
  }

  if (expenses.length === 0) {
    return (
      <div className="p-6 text-center text-slate-600 dark:text-slate-400">
        <p className="text-lg font-medium mb-2 text-slate-900 dark:text-white">No expenses yet</p>
        <p className="text-sm">Click "Add Expense" to get started</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">Title</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">Amount</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">Category</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">Date</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">Description</th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-slate-900 dark:text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(expense => (
            <ExpenseItem
              key={expense._id}
              expense={expense}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseList;
