import React, { useMemo, useState } from 'react';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';

const tracksList = ['Track 1','Track 2','Track 3','Track 4','Track 5'];

const initialTrains = [
  { id: 'T001', name: 'Rajdhani Express', track: 'Track 1', start: 6 * 60, end: 8 * 60 + 30, priority: 'Express', color: 'bg-primary' },
  { id: 'T002', name: 'Shatabdi Express', track: 'Track 2', start: 7 * 60 + 30, end: 9 * 60, priority: 'Express', color: 'bg-primary' },
  { id: 'T003', name: 'Duronto Express', track: 'Track 3', start: 12 * 60 + 30, end: 14 * 60, priority: 'Express', color: 'bg-warning' },
  { id: 'T004', name: 'Jan Shatabdi', track: 'Track 4', start: 10 * 60 + 15, end: 12 * 60 + 45, priority: 'Express', color: 'bg-primary' },
  { id: 'T005', name: 'Garib Rath', track: 'Track 3', start: 9 * 60 + 45, end: 11 * 60 + 15, priority: 'Express', color: 'bg-primary' },
];

function minutesToLeft(minutes) {
  const min = 6 * 60; // start 06:00
  const max = 17 * 60; // end 17:00
  const clamped = Math.min(Math.max(minutes, min), max);
  return ((clamped - min) / (max - min)) * 100;
}

function durationToWidth(start, end) {
  const min = 6 * 60;
  const max = 17 * 60;
  const w = ((end - start) / (max - min)) * 100;
  return Math.max(6, w);
}

function computeKPIs(trains, maintenance) {
  // Very simple mock KPI computation for demo
  const total = trains.length;
  let conflicts = 0;
  const trackToWindows = {};
  trains.forEach(t => {
    trackToWindows[t.track] = trackToWindows[t.track] || [];
    trackToWindows[t.track].push([t.start, t.end]);
  });
  Object.values(trackToWindows).forEach(windows => {
    windows.sort((a,b)=>a[0]-b[0]);
    for (let i=1;i<windows.length;i++) {
      if (windows[i][0] < windows[i-1][1]) conflicts++;
    }
  });

  // Maintenance impact: trains overlapping maintenance window
  let affected = 0;
  if (maintenance && maintenance.track && maintenance.start != null && maintenance.end != null) {
    trains.forEach(t => {
      if (t.track === maintenance.track && !(t.end <= maintenance.start || t.start >= maintenance.end)) {
        affected++;
      }
    });
  }

  const improvement = Math.max(0, 60 - conflicts * 10 + (maintenance ? 5 : 0));
  return { total, conflicts, affected, improvement };
}

