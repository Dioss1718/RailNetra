import React, { useEffect, useMemo, useState } from 'react';
import Sidebar from '../../components/ui/Sidebar';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as ReTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid
} from 'recharts';

const QuickAction = ({ icon, children }) => (
  <Button
    variant="secondary"
    className="h-auto py-3 px-4 whitespace-normal break-words text-left items-start"
    fullWidth
  >
    <div className="flex items-start gap-3">
      <Icon name={icon} size={18} className="mt-0.5 flex-shrink-0" />
      <span className="block leading-snug">{children}</span>
    </div>
  </Button>
);

const Dashboard = () => {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const t = setInterval(()=>setNow(new Date()), 1000); return () => clearInterval(t); }, []);

  const hourlyData = useMemo(() => (
    Array.from({ length: 24 }).map((_, i) => ({ hour: `${String(i).padStart(2,'0')}:00`, value: Math.round(30 + 70 * Math.abs(Math.sin(i / 24 * Math.PI * 2))) }))
  ), []);

  const weeklyDelays = [
    { day: 'Mon', val: 4.8 }, { day: 'Tue', val: 3.9 }, { day: 'Wed', val: 5.1 },
    { day: 'Thu', val: 4.1 }, { day: 'Fri', val: 3.4 }, { day: 'Sat', val: 4.6 }, { day: 'Sun', val: 4.2 }
  ];

  const kpis = {
    throughput: 847,
    avgDelayMin: 4.2,
    punctuality: 94.7,
    savings: 2.4,
    platformUtil: 78.3,
    mttr: 2.8,
    acceptance: 87.2,
    veto: 0.3
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-60 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon name="LayoutDashboard" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
                <p className="text-muted-foreground">Operational overview</p>
              </div>
            </div>
            <div className="hidden md:block text-sm text-muted-foreground">
              Current Time: <span className="font-mono text-foreground">{now.toLocaleTimeString()}</span>
            </div>
          </div>

          {/* System Alerts */}
          <section className="space-y-3 mb-6">
            <div className="bg-surface border border-border rounded-lg p-4 flex items-start gap-3">
              <Icon name="AlertCircle" size={18} className="text-warning mt-0.5" />
              <div className="flex-1">
                <div className="text-sm font-semibold text-foreground">Maintenance Window Active</div>
                <div className="text-sm text-muted-foreground">Track maintenance on Section B-12 continues until 14:30 IST. Expect minor delays.</div>
                <div className="text-xs text-muted-foreground mt-1">{now.toLocaleTimeString()}</div>
              </div>
            </div>
            <div className="bg-surface border border-border rounded-lg p-4 flex items-start gap-3">
              <Icon name="Brain" size={18} className="text-primary mt-0.5" />
              <div className="flex-1">
                <div className="text-sm font-semibold text-foreground">AI Optimization Complete</div>
                <div className="text-sm text-muted-foreground">Evening peak-hour optimization ready. 3 suggestions pending review.</div>
                <div className="text-xs text-muted-foreground mt-1">{now.toLocaleTimeString()}</div>
              </div>
            </div>
            <div className="bg-surface border border-border rounded-lg p-4 flex items-start gap-3">
              <Icon name="AlertTriangle" size={18} className="text-error mt-0.5" />
              <div className="flex-1">
                <div className="text-sm font-semibold text-error">Signal System Alert • HIGH</div>
                <div className="text-sm text-muted-foreground">Intermittent communication issues detected on Junction X. Team dispatched.</div>
                <div className="text-xs text-muted-foreground mt-1">{now.toLocaleTimeString()}</div>
              </div>
            </div>
          </section>

          {/* KPI Cards */}
          <section className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-surface border border-border rounded-lg p-4">
              <div className="text-sm text-muted-foreground">Section Throughput <span className="text-success">↑ +12%</span></div>
              <div className="text-4xl font-bold text-foreground mt-2">{kpis.throughput}</div>
              <div className="text-xs text-muted-foreground">trains/day</div>
            </div>
            <div className="bg-surface border border-border rounded-lg p-4">
              <div className="text-sm text-muted-foreground">Average Delays <span className="text-error">↓ -8%</span></div>
              <div className="text-4xl font-bold text-foreground mt-2">{kpis.avgDelayMin}</div>
              <div className="text-xs text-muted-foreground">minutes</div>
            </div>
            <div className="bg-surface border border-border rounded-lg p-4">
              <div className="text-sm text-muted-foreground">Punctuality Rate <span className="text-success">↑ +2.1%</span></div>
              <div className="text-4xl font-bold text-foreground mt-2">{kpis.punctuality}%</div>
            </div>
            <div className="bg-surface border border-border rounded-lg p-4">
              <div className="text-sm text-muted-foreground">Delay Savings <span className="text-success">↑ +15%</span></div>
              <div className="text-4xl font-bold text-foreground mt-2">₹{kpis.savings} <span className="text-xl">Cr</span></div>
            </div>
          </section>

          {/* Secondary KPI */}
          <section className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-surface border border-border rounded-lg p-4">
              <div className="text-sm text-muted-foreground">Platform Utilization <span className="text-success">↑ +5%</span></div>
              <div className="text-4xl font-bold text-foreground mt-2">{kpis.platformUtil}%</div>
            </div>
            <div className="bg-surface border border-border rounded-lg p-4">
              <div className="text-sm text-muted-foreground">MTTR <span className="text-error">↓ -12%</span></div>
              <div className="text-4xl font-bold text-foreground mt-2">{kpis.mttr}</div>
              <div className="text-xs text-muted-foreground">hours</div>
            </div>
            <div className="bg-surface border border-border rounded-lg p-4">
              <div className="text-sm text-muted-foreground">AI Acceptance Rate <span className="text-success">↑ +3%</span></div>
              <div className="text-4xl font-bold text-foreground mt-2">{kpis.acceptance}%</div>
            </div>
            <div className="bg-surface border border-border rounded-lg p-4">
              <div className="text-sm text-muted-foreground">Safety Veto Rate <span className="text-error">↓ -0.1%</span></div>
              <div className="text-4xl font-bold text-foreground mt-2">{kpis.veto}%</div>
            </div>
          </section>

          {/* Analytics */}
          <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            <div className="bg-surface border border-border rounded-lg p-4">
              <div className="text-base font-semibold text-foreground mb-2">Hourly Throughput</div>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={hourlyData} margin={{ left: 12, right: 12, top: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="hour" tick={{ fontSize: 12 }} stroke="var(--color-muted-foreground)" />
                    <YAxis tick={{ fontSize: 12 }} stroke="var(--color-muted-foreground)" />
                    <ReTooltip cursor={{ stroke: 'var(--color-border)' }} />
                    <Line type="monotone" dataKey="value" stroke="var(--color-primary)" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-surface border border-border rounded-lg p-4">
              <div className="text-base font-semibold text-foreground mb-2">Weekly Delays</div>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyDelays} margin={{ left: 12, right: 12, top: 10, bottom: 0 }}>
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="var(--color-muted-foreground)" />
                    <YAxis tick={{ fontSize: 12 }} stroke="var(--color-muted-foreground)" />
                    <ReTooltip />
                    <Bar dataKey="val" fill="var(--color-warning)" radius={[4,4,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-surface border border-border rounded-lg p-4">
              <div className="text-base font-semibold text-foreground mb-2">Punctuality Trend</div>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[{w:'Week 1',p:94.2},{w:'Week 2',p:95.1},{w:'Week 3',p:95.3},{w:'Week 4',p:95.6}]}
                    margin={{ left: 12, right: 12, top: 10, bottom: 0 }}>
                    <XAxis dataKey="w" tick={{ fontSize: 12 }} stroke="var(--color-muted-foreground)" />
                    <YAxis tick={{ fontSize: 12 }} stroke="var(--color-muted-foreground)" />
                    <ReTooltip />
                    <Line type="linear" dataKey="p" stroke="var(--color-success)" strokeWidth={2} dot />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          {/* Quick Actions, Recent Activity, System Status */}
          <section className="mb-6">
            <h2 className="text-base font-semibold text-foreground mb-3">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <a href="/trains/add"><QuickAction icon="Train">Add New Train Service</QuickAction></a>
              <a href="/schedule-changes"><QuickAction icon="Calendar">Review Schedule Changes</QuickAction></a>
              <a href="/incidents/report"><QuickAction icon="AlertTriangle">Report Incident</QuickAction></a>
              <a href="/reports/daily"><QuickAction icon="FileText">Generate Daily Movement Summary Report</QuickAction></a>
              <a href="/broadcast"><QuickAction icon="Megaphone">System Broadcast</QuickAction></a>
              <a href="/maintenance"><QuickAction icon="Wrench">Schedule Maintenance</QuickAction></a>
            </div>
          </section>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 bg-surface border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-base font-semibold text-foreground">Recent Activity</div>
                <button className="text-sm text-muted-foreground hover:text-foreground">View All</button>
              </div>
              <div className="max-h-64 overflow-auto space-y-3">
                {[{t:'Schedule Updated',d:'Train 12345 Delhi–Mumbai rescheduled by 15 minutes',ago:'2 minutes ago'},
                  {t:'AI Suggestion Accepted',d:'Platform optimization for Sector 7',ago:'5 minutes ago'},
                  {t:'Maintenance Window Started',d:'Section B-12 initiated',ago:'12 minutes ago'}].map((a,i)=> (
                  <div key={i} className="rounded-md border border-border p-3">
                    <div className="text-sm font-semibold text-foreground">{a.t}</div>
                    <div className="text-sm text-muted-foreground">{a.d}</div>
                    <div className="text-xs text-muted-foreground mt-1">{a.ago}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-surface border border-border rounded-lg p-4">
              <div className="text-base font-semibold text-foreground mb-2">System Status</div>
              <div className="space-y-3 text-sm">
                {[{n:'Signaling System',s:'Online'},{n:'Communication Network',s:'Online'},{n:'Power Supply',s:'Warning'},{n:'AI Optimization Engine',s:'Online'},{n:'Database Systems',s:'Online'},{n:'Backup Systems',s:'Maintenance'}].map((s,i)=> (
                  <div key={i} className="flex items-center justify-between border border-border rounded-md px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${s.s==='Online' ? 'bg-success' : s.s==='Warning' ? 'bg-warning' : 'bg-muted'}`} />
                      <span className="text-foreground">{s.n}</span>
                    </div>
                    <span className={`text-xs ${s.s==='Online' ? 'text-success' : s.s==='Warning' ? 'text-warning' : 'text-muted-foreground'}`}>{s.s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;


