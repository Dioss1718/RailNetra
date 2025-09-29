import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SummaryPanel from './components/SummaryPanel';
import FilterPanel from './components/FilterPanel';
import BatchProcessingPanel from './components/BatchProcessingPanel';
import SuggestionList from './components/SuggestionList';

const AISuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedSuggestions, setSelectedSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: 'all',
    confidence: 'all',
    impact: 'all',
    priority: 'all'
  });

  // Mock data for AI suggestions
  const mockSuggestions = [
    {
      id: 'sug-001',
      title: 'Optimize Train 12345 Schedule',
      summary: 'Adjust departure time to reduce cascade delays',
      type: 'schedule',
      priority: 'high',
      confidence: 92,
      rationale: `Analysis of historical data shows that Train 12345's current departure time conflicts with peak traffic on the Mumbai-Delhi corridor. By advancing departure by 15 minutes, we can avoid congestion at Vadodara Junction and reduce downstream delays by an average of 8 minutes per train.`,
      benefits: {
        timeSaving: 12,
        efficiency: 15,
        passengersAffected: 1250
      },
      affectedTrains: [
        { id: 1, number: '12345', name: 'Rajdhani Express', currentDelay: 8 },
        { id: 2, number: '12951', name: 'Mumbai Rajdhani', currentDelay: 0 },
        { id: 3, number: '12009', name: 'Shatabdi Express', currentDelay: 5 }
      ],
      alternatives: [
        {
          name: 'Delay by 10 minutes',confidence: 78,description: 'Alternative approach with lower impact but reduced benefits'
        },
        {
          name: 'Route via Surat',confidence: 65,description: 'Longer route but avoids congestion completely'
        }
      ],
      risks: {
        benefits: [
          'Reduced passenger waiting time','Improved punctuality metrics','Better resource utilization'
        ],
        concerns: [
          'Potential crew scheduling conflicts','Platform availability at origin'
        ]
      },
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: 'sug-002',title: 'Route Optimization for Freight Corridor',summary: 'Redirect freight trains via alternate route during peak hours',type: 'route',priority: 'medium',
      confidence: 85,
      rationale: `Peak hour analysis indicates that freight trains on the Delhi-Mumbai corridor are causing significant delays to passenger services. Redirecting freight traffic via the Rewari-Jaipur-Ajmer route during 7-10 AM and 6-9 PM will improve passenger train punctuality by 23%.`,
      benefits: {
        timeSaving: 18,
        efficiency: 23,
        passengersAffected: 3200
      },
      affectedTrains: [
        { id: 4, number: 'FRT-001', name: 'Container Freight', currentDelay: 0 },
        { id: 5, number: 'FRT-002', name: 'Coal Freight', currentDelay: 15 },
        { id: 6, number: '12001', name: 'Shatabdi Express', currentDelay: 12 }
      ],
      alternatives: [
        {
          name: 'Stagger freight timing',confidence: 72,description: 'Spread freight departures over longer time window'
        }
      ],
      risks: {
        benefits: [
          'Improved passenger train punctuality','Better track utilization','Reduced congestion at major junctions'
        ],
        concerns: [
          'Increased freight transit time','Higher fuel consumption for longer route'
        ]
      },
      timestamp: new Date(Date.now() - 600000)
    },
    {
      id: 'sug-003',title: 'Maintenance Window Optimization',summary: 'Adjust maintenance schedule to minimize service disruption',type: 'maintenance',priority: 'low',
      confidence: 76,
      rationale: `Current maintenance window for Track Section KM 245-250 overlaps with peak passenger traffic. Shifting the 4-hour maintenance window from 8 AM-12 PM to 2 AM-6 AM will reduce passenger service disruptions while maintaining safety standards.`,
      benefits: {
        timeSaving: 25,
        efficiency: 18,
        passengersAffected: 850
      },
      affectedTrains: [
        { id: 7, number: '12002', name: 'Shatabdi Express', currentDelay: 0 },
        { id: 8, number: '12951', name: 'Mumbai Rajdhani', currentDelay: 3 }
      ],
      alternatives: [
        {
          name: 'Split maintenance window',confidence: 68,description: '2-hour windows on consecutive nights'
        }
      ],
      risks: {
        benefits: [
          'Zero passenger service disruption','Maintained safety standards','Better crew rest periods'
        ],
        concerns: [
          'Night shift premium costs','Reduced visibility for maintenance work'
        ]
      },
      timestamp: new Date(Date.now() - 900000)
    },
    {
      id: 'sug-004',title: 'Priority Train Slot Adjustment',summary: 'Reallocate priority slots for better overall performance',type: 'priority',priority: 'high',
      confidence: 88,
      rationale: `Analysis shows that current priority train slots are not optimally utilized. Reallocating slots based on real-time passenger load and connection requirements can improve overall network performance by 19% while maintaining VIP train schedules.`,
      benefits: {
        timeSaving: 22,
        efficiency: 19,
        passengersAffected: 2100
      },
      affectedTrains: [
        { id: 9, number: '12001', name: 'Shatabdi Express', currentDelay: 5 },
        { id: 10, number: '12345', name: 'Rajdhani Express', currentDelay: 0 },
        { id: 11, number: '22691', name: 'Rajdhani Express', currentDelay: 8 }
      ],
      alternatives: [
        {
          name: 'Gradual slot reallocation',confidence: 82,description: 'Phase implementation over 2 weeks'
        }
      ],
      risks: {
        benefits: [
          'Improved overall punctuality','Better passenger satisfaction','Optimal resource utilization'
        ],
        concerns: [
          'Potential VIP service impact','Complex coordination requirements'
        ]
      },
      timestamp: new Date(Date.now() - 1200000)
    }
  ];

  const mockSummary = {
    pendingCount: 4,
    acceptanceRate: 78,
    timeSavedToday: 145,
    cumulativeSavings: 2.8
  };

  useEffect(() => {
    // Simulate API call
    const loadSuggestions = async () => {
      setLoading(true);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSuggestions(mockSuggestions);
        setFilteredSuggestions(mockSuggestions);
      } finally {
        setLoading(false);
      }
    };

    loadSuggestions();
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = suggestions;

    if (filters?.type !== 'all') {
      filtered = filtered?.filter(s => s?.type === filters?.type);
    }

    if (filters?.confidence !== 'all') {
      switch (filters?.confidence) {
        case 'high':
          filtered = filtered?.filter(s => s?.confidence >= 90);
          break;
        case 'medium':
          filtered = filtered?.filter(s => s?.confidence >= 70 && s?.confidence < 90);
          break;
        case 'low':
          filtered = filtered?.filter(s => s?.confidence < 70);
          break;
      }
    }

    if (filters?.impact !== 'all') {
      // Mock impact calculation based on efficiency benefits
      filtered = filtered?.filter(s => {
        const impact = s?.benefits?.efficiency;
        switch (filters?.impact) {
          case 'high':
            return impact >= 20;
          case 'medium':
            return impact >= 10 && impact < 20;
          case 'low':
            return impact < 10;
          default:
            return true;
        }
      });
    }

    if (filters?.priority !== 'all') {
      filtered = filtered?.filter(s => s?.priority === filters?.priority);
    }

    setFilteredSuggestions(filtered);
  }, [suggestions, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      type: 'all',
      confidence: 'all',
      impact: 'all',
      priority: 'all'
    });
  };

  const handleAcceptSuggestion = async (suggestionId) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Remove from suggestions list
    setSuggestions(prev => prev?.filter(s => s?.id !== suggestionId));
    setSelectedSuggestions(prev => prev?.filter(id => id !== suggestionId));
    
    // Log the action (in real app, this would go to backend)
    console.log(`Accepted suggestion: ${suggestionId}`);
  };

  const handleRejectSuggestion = async (suggestionId) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Remove from suggestions list
    setSuggestions(prev => prev?.filter(s => s?.id !== suggestionId));
    setSelectedSuggestions(prev => prev?.filter(id => id !== suggestionId));
    
    // Log the action
    console.log(`Rejected suggestion: ${suggestionId}`);
  };

  const handleModifySuggestion = async (suggestionId) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In real app, this would open a modification dialog
    console.log(`Modify suggestion: ${suggestionId}`);
  };

  const handleBatchAction = async (action, suggestionIds) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (action === 'accept' || action === 'reject') {
      setSuggestions(prev => prev?.filter(s => !suggestionIds?.includes(s?.id)));
      setSelectedSuggestions([]);
    }
    
    console.log(`Batch ${action} for suggestions:`, suggestionIds);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-60 p-6">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon name="Brain" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">AI Suggestions</h1>
                <p className="text-muted-foreground">
                  Intelligent recommendations for operational optimization
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                iconName="RefreshCw"
                iconPosition="left"
                onClick={() => window.location?.reload()}
              >
                Refresh
              </Button>
              <Button
                variant="default"
                iconName="Settings"
                iconPosition="left"
              >
                Configure AI
              </Button>
            </div>
          </div>

          {/* Summary Panel */}
          <SummaryPanel summary={mockSummary} />

          {/* Filter Panel */}
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />

          {/* Batch Processing Panel */}
          <BatchProcessingPanel
            suggestions={filteredSuggestions}
            selectedSuggestions={selectedSuggestions}
            onSelectionChange={setSelectedSuggestions}
            onBatchAction={handleBatchAction}
          />

          {/* Suggestions List */}
          <SuggestionList
            suggestions={filteredSuggestions}
            selectedSuggestions={selectedSuggestions}
            onSelectionChange={setSelectedSuggestions}
            onAccept={handleAcceptSuggestion}
            onReject={handleRejectSuggestion}
            onModify={handleModifySuggestion}
            loading={loading}
          />
        </main>
      </div>
    </div>
  );
};

export default AISuggestions;