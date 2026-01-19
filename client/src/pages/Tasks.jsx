import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react';
import { getAllTasks } from '../api/task.api';
import Loading from '../components/Loading';
import TaskForm from '../components/TaskFOrm';
import TaskList from '../components/TaskList';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Fetch all tasks
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllTasks();
      setTasks(res.tasks || []);
    } catch (error) {
      toast.error(error.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleOpenForm = (task = null) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setEditingTask(null);
    setShowForm(false);
  };

  const handleFormSuccess = async () => {
    await fetchTasks();
  };

  const handleDelete = async (id) => {
    setTasks(tasks.filter(task => task._id !== id));
  };

  const handleStatusChange = async (id, completed) => {
    setTasks(tasks.map(task =>
      task._id === id ? { ...task, completed } : task
    ));
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  if (loading && tasks.length === 0) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Tasks</h1>
            <p className="mt-2 text-sm text-slate-600">Manage and track your tasks</p>
          </div>
          <button
            onClick={() => {
              if (showForm && !editingTask) {
                handleCloseForm();
              } else {
                handleOpenForm();
              }
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            <Plus size={18} />
            {showForm && !editingTask ? 'Cancel' : 'Add Task'}
          </button>
        </div>

        {/* Form */}
        <TaskForm
          isOpen={showForm}
          onClose={handleCloseForm}
          editingTask={editingTask}
          onSuccess={handleFormSuccess}
        />

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <p className="text-sm text-slate-600">Total Tasks</p>
            <p className="text-2xl font-bold text-slate-900">{totalCount}</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <p className="text-sm text-slate-600">Completed</p>
            <p className="text-2xl font-bold text-green-600">{completedCount}</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <p className="text-sm text-slate-600">Pending</p>
            <p className="text-2xl font-bold text-orange-600">{totalCount - completedCount}</p>
          </div>
        </div>

        {/* Tasks List */}
        <TaskList
          tasks={tasks}
          onEdit={handleOpenForm}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  );
}

export default Tasks;
