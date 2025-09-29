import React from 'react';
import Icon from '../../../components/AppIcon';

const SummaryPanel = ({ summary }) => {
  const summaryCards = [
    {
      title: 'Pending Suggestions',
      value: summary?.pendingCount,
      icon: 'Clock',
      color: 'text-warning bg-warning/10',
      description: 'Awaiting decision'
    },
    {
      title: 'Acceptance Rate',
      value: `${summary?.acceptanceRate}%`,
      icon: 'TrendingUp',
      color: 'text-success bg-success/10',
      description: 'Last 30 days'
    },
    {
      title: 'Time Saved Today',
      value: `${summary?.timeSavedToday} min`,
      icon: 'Timer',
      color: 'text-primary bg-primary/10',
      description: 'From accepted suggestions'
    },
    {
      title: 'Cumulative Benefits',
      value: `₹${summary?.cumulativeSavings}L`,
      icon: 'IndianRupee',
      color: 'text-accent bg-accent/10',
      description: 'This month'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {summaryCards?.map((card, index) => (
        <div key={index} className="railway-card p-4">
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg ${card?.color}`}>
              <Icon name={card?.icon} size={20} />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-foreground">{card?.value}</div>
              <div className="text-xs text-muted-foreground">{card?.description}</div>
            </div>
          </div>
          <h3 className="text-sm font-medium text-foreground">{card?.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default SummaryPanel;