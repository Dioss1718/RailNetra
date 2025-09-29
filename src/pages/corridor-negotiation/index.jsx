import React, { useState } from 'react';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Tabs from './components/Tabs';
import Overview from './components/Overview';
import Requests from './components/Requests';
import Messages from './components/Messages';
import Timeline from './components/Timeline';
import History from './components/History';

const CorridorNegotiation = () => {
  const [tab, setTab] = useState('overview');

  const renderTab = () => {
    switch (tab) {
      case 'overview':
        return <Overview />;
      case 'timeline':
        return <Timeline />;
      case 'messages':
        return <Messages />;
      case 'requests':
        return <Requests />;
      case 'history':
        return <History />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-60">
          <div className="px-6 pt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon name="ArrowLeftRight" size={24} className="text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Corridor Negotiation</h1>
                  <p className="text-muted-foreground">Multi-agent coordination for optimal slot management</p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-md border border-border px-3 h-9 text-sm"><span className="h-2 w-2 rounded-full bg-success" /> All Systems Online</span>
                <button className="rounded-md border border-border px-3 h-9 text-sm">Collapse</button>
              </div>
            </div>
            <Tabs activeTab={tab} onChange={setTab} />
          </div>

          <div className="p-6">
            {renderTab()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CorridorNegotiation;


