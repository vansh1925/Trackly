import { useState } from 'react';
import toast from 'react-hot-toast';
import { addExpense, updateExpense } from '../api/expense.api.js';

const CATEGORIES = ['Food', 'Transport', 'Entertainment', 'Utilities', 'Shopping', 'Health', 'Other'];

function ExpenseForm({ isOpen, onClose, editingExpense, onSuccess }) {
  const [formData, setFormData] = useState(
    editingExpense ? {
      title: editingExpense.title,
      amount: editingExpense.amount,
      date: editingExpense.date.split('T')[0],
      category: editingExpense.category,
      description: editingExpense.description || ''
    } : {
      title: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      category: 'Food',
      description: ''
    }
  );
  const [submitting, setSubmitting] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || '' : value
    }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      category: 'Food',
      description: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount || !formData.date || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setSubmitting(true);
    try {
      if (editingExpense) {
        await updateExpense(editingExpense._id, formData);
        toast.success('Expense updated successfully!');
      } else {
        await addExpense(formData);
        toast.success('Expense added successfully!');
      }
      resetForm();
      onClose();
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error(error.message || 'Failed to save expense');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="mb-8 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
        {editingExpense ? 'Edit Expense' : 'Add New Expense'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleFormChange}
              placeholder="e.g., Grocery shopping"
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-slate-600"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Amount (₹) *</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleFormChange}
              placeholder="0.00"
              step="0.01"
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-slate-600"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Date *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-slate-600"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-slate-600"
              required
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleFormChange}
            placeholder="Optional notes"
            rows="2"
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-slate-600"
          />
        </div>
        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-slate-700 dark:hover:bg-slate-600 disabled:bg-slate-400 text-white rounded-lg font-medium transition-colors"
          >
            {submitting ? 'Saving...' : (editingExpense ? 'Update' : 'Add')}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ExpenseForm;
