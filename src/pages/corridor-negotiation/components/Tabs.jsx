import React from 'react';
import Icon from '../../../components/AppIcon';

const TABS = [
  { id: 'overview', label: 'Overview', icon: 'Grid' },
  { id: 'timeline', label: 'Timeline', icon: 'Clock' },
  { id: 'messages', label: 'Messages', icon: 'MessageSquare' },
  { id: 'requests', label: 'Requests', icon: 'Inbox' },
  { id: 'history', label: 'History', icon: 'History' },
];

const Tabs = ({ activeTab, onChange }) => {
  return (
    <div className="flex items-center gap-6 border-b border-border px-2">
      {TABS.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`relative py-3 flex items-center gap-2 text-sm font-medium transition-colors ${
            activeTab === tab.id ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon name={tab.icon} size={16} />
          <span>{tab.label}</span>
          {activeTab === tab.id && (
            <span className="absolute -bottom-px left-0 right-0 h-0.5 bg-primary rounded-t" />
          )}
        </button>
      ))}
    </div>
  );
};

export default Tabs;


