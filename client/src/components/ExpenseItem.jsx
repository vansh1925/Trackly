import { Trash2, Edit2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { deleteExpense } from '../api/expense.api';

function ExpenseItem({ expense, onEdit, onDelete }) {
  const handleDelete = async () => {
    try {
      await deleteExpense(expense._id);
      toast.success('Expense deleted successfully!');
      if (onDelete) onDelete(expense._id);
    } catch (error) {
      toast.error(error.message || 'Failed to delete expense');
    }
  };

  return (
    <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
      <td className="px-6 py-4 text-sm text-slate-900 dark:text-white font-medium">{expense.title}</td>
      <td className="px-6 py-4 text-sm text-slate-900 dark:text-white">₹{expense.amount.toLocaleString('en-IN')}</td>
      <td className="px-6 py-4 text-sm">
        <span className="px-2 py-1 bg-blue-100 dark:bg-slate-800 text-blue-700 dark:text-slate-200 rounded text-xs font-medium">
          {expense.category}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
        {new Date(expense.date).toLocaleDateString('en-IN')}
      </td>
      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 max-w-xs truncate">
        {expense.description || '-'}
      </td>
      <td className="px-6 py-4 text-sm text-right flex justify-end gap-2">
        <button
          onClick={() => onEdit(expense)}
          className="p-2 hover:bg-blue-50 dark:hover:bg-slate-800 text-blue-600 dark:text-slate-200 rounded transition-colors"
          title="Edit"
        >
          <Edit2 size={16} />
        </button>
        <button
          onClick={handleDelete}
          className="p-2 hover:bg-red-50 dark:hover:bg-slate-800 text-red-600 dark:text-red-300 rounded transition-colors"
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      </td>
    </tr>
  );
}

export default ExpenseItem;
