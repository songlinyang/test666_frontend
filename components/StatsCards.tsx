import React from 'react';
import { ArrowUpRight, DollarSign, Activity, Cpu } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  trend?: string;
  icon: React.ReactNode;
  positive?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, trend, icon, positive }) => (
  <div className="bg-gray-850 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-white">{value}</h3>
      </div>
      <div className={`p-2 rounded-lg ${positive === undefined ? 'bg-gray-800 text-gray-400' : positive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
        {icon}
      </div>
    </div>
    {trend && (
      <div className="mt-2 flex items-center gap-1 text-xs">
        {positive ? <ArrowUpRight size={14} className="text-green-500" /> : null}
        <span className={positive ? 'text-green-500' : 'text-red-500'}>{trend}</span>
        <span className="text-gray-500">vs last 24h</span>
      </div>
    )}
  </div>
);

export const StatsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard 
        title="Total Profit (24h)" 
        value="$1,248.50" 
        trend="+12.5%" 
        positive={true} 
        icon={<DollarSign size={20} />} 
      />
      <StatCard 
        title="Active Opportunities" 
        value="14" 
        trend="+3" 
        positive={true} 
        icon={<Activity size={20} />} 
      />
      <StatCard 
        title="Gas Used" 
        value="0.15 ETH" 
        trend="+0.02" 
        positive={false} 
        icon={<Cpu size={20} />} 
      />
      <StatCard 
        title="Success Rate" 
        value="94.2%" 
        trend="+1.2%" 
        positive={true} 
        icon={<ArrowUpRight size={20} />} 
      />
    </div>
  );
};
