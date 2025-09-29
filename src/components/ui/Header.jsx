import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = ({ className = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMobile, setIsMobile] = useState(false);

  const primaryNavItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard'
    },
    {
      label: 'Live Map',
      path: '/live-map',
      icon: 'Map'
    },
    {
      label: 'Simulation',
      path: '/simulation',
      icon: 'Play'
    },
    {
      label: 'Schedule',
      path: '/schedule-management',
      icon: 'Calendar'
    }
  ];

  const secondaryNavItems = [
    {
      label: 'AI Suggestions',
      path: '/ai-suggestions',
      icon: 'Brain'
    },
    {
      label: 'Corridor Negotiation',
      path: '/corridor-negotiation',
      icon: 'ArrowLeftRight'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location?.pathname === path;
  };

  const getPageTitle = () => {
    const currentPath = location?.pathname;
    const allItems = [...primaryNavItems, ...secondaryNavItems];
    const currentItem = allItems?.find(item => item?.path === currentPath);
    return currentItem ? currentItem?.label : 'RailNetra';
  };

  return (
    <header className={`bg-surface border-b border-border sticky top-0 z-1000 ${className}`}>
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Icon name="Train" size={20} color="var(--color-primary-foreground)" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold text-foreground">RailNetra</h1>
              {isMobile && (
                <p className="text-xs text-muted-foreground">{getPageTitle()}</p>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="flex items-center space-x-1">
            {primaryNavItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 ease-out ${
                  isActive(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={16} className="mr-2" />
                {item?.label}
              </button>
            ))}
            
            {/* More Menu */}
            <div className="relative group">
              <button className="flex items-center px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors duration-150 ease-out">
                <Icon name="MoreHorizontal" size={16} className="mr-2" />
                More
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-md shadow-railway-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 ease-out z-1100">
                <div className="py-1">
                  {secondaryNavItems?.map((item) => (
                    <button
                      key={item?.path}
                      onClick={() => handleNavigation(item?.path)}
                      className={`w-full flex items-center px-3 py-2 text-sm text-left transition-colors duration-150 ease-out ${
                        isActive(item?.path)
                          ? 'bg-primary text-primary-foreground'
                          : 'text-popover-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={item?.icon} size={16} className="mr-3" />
                      {item?.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </nav>
        )}

        {/* System Status and Time */}
        <div className="flex items-center space-x-4">
          {/* System Status */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-2 h-2 bg-success rounded-full railway-pulse"></div>
            <span className="text-xs text-muted-foreground hidden sm:inline">Online</span>
          </div>

          {/* Current Time */}
          <div className="text-sm font-mono text-foreground">
            {currentTime?.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit',
              second: '2-digit'
            })}
          </div>

          {/* Mobile Menu Button */}
          {isMobile && (
            <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors duration-150 ease-out">
              <Icon name="Menu" size={20} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;