import { useState, useEffect, useCallback, useRef } from 'react';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react';
import { getAllTasks } from '../api/task.api.js';
import Loading from '../components/Loading.jsx';
import TaskForm from '../components/TaskForm.jsx';
import TaskList from '../components/TaskList.jsx';
import Pagination from '../components/Pagination.jsx';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const formRef = useRef(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch tasks with pagination
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllTasks({ page, limit: 10 });
      setTasks(res.tasks || []);
      setTotalPages(res.totalpages || 1);
    } catch (error) {
      toast.error(error.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Auto-scroll to form when opening or switching to edit mode
  useEffect(() => {
    if (showForm && formRef.current) {
      setTimeout(() => {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 0);
    }
  }, [showForm, editingTask]);

  const handleOpenForm = (task = null) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setEditingTask(null);
    setShowForm(false);
  };

  const handleFormSuccess = async () => {
    setPage(1);
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

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  if (loading && tasks.length === 0) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Tasks</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Manage and track your tasks</p>
          </div>
          <button
            onClick={() => {
              if (showForm && !editingTask) {
                handleCloseForm();
              } else {
                handleOpenForm();
              }
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
          >
            <Plus size={18} />
            {showForm && !editingTask ? 'Cancel' : 'Add Task'}
          </button>
        </div>

        {/* Form */}
        <TaskForm
          ref={formRef}
          isOpen={showForm}
          onClose={handleCloseForm}
          editingTask={editingTask}
          onSuccess={handleFormSuccess}
        />

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
            <p className="text-sm text-slate-600 dark:text-slate-400">Total Tasks</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalCount}</p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
            <p className="text-sm text-slate-600 dark:text-slate-400">Completed</p>
            <p className="text-2xl font-bold text-green-600">{completedCount}</p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
            <p className="text-sm text-slate-600 dark:text-slate-400">Pending</p>
            <p className="text-2xl font-bold text-orange-600">{totalCount - completedCount}</p>
          </div>
        </div>

        {/* Tasks List */}
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
          <TaskList
            tasks={tasks}
            onEdit={handleOpenForm}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
          {tasks.length > 0 && (
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

export default Tasks;
