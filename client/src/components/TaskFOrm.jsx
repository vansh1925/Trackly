import { useState } from 'react';
import toast from 'react-hot-toast';
import { addTask, updateTask } from '../api/task.api';

function TaskForm({ isOpen, onClose, editingTask, onSuccess }) {
  const [formData, setFormData] = useState({
    title: editingTask?.title || '',
    duration: editingTask?.duration || '',
    date: editingTask?.date 
      ? new Date(editingTask.date).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.duration) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const taskData = {
        title: formData.title,
        duration: parseInt(formData.duration),
        date: formData.date
      };

      if (editingTask) {
        await updateTask(editingTask._id, taskData);
        toast.success('Task updated successfully!');
      } else {
        await addTask(taskData);
        toast.success('Task added successfully!');
      }

      onClose();
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error(error.message || 'Failed to save task');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="mb-8 bg-white rounded-lg border border-slate-200 p-6">
      <h2 className="text-xl font-semibold text-slate-900 mb-4">
        {editingTask ? 'Edit Task' : 'Add New Task'}
      </h2>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Task Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter task title"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Duration (minutes) *
            </label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              placeholder="Enter duration in minutes"
              min="1"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Date *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            {editingTask ? 'Update Task' : 'Add Task'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
