import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const BatchProcessingPanel = ({ suggestions, selectedSuggestions, onSelectionChange, onBatchAction }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAutoAcceptSettings, setShowAutoAcceptSettings] = useState(false);
  const [autoAcceptCriteria, setAutoAcceptCriteria] = useState({
    minConfidence: 85,
    maxRisk: 'low',
    enableAutoAccept: false
  });

  const handleBatchAction = async (action) => {
    if (selectedSuggestions?.length === 0) return;
    
    setIsProcessing(true);
    try {
      await onBatchAction(action, selectedSuggestions);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSelectAll = () => {
    if (selectedSuggestions?.length === suggestions?.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(suggestions?.map(s => s?.id));
    }
  };

  const handleAutoAcceptChange = (field, value) => {
    setAutoAcceptCriteria(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isAllSelected = selectedSuggestions?.length === suggestions?.length;
  const isPartiallySelected = selectedSuggestions?.length > 0 && selectedSuggestions?.length < suggestions?.length;

  return (
    <div className="railway-card p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon name="CheckSquare" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Batch Processing</h3>
          {selectedSuggestions?.length > 0 && (
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
              {selectedSuggestions?.length} selected
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAutoAcceptSettings(!showAutoAcceptSettings)}
          iconName="Settings"
          iconPosition="left"
        >
          Auto Accept
        </Button>
      </div>
      {/* Selection Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Checkbox
            checked={isAllSelected}
            indeterminate={isPartiallySelected}
            onChange={handleSelectAll}
            label="Select All Suggestions"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleBatchAction('reject')}
            disabled={selectedSuggestions?.length === 0 || isProcessing}
            iconName="X"
            iconPosition="left"
          >
            Reject Selected
          </Button>
          <Button
            variant="success"
            size="sm"
            onClick={() => handleBatchAction('accept')}
            disabled={selectedSuggestions?.length === 0 || isProcessing}
            loading={isProcessing}
            iconName="Check"
            iconPosition="left"
          >
            Accept Selected
          </Button>
        </div>
      </div>
      {/* Auto Accept Settings */}
      {showAutoAcceptSettings && (
        <div className="border-t border-border pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Minimum Confidence
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={autoAcceptCriteria?.minConfidence}
                  onChange={(e) => handleAutoAcceptChange('minConfidence', parseInt(e?.target?.value))}
                  className="flex-1"
                />
                <span className="text-sm font-medium text-foreground w-12">
                  {autoAcceptCriteria?.minConfidence}%
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Maximum Risk Level
              </label>
              <select
                value={autoAcceptCriteria?.maxRisk}
                onChange={(e) => handleAutoAcceptChange('maxRisk', e?.target?.value)}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground text-sm"
              >
                <option value="low">Low Risk Only</option>
                <option value="medium">Medium Risk or Lower</option>
                <option value="high">Any Risk Level</option>
              </select>
            </div>

            <div className="flex items-end">
              <Checkbox
                checked={autoAcceptCriteria?.enableAutoAccept}
                onChange={(e) => handleAutoAcceptChange('enableAutoAccept', e?.target?.checked)}
                label="Enable Auto Accept"
                description="Automatically accept suggestions meeting criteria"
              />
            </div>
          </div>

          {autoAcceptCriteria?.enableAutoAccept && (
            <div className="mt-4 p-3 bg-success/5 border border-success/20 rounded-md">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="CheckCircle" size={16} className="text-success" />
                <span className="text-sm font-medium text-success">Auto Accept Enabled</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Suggestions with ≥{autoAcceptCriteria?.minConfidence}% confidence and {autoAcceptCriteria?.maxRisk} risk will be automatically accepted.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BatchProcessingPanel;