import React from 'react';

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-slate-200 dark:border-slate-700 border-t-slate-600 dark:border-t-slate-400 animate-spin"></div>
      </div>
      <p className="mt-4 text-sm font-medium text-slate-600 dark:text-slate-300">Loading...</p>
    </div>
  );
}

export default Loading;
