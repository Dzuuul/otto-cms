import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: string;
    positive: boolean;
  };
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  className,
}) => {
  return (
    <div className={`bg-white rounded-lg p-6 shadow-sm ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
          {change && (
            <div className="flex items-center mt-2">
              <span
                className={`text-xs font-medium ${
                  change.positive ? "text-otto-green" : "text-otto-red"
                }`}
              >
                {change.positive ? "↑" : "↓"} {change.value}
              </span>
              <span className="text-xs text-gray-500 ml-1">
                dari bulan lalu
              </span>
            </div>
          )}
        </div>
        <div className="rounded-full p-3 bg-otto-blue/10 text-otto-blue">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
