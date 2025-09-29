import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterPanel = ({ filters, onFilterChange, onClearFilters }) => {
  const suggestionTypes = [
    { value: 'all', label: 'All Types', icon: 'Filter' },
    { value: 'schedule', label: 'Schedule', icon: 'Calendar' },
    { value: 'route', label: 'Route', icon: 'Route' },
    { value: 'maintenance', label: 'Maintenance', icon: 'Settings' },
    { value: 'priority', label: 'Priority', icon: 'AlertTriangle' }
  ];

  const confidenceLevels = [
    { value: 'all', label: 'All Confidence', min: 0, max: 100 },
    { value: 'high', label: 'High (90%+)', min: 90, max: 100 },
    { value: 'medium', label: 'Medium (70-89%)', min: 70, max: 89 },
    { value: 'low', label: 'Low (&lt;70%)', min: 0, max: 69 }
  ];

  const impactCategories = [
    { value: 'all', label: 'All Impact' },
    { value: 'high', label: 'High Impact' },
    { value: 'medium', label: 'Medium Impact' },
    { value: 'low', label: 'Low Impact' }
  ];

  const priorityLevels = [
    { value: 'all', label: 'All Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const handleFilterChange = (filterType, value) => {
    onFilterChange({
      ...filters,
      [filterType]: value
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters?.type !== 'all') count++;
    if (filters?.confidence !== 'all') count++;
    if (filters?.impact !== 'all') count++;
    if (filters?.priority !== 'all') count++;
    return count;
  };

  return (
    <div className="railway-card p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Filters</h3>
          {getActiveFiltersCount() > 0 && (
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
              {getActiveFiltersCount()} active
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          iconName="X"
          iconPosition="left"
        >
          Clear All
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Suggestion Type Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Suggestion Type
          </label>
          <div className="space-y-1">
            {suggestionTypes?.map((type) => (
              <button
                key={type?.value}
                onClick={() => handleFilterChange('type', type?.value)}
                className={`w-full flex items-center space-x-2 px-3 py-2 text-sm rounded-md transition-colors duration-150 ${
                  filters?.type === type?.value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={type?.icon} size={16} />
                <span>{type?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Confidence Level Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Confidence Level
          </label>
          <div className="space-y-1">
            {confidenceLevels?.map((level) => (
              <button
                key={level?.value}
                onClick={() => handleFilterChange('confidence', level?.value)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors duration-150 ${
                  filters?.confidence === level?.value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <span dangerouslySetInnerHTML={{ __html: level?.label }} />
                {filters?.confidence === level?.value && (
                  <Icon name="Check" size={14} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Impact Category Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Impact Category
          </label>
          <div className="space-y-1">
            {impactCategories?.map((category) => (
              <button
                key={category?.value}
                onClick={() => handleFilterChange('impact', category?.value)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors duration-150 ${
                  filters?.impact === category?.value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <span>{category?.label}</span>
                {filters?.impact === category?.value && (
                  <Icon name="Check" size={14} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Priority Level Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Priority Level
          </label>
          <div className="space-y-1">
            {priorityLevels?.map((priority) => (
              <button
                key={priority?.value}
                onClick={() => handleFilterChange('priority', priority?.value)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors duration-150 ${
                  filters?.priority === priority?.value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <span>{priority?.label}</span>
                {filters?.priority === priority?.value && (
                  <Icon name="Check" size={14} />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;