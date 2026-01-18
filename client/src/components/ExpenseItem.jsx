import { Trash2, Edit2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { deleteExpense } from '../api/expense.api';

function ExpenseItem({ expense, onEdit, onDelete }) {
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this expense?')) return;

    try {
      await deleteExpense(expense._id);
      toast.success('Expense deleted successfully!');
      if (onDelete) onDelete(expense._id);
    } catch (error) {
      toast.error(error.message || 'Failed to delete expense');
    }
  };

  return (
    <tr className="border-b border-slate-200 hover:bg-slate-50">
      <td className="px-6 py-4 text-sm text-slate-900 font-medium">{expense.title}</td>
      <td className="px-6 py-4 text-sm text-slate-900">₹{expense.amount.toLocaleString('en-IN')}</td>
      <td className="px-6 py-4 text-sm">
        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
          {expense.category}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-slate-600">
        {new Date(expense.date).toLocaleDateString('en-IN')}
      </td>
      <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">
        {expense.description || '-'}
      </td>
      <td className="px-6 py-4 text-sm text-right flex justify-end gap-2">
        <button
          onClick={() => onEdit(expense)}
          className="p-2 hover:bg-blue-50 text-blue-600 rounded transition-colors"
          title="Edit"
        >
          <Edit2 size={16} />
        </button>
        <button
          onClick={handleDelete}
          className="p-2 hover:bg-red-50 text-red-600 rounded transition-colors"
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      </td>
    </tr>
  );
}

export default ExpenseItem;
