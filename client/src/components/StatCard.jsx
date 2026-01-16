import React from 'react'

function StatCard({ title, value, icon: Icon, trend, trendValue }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
          <p className="text-3xl font-semibold text-slate-900 tracking-tight">{value}</p>
          {trend && trendValue && (
            <div className="flex items-center mt-2 gap-1">
              <span className={`text-xs font-medium ${trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                {trend === 'up' ? '↑' : '↓'} {trendValue}
              </span>
              <span className="text-xs text-slate-500">vs last period</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className="ml-4 p-3 bg-slate-50 rounded-lg">
            <Icon className="w-6 h-6 text-slate-600" strokeWidth={1.5} />
          </div>
        )}
      </div>
    </div>
  )
}

export default StatCard