const Simulation = () => {
  const [blockNumber, setBlockNumber] = useState('');
  const [date, setDate] = useState('');
  const [day, setDay] = useState('');
  const [maintenance, setMaintenance] = useState({ track: '', start: null, end: null });
  const [trains, setTrains] = useState(initialTrains);
  const [selected, setSelected] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const kpis = useMemo(() => computeKPIs(trains, maintenance), [trains, maintenance]);

  const onDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
    // reduce default drag preview and avoid background interactions
    const img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
    e.dataTransfer.setDragImage(img, 0, 0);
    setIsDragging(true);
  };

  const onDropToTrack = (e, track) => {
    const id = e.dataTransfer.getData('text/plain');
    setTrains(prev => prev.map(t => (t.id === id ? { ...t, track } : t)));
    setIsDragging(false);
  };

  const onDragEnd = () => setIsDragging(false);

  const timeTick = (label) => (
    <div key={label} className="flex-1 text-center text-xs text-muted-foreground">
      <div>{label}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-60 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon name="Play" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Simulation</h1>
                <p className="text-muted-foreground">Interactive optimization and scenario testing</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-surface border border-border rounded-lg p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input label="Block Number" placeholder="Enter block number" value={blockNumber} onChange={(e)=>setBlockNumber(e.target.value)} />
              <Input label="Date" type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
              <Select label="Day" options={["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].map(d=>({label:d,value:d}))} value={day} onChange={setDay} />
              <div>
                <label className="text-sm font-medium text-foreground">Maintenance Window</label>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  <Select options={tracksList.map(t=>({label:t,value:t}))} value={maintenance.track} onChange={(v)=>setMaintenance(m=>({...m,track:v}))} placeholder="Track" />
                  <Input type="time" value={maintenance.start!=null?`$ {''}`:''} onChange={()=>{}} className="hidden" />
                  <Input placeholder="Start (HH:MM)" onChange={(e)=>{
                    const [h,m]=e.target.value.split(':').map(Number); setMaintenance(mw=>({...mw,start:h*60+m}))
                  }} />
                  <Input placeholder="End (HH:MM)" onChange={(e)=>{
                    const [h,m]=e.target.value.split(':').map(Number); setMaintenance(mw=>({...mw,end:h*60+m}))
                  }} />
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-surface border border-border rounded-lg overflow-hidden select-none">
            <div className="px-4 py-3 border-b border-border flex items-center gap-6 text-sm">
              <div className="flex items-center gap-3 text-xs">
                <span className="h-2 w-2 rounded-full bg-foreground/30" /> Normal
                <span className="h-2 w-2 rounded-full bg-primary" /> Optimized
                <span className="h-2 w-2 rounded-full bg-warning" /> Conflict
              </div>
            </div>
            <div className="px-4 py-3">
              <div className="flex items-center mb-2">
                {["06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00"].map(timeTick)}
              </div>

              {/* Tracks */}
              <div className="space-y-3">
                {tracksList.map(track => (
                  <div key={track} className="border-t border-border pt-3">
                    <div className="text-xs text-muted-foreground mb-1">{track}</div>
                    <div className="relative h-14 rounded bg-muted/20"
                      onDragOver={(e)=>e.preventDefault()}
                      onDrop={(e)=>onDropToTrack(e, track)}
                    >
                      {trains.filter(t=>t.track===track).map(t => (
                        <div
                          key={t.id}
                          draggable
                          onDragStart={(e)=>onDragStart(e, t.id)}
                          onDragEnd={onDragEnd}
                          onClick={()=>setSelected(t.id)}
                          className={`absolute top-2 h-10 ${t.color} text-primary-foreground rounded-md px-3 flex items-center cursor-grab shadow-railway-md`}
                          style={{ left: `${minutesToLeft(t.start)}%`, width: `${durationToWidth(t.start, t.end)}%` }}
                          title={`${t.name} ${Math.floor(t.start/60)}:${String(t.start%60).padStart(2,'0')} - ${Math.floor(t.end/60)}:${String(t.end%60).padStart(2,'0')}`}
                        >
                          <span className="truncate text-xs font-semibold">{t.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Selected train info card */}
          {selected && (
            <div className="mt-4 grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="bg-surface border border-border rounded-lg p-4 xl:col-span-1">
                {(() => { const t = trains.find(x=>x.id===selected); if (!t) return null; return (
                  <div>
                    <div className="text-base font-semibold text-foreground mb-2">{t.name}</div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div><div className="text-muted-foreground">Train ID</div><div className="font-medium">{t.id}</div></div>
                      <div><div className="text-muted-foreground">Track</div><div className="font-medium">{t.track}</div></div>
                      <div><div className="text-muted-foreground">Start</div><div className="font-mono">{`${Math.floor(t.start/60)}:${String(t.start%60).padStart(2,'0')}`}</div></div>
                      <div><div className="text-muted-foreground">End</div><div className="font-mono">{`${Math.floor(t.end/60)}:${String(t.end%60).padStart(2,'0')}`}</div></div>
                    </div>
                  </div>
                ); })()}
              </div>
              <div className="bg-surface border border-border rounded-lg p-4 xl:col-span-2">
                <div className="text-base font-semibold text-foreground mb-2">Optimization Preview</div>
                <div className="text-sm text-muted-foreground">Based on the current placement, the following actions minimize overlaps:</div>
                <ul className="list-disc pl-5 mt-2 text-sm">
                  {trains.filter((_,i)=>i<4).map((t,i)=> (
                    <li key={t.id} className="mb-1">Move <span className="font-medium">{t.name}</span> to {tracksList[(tracksList.indexOf(t.track)+1)%tracksList.length]} at {`${Math.max(6,Math.floor(t.start/60))}:00`} to reduce conflicts.</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* KPI and Suggestions */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
            <div className="bg-surface border border-border rounded-lg p-4">
              <div className="text-lg font-semibold text-foreground mb-2">Optimization Results</div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-md border border-border p-3 text-center">
                  <div className="text-2xl font-bold text-primary">{kpis.improvement}%</div>
                  <div className="text-xs text-muted-foreground">Improvement</div>
                </div>
                <div className="rounded-md border border-border p-3 text-center">
                  <div className="text-2xl font-bold text-foreground">{trains.length}</div>
                  <div className="text-xs text-muted-foreground">Trains Optimized</div>
                </div>
                <div className="rounded-md border border-border p-3 text-center">
                  <div className="text-2xl font-bold text-success">{Math.max(0,1-kpis.conflicts)}</div>
                  <div className="text-xs text-muted-foreground">Conflicts Resolved</div>
                </div>
                <div className="rounded-md border border-border p-3 text-center">
                  <div className="text-2xl font-bold text-warning">{kpis.conflicts}</div>
                  <div className="text-xs text-muted-foreground">Active Conflicts</div>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-sm font-medium text-foreground mb-1">Key Improvements</div>
                <ul className="text-sm text-muted-foreground list-disc pl-4">
                  <li>Reduced average delay via track reassignment</li>
                  <li>Improved track utilization based on selected block</li>
                  <li>{kpis.affected} trains adjusted due to maintenance</li>
                </ul>
              </div>
            </div>

            <div className="bg-surface border border-border rounded-lg p-4 xl:col-span-2">
              <div className="text-lg font-semibold text-foreground mb-3">AI Suggestions</div>
              <div className="space-y-3">
                {trains.slice(0,3).map(t => (
                  <div key={t.id} className="rounded-md border border-border p-3">
                    <div className="text-sm font-semibold text-foreground">Adjust {t.name}</div>
                    <div className="text-xs text-muted-foreground">Consider shifting to {tracksList[(tracksList.indexOf(t.track)+1)%tracksList.length]} between 10:00-11:00 to minimize overlap.</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Drag overlay to avoid background interactions while dragging */}
          {isDragging && (
            <div className="fixed inset-0 z-[999] cursor-grabbing" onDragOver={(e)=>e.preventDefault()} onDrop={(e)=>e.preventDefault()} />
          )}
        </main>
      </div>
    </div>
  );
};

export default Simulation;


