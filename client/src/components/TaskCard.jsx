import React from 'react';
import { Trash2, Edit2, CheckCircle, Circle } from 'lucide-react';
import toast from 'react-hot-toast';
import { deleteTask, toggleTaskStatus } from '../api/task.api';

function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await deleteTask(task._id);
      toast.success('Task deleted successfully!');
      if (onDelete) onDelete(task._id);
    } catch (error) {
      toast.error(error.message || 'Failed to delete task');
    }
  };

  const handleStatusToggle = async () => {
    try {
      await toggleTaskStatus(task._id);
      toast.success(!task.completed ? 'Task marked as complete' : 'Task marked as incomplete');
      if (onStatusChange) onStatusChange(task._id, !task.completed);
    } catch (error) {
      toast.error(error.message || 'Failed to update task status');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          <button
            onClick={handleStatusToggle}
            className="mt-1 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors flex-shrink-0"
            title={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {task.completed ? (
              <CheckCircle size={20} className="text-green-600" />
            ) : (
              <Circle size={20} />
            )}
          </button>
          
          <div className="flex-1">
            <h3 className={`font-semibold text-slate-900 dark:text-white ${task.completed ? 'line-through text-slate-500 dark:text-slate-500' : ''}`}>
              {task.title}
            </h3>
            <div className="flex items-center gap-4 mt-2 text-sm text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <span className="font-medium">Duration:</span>
                {task.duration} min
              </span>
              <span className="flex items-center gap-1">
                <span className="font-medium">Date:</span>
                {new Date(task.date).toLocaleDateString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => onEdit(task)}
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
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
