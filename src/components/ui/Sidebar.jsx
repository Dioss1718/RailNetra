import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Sidebar = ({ isCollapsed = false, className = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      tooltip: 'System overview and operational KPIs'
    },
    {
      label: 'Live Map',
      path: '/live-map',
      icon: 'Map',
      tooltip: 'Real-time network visualization and train tracking'
    },
    {
      label: 'Simulation',
      path: '/simulation',
      icon: 'Play',
      tooltip: 'Interactive schedule optimization and testing'
    },
    {
      label: 'Schedule Management',
      path: '/schedule-management',
      icon: 'Calendar',
      tooltip: 'Timetable comparison and change approval'
    },
    {
      label: 'AI Suggestions',
      path: '/ai-suggestions',
      icon: 'Brain',
      tooltip: 'Intelligent recommendations for optimization'
    },
    {
      label: 'Corridor Negotiation',
      path: '/corridor-negotiation',
      icon: 'ArrowLeftRight',
      tooltip: 'Multi-agent coordination and slot management'
    }
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location?.pathname === path;
  };

  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-1001 safe-area-inset-bottom">
        <div className="flex justify-around items-center px-2 py-2">
          {navigationItems?.slice(0, 5)?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 rounded-md transition-colors duration-150 ease-out ${
                isActive(item?.path)
                  ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground'
              }`}
              title={item?.tooltip}
            >
              <Icon name={item?.icon} size={20} className="mb-1" />
              <span className="text-xs font-medium truncate">{item?.label}</span>
            </button>
          ))}
          <button
            onClick={() => handleNavigation('/corridor-negotiation')}
            className={`flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 rounded-md transition-colors duration-150 ease-out ${
              isActive('/corridor-negotiation')
                ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground'
            }`}
            title="More options"
          >
            <Icon name="MoreHorizontal" size={20} className="mb-1" />
            <span className="text-xs font-medium">More</span>
          </button>
        </div>
      </nav>
    );
  }

  return (
    <nav className={`fixed left-0 top-0 h-full bg-surface border-r border-border z-1000 transition-transform duration-300 ease-out ${
      isCollapsed ? 'w-16' : 'w-60'
    } ${className}`}>
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="flex items-center px-4 py-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Icon name="Train" size={20} color="var(--color-primary-foreground)" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <h1 className="text-lg font-semibold text-foreground">RailNetra</h1>
                <p className="text-xs text-muted-foreground">Traffic Control</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 ease-out group ${
                isActive(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              title={isCollapsed ? item?.tooltip : ''}
            >
              <Icon 
                name={item?.icon} 
                size={20} 
                className={`${isCollapsed ? '' : 'mr-3'} flex-shrink-0`}
              />
              {!isCollapsed && (
                <span className="truncate">{item?.label}</span>
              )}
              
              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-16 ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md shadow-railway-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 ease-out whitespace-nowrap z-1100">
                  {item?.label}
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-popover rotate-45"></div>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* System Status */}
        <div className="px-4 py-4 border-t border-border">
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
            <div className="flex items-center justify-center w-2 h-2 bg-success rounded-full railway-pulse"></div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-xs font-medium text-foreground">System Online</span>
                <span className="text-xs text-muted-foreground font-mono">
                  {new Date()?.toLocaleTimeString()}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;