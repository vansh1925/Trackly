import { AlertCircle, TrendingDown, TrendingUp, Info, CheckCircle } from 'lucide-react';

const InsightCard = ({ insight }) => {
  const getIconAndColor = () => {
    switch (insight.severity) {
      case 'high':
        return {
          icon: <AlertCircle className="w-5 h-5" />,
          bgColor: 'bg-red-50 dark:bg-red-900/20',
          borderColor: 'border-red-200 dark:border-red-800',
          iconColor: 'text-red-600 dark:text-red-400',
          textColor: 'text-red-900 dark:text-red-100'
        };
      case 'medium':
        return {
          icon: insight.type === 'PRODUCTIVITY_GAIN' 
            ? <TrendingUp className="w-5 h-5" />
            : <TrendingDown className="w-5 h-5" />,
          bgColor: 'bg-amber-50 dark:bg-amber-900/20',
          borderColor: 'border-amber-200 dark:border-amber-800',
          iconColor: insight.type === 'PRODUCTIVITY_GAIN' 
            ? 'text-green-600 dark:text-green-400'
            : 'text-amber-600 dark:text-amber-400',
          textColor: 'text-amber-900 dark:text-amber-100'
        };
      case 'low':
        return {
          icon: <Info className="w-5 h-5" />,
          bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
          borderColor: 'border-yellow-200 dark:border-yellow-800',
          iconColor: 'text-yellow-600 dark:text-yellow-400',
          textColor: 'text-yellow-900 dark:text-yellow-100'
        };
      case 'info':
      default:
        return {
          icon: <CheckCircle className="w-5 h-5" />,
          bgColor: 'bg-blue-50 dark:bg-blue-900/20',
          borderColor: 'border-blue-200 dark:border-blue-800',
          iconColor: 'text-blue-600 dark:text-blue-400',
          textColor: 'text-blue-900 dark:text-blue-100'
        };
    }
  };

  const { icon, bgColor, borderColor, iconColor, textColor } = getIconAndColor();

  return (
    <div className={`${bgColor} border ${borderColor} rounded-lg p-4`}>
      <div className="flex items-start gap-3">
        <div className={iconColor}>{icon}</div>
        <div className="flex-1">
          <p className={`text-sm font-medium ${textColor}`}>
            {insight.message}
          </p>
          {insight.value > 0 && (
            <p className={`text-xs mt-1 ${iconColor} font-semibold`}>
              {insight.value}% {insight.type === 'PRODUCTIVITY_GAIN' ? 'increase' : 'decrease'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InsightCard;
