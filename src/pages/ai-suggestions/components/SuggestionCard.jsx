import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SuggestionCard = ({ suggestion, onAccept, onReject, onModify }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAction = async (action, suggestionId) => {
    setIsProcessing(true);
    try {
      switch (action) {
        case 'accept':
          await onAccept(suggestionId);
          break;
        case 'reject':
          await onReject(suggestionId);
          break;
        case 'modify':
          await onModify(suggestionId);
          break;
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-success bg-success/10';
    if (confidence >= 70) return 'text-warning bg-warning/10';
    return 'text-error bg-error/10';
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return { icon: 'AlertTriangle', color: 'text-error' };
      case 'medium':
        return { icon: 'Clock', color: 'text-warning' };
      default:
        return { icon: 'Info', color: 'text-muted-foreground' };
    }
  };

  const priorityInfo = getPriorityIcon(suggestion?.priority);

  return (
    <div className="railway-card p-6 hover:shadow-lg transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          <div className={`p-2 rounded-lg ${suggestion?.type === 'schedule' ? 'bg-primary/10' : suggestion?.type === 'route' ? 'bg-success/10' : 'bg-warning/10'}`}>
            <Icon 
              name={suggestion?.type === 'schedule' ? 'Calendar' : suggestion?.type === 'route' ? 'Route' : 'Settings'} 
              size={20} 
              className={suggestion?.type === 'schedule' ? 'text-primary' : suggestion?.type === 'route' ? 'text-success' : 'text-warning'}
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-lg font-semibold text-foreground">{suggestion?.title}</h3>
              <Icon name={priorityInfo?.icon} size={16} className={priorityInfo?.color} />
            </div>
            <p className="text-sm text-muted-foreground">{suggestion?.summary}</p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(suggestion?.confidence)}`}>
          {suggestion?.confidence}% confidence
        </div>
      </div>
      {/* Benefits Preview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} className="text-success" />
          <span className="text-sm text-foreground">
            Save {suggestion?.benefits?.timeSaving} min
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="TrendingUp" size={16} className="text-primary" />
          <span className="text-sm text-foreground">
            +{suggestion?.benefits?.efficiency}% efficiency
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Users" size={16} className="text-warning" />
          <span className="text-sm text-foreground">
            {suggestion?.benefits?.passengersAffected} passengers
          </span>
        </div>
      </div>
      {/* Rationale */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-foreground mb-2">AI Rationale:</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {suggestion?.rationale}
        </p>
      </div>
      {/* Expandable Details */}
      {isExpanded && (
        <div className="border-t border-border pt-4 mb-4 space-y-4">
          {/* Affected Trains */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Affected Trains:</h4>
            <div className="space-y-2">
              {suggestion?.affectedTrains?.map((train) => (
                <div key={train?.id} className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                  <div className="flex items-center space-x-2">
                    <Icon name="Train" size={16} className="text-primary" />
                    <span className="text-sm font-medium text-foreground">{train?.number}</span>
                    <span className="text-sm text-muted-foreground">{train?.name}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {train?.currentDelay > 0 ? `+${train?.currentDelay}min` : 'On time'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alternative Scenarios */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Alternative Scenarios:</h4>
            <div className="space-y-2">
              {suggestion?.alternatives?.map((alt, index) => (
                <div key={index} className="p-3 bg-muted/30 rounded-md">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">{alt?.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getConfidenceColor(alt?.confidence)}`}>
                      {alt?.confidence}%
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{alt?.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Assessment */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Risk Assessment:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 bg-success/5 border border-success/20 rounded-md">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span className="text-sm font-medium text-success">Benefits</span>
                </div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {suggestion?.risks?.benefits?.map((benefit, index) => (
                    <li key={index}>• {benefit}</li>
                  ))}
                </ul>
              </div>
              <div className="p-3 bg-warning/5 border border-warning/20 rounded-md">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="AlertTriangle" size={16} className="text-warning" />
                  <span className="text-sm font-medium text-warning">Risks</span>
                </div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {suggestion?.risks?.concerns?.map((risk, index) => (
                    <li key={index}>• {risk}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Actions */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
          iconPosition="right"
        >
          {isExpanded ? 'Less Details' : 'More Details'}
        </Button>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleAction('reject', suggestion?.id)}
            disabled={isProcessing}
            iconName="X"
            iconPosition="left"
          >
            Reject
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleAction('modify', suggestion?.id)}
            disabled={isProcessing}
            iconName="Edit"
            iconPosition="left"
          >
            Modify
          </Button>
          <Button
            variant="success"
            size="sm"
            onClick={() => handleAction('accept', suggestion?.id)}
            disabled={isProcessing}
            loading={isProcessing}
            iconName="Check"
            iconPosition="left"
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuggestionCard;