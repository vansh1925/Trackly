import TaskCard from './TaskCard.jsx';

function TaskList({ tasks, onEdit, onDelete, onStatusChange }) {
  if (tasks.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-12 text-center">
        <p className="text-slate-600 dark:text-slate-400">No tasks yet. Create your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}

export default TaskList;