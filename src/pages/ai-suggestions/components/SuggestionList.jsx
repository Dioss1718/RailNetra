import React from 'react';
import Icon from '../../../components/AppIcon';
import SuggestionCard from './SuggestionCard';
import { Checkbox } from '../../../components/ui/Checkbox';

const SuggestionsList = ({ 
  suggestions, 
  selectedSuggestions, 
  onSelectionChange, 
  onAccept, 
  onReject, 
  onModify,
  loading 
}) => {
  const handleSuggestionSelect = (suggestionId, isSelected) => {
    if (isSelected) {
      onSelectionChange([...selectedSuggestions, suggestionId]);
    } else {
      onSelectionChange(selectedSuggestions?.filter(id => id !== suggestionId));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <span className="text-muted-foreground">Loading suggestions...</span>
        </div>
      </div>
    );
  }

  if (suggestions?.length === 0) {
    return (
      <div className="railway-card p-8 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="p-4 bg-muted/50 rounded-full">
            <Icon name="Brain" size={32} className="text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No Suggestions Available</h3>
            <p className="text-muted-foreground">
              The AI system is analyzing current operations. New suggestions will appear as optimization opportunities are identified.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {suggestions?.map((suggestion) => (
        <div key={suggestion?.id} className="relative">
          {/* Selection Checkbox */}
          <div className="absolute top-4 left-4 z-10">
            <Checkbox
              checked={selectedSuggestions?.includes(suggestion?.id)}
              onChange={(e) => handleSuggestionSelect(suggestion?.id, e?.target?.checked)}
            />
          </div>
          
          {/* Suggestion Card with left padding for checkbox */}
          <div className="pl-10">
            <SuggestionCard
              suggestion={suggestion}
              onAccept={onAccept}
              onReject={onReject}
              onModify={onModify}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SuggestionsList;