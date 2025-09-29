import React, { useState } from 'react';

const conversations = [
  { id: 'north', name: 'North Section', user: 'Rajesh Kumar', status: 'online', preview: 'Confirmed slot at 14:30', unread: 2 },
  { id: 'east', name: 'East Section', user: 'Amit Singh', status: 'busy', preview: 'Need urgent slot for T-12345', unread: 5 },
  { id: 'south', name: 'South Section', user: 'Priya Sharma', status: 'online', preview: 'Schedule updated successfully', unread: 0 },
  { id: 'west', name: 'West Section', user: 'Sunita Patel', status: 'offline', preview: 'Link down — investigating', unread: 0 },
];

const Thread = ({ messages }) => (
  <div className="space-y-3">
    {messages.map((m, i) => (
      <div key={i} className={`max-w-xl rounded-2xl px-4 py-3 ${m.side === 'left' ? 'bg-muted/40' : 'bg-primary text-primary-foreground ml-auto'}`}>{m.text}</div>
    ))}
  </div>
);

const Messages = () => {
  const [active, setActive] = useState('north');
  const [text, setText] = useState('');
  const [threads, setThreads] = useState({
    north: [{ side: 'left', text: 'Perfect! Confirmed slot at 14:30. Thank you for the quick response.' }],
    east: [{ side: 'left', text: 'Requesting urgent slot for T-12345' }],
    south: [{ side: 'left', text: 'Schedule updated successfully' }],
    west: [{ side: 'left', text: 'Investigating link issue' }],
  });

  const send = () => {
    if (!text.trim()) return;
    setThreads(prev => ({ ...prev, [active]: [...(prev[active] || []), { side: 'right', text }] }));
    setText('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <aside className="bg-surface border border-border rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-border text-sm font-semibold text-foreground">Corridor Communications</div>
        <div className="max-h-[420px] overflow-auto">
          {conversations.map(c => (
            <button key={c.id} onClick={() => setActive(c.id)} className={`w-full text-left px-4 py-3 border-b border-border ${active === c.id ? 'bg-muted/40' : ''}`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{c.user} • {c.status}</div>
                </div>
                {c.unread ? <span className="text-xs rounded-full bg-primary text-primary-foreground px-2 py-0.5">{c.unread}</span> : null}
              </div>
              <div className="text-xs text-muted-foreground mt-1 truncate">{c.preview}</div>
            </button>
          ))}
        </div>
      </aside>

      <section className="lg:col-span-2 bg-surface border border-border rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-border text-sm font-semibold text-foreground capitalize">{active} Section</div>
        <div className="p-4 max-h-[420px] overflow-auto">
          <Thread messages={threads[active] || []} />
        </div>
        <div className="p-3 border-t border-border flex items-center gap-2">
          <input value={text} onChange={e => setText(e.target.value)} placeholder="Type your message..." className="flex-1 h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none" />
          <button onClick={send} className="rounded-md bg-primary text-primary-foreground px-3 h-10 text-sm">Send</button>
        </div>
      </section>
    </div>
  );
};

export default Messages;


