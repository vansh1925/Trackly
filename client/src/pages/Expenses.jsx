import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react';
import { getExpenses } from '../api/expense.api';
import Loading from '../components/Loading';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import Pagination from '../components/Pagination';

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalExpenses, setTotalExpenses] = useState(0);
  
  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  // Fetch expenses on page change
  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getExpenses({ page, limit: 10 });
      setExpenses(res.expenses || []);
      setTotalPages(res.totalpages || 1);
      setTotalExpenses(res.totalExpenses || 0);
    } catch (error) {
      toast.error(error.message || 'Failed to load expenses');
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const handleOpenForm = (expense = null) => {
    setEditingExpense(expense || null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setEditingExpense(null);
    setShowForm(false);
  };

  const handleFormSuccess = async () => {
    setPage(1);
    await fetchExpenses();
  };

  const handleDelete = async (id) => {
    setExpenses(expenses.filter(exp => exp._id !== id));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  if (loading && expenses.length === 0) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Expenses</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Manage and track your expenses</p>
          </div>
          <button
            onClick={() => {
              if (showForm && !editingExpense) {
                handleCloseForm();
              } else {
                handleOpenForm();
              }
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
          >
            <Plus size={18} />
            {showForm && !editingExpense ? 'Cancel' : 'Add Expense'}
          </button>
        </div>

        {/* Form */}
        <ExpenseForm
          isOpen={showForm}
          onClose={handleCloseForm}
          editingExpense={editingExpense}
          onSuccess={handleFormSuccess}
        />

        {/* Total Summary */}
        <div className="mb-8 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
          <p className="text-sm text-slate-600 dark:text-slate-400">Total Expenses</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{totalExpenses.toLocaleString('en-IN')}</p>
        </div>

        {/* Expenses List */}
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
          <ExpenseList
            expenses={expenses}
            loading={loading}
            onEdit={handleOpenForm}
            onDelete={handleDelete}
          />
          {expenses.length > 0 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Expenses;
