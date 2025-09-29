import React, { useEffect, useRef, useState } from 'react';
import Sidebar from '../../components/ui/Sidebar';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import Input from '../../components/ui/Input';

const LiveMapPage = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [styleLoaded, setStyleLoaded] = useState(false);
  const markersRef = useRef(new Map());
  const popupRef = useRef(null);
  const [liveTrains, setLiveTrains] = useState([]);
  const API_BASE = import.meta?.env?.VITE_RAIL_API || 'http://localhost:8000';
  const [region, setRegion] = useState('all');
  const mockActiveRef = useRef(false);
  const mockTimerRef = useRef(null);
  const mockStateRef = useRef([]);

  useEffect(() => {
    if (!mapContainerRef?.current || mapRef.current || !window?.maplibregl) return;

    const map = new window.maplibregl.Map({
      container: mapContainerRef.current,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [78.9629, 22.5937],
      zoom: 4.5,
      attributionControl: false
    });

    map.addControl(new window.maplibregl.NavigationControl({ showCompass: true }), 'top-right');
    map.addControl(new window.maplibregl.ScaleControl({ maxWidth: 120, unit: 'metric' }));
    map.addControl(new window.maplibregl.AttributionControl({ compact: true }));

    map.on('styledata', () => setStyleLoaded(true));

    // Add OSM base + OpenRailwayMap raster overlay for realistic railway style
    map.on('load', () => {
      try {
        if (!map.getSource('osm-base')) {
          map.addSource('osm-base', {
            type: 'raster',
            tiles: [
              'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
              'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
              'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
            ],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors'
          });
          map.addLayer({ id: 'osm-base-layer', type: 'raster', source: 'osm-base', paint: { 'raster-opacity': 1 } });
        }
        if (!map.getSource('openrailwaymap')) {
          map.addSource('openrailwaymap', {
            type: 'raster',
            tiles: [
              'https://a.tile.openrailwaymap.org/standard/{z}/{x}/{y}.png',
              'https://b.tile.openrailwaymap.org/standard/{z}/{x}/{y}.png',
              'https://c.tile.openrailwaymap.org/standard/{z}/{x}/{y}.png'
            ],
            tileSize: 256,
            attribution: 'Map data © OpenStreetMap contributors, tiles © OpenRailwayMap'
          });
          map.addLayer({
            id: 'openrailwaymap-layer',
            type: 'raster',
            source: 'openrailwaymap',
            paint: { 'raster-opacity': 0.8 }
          });
        }
      } catch {}
    });
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Region fly-to
  useEffect(() => {
    if (!mapRef.current) return;
    const views = {
      all: { center: [78.9629, 22.5937], zoom: 4.5 },
      nr: { center: [77.2, 28.6], zoom: 6.5 }, // Northern Railway (Delhi region)
      wr: { center: [72.8777, 19.076], zoom: 7 }, // Western (Mumbai)
      cr: { center: [73.8567, 18.5204], zoom: 7 }, // Central (Pune region)
    };
    const v = views[region] || views.all;
    mapRef.current.flyTo({ center: v.center, zoom: v.zoom, speed: 0.8 });
  }, [region]);

  // Poll live data and update markers
  useEffect(() => {
    if (!mapRef.current) return;

    let cancelled = false;

    const statusToColor = (status) => {
      if (status === 'waiting_for_platform' || status === 'delayed') return '#ef4444'; // red
      if (status === 'boarding') return '#f59e0b'; // orange
      return '#22c55e'; // green
    };

    const createOrUpdateMarker = (train) => {
      const id = String(train?.train_id ?? 'unknown');
      let marker = markersRef.current.get(id);

      const color = statusToColor(train?.status);
      const el = document.createElement('div');
      el.style.padding = '2px 6px';
      el.style.minWidth = '28px';
      el.style.height = '18px';
      el.style.borderRadius = '3px';
      el.style.boxShadow = '0 0 0 2px rgba(0,0,0,0.15)';
      el.style.backgroundColor = color;
      el.style.color = '#0b1220';
      el.style.fontSize = '11px';
      el.style.fontWeight = '600';
      el.style.fontFamily = 'Inter, system-ui, sans-serif';
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'center';
      el.style.whiteSpace = 'nowrap';
      el.style.transform = 'translate(-50%, -50%)';
      el.innerText = id;
      el.title = `${id} • ${train?.status || 'unknown'}${train?.platform ? ` • PF ${train.platform}` : ''}`;

      const handleClick = () => {
        try {
          if (!mapRef.current) return;
          const lngLat = marker?.getLngLat() || { lng: train?.lon, lat: train?.lat };
          if (popupRef.current) popupRef.current.remove();
          const html = `
            <div style="min-width:180px">
              <div style="font-weight:600;margin-bottom:4px">Train ${id}</div>
              <div style="font-size:12px;opacity:0.8">Status: ${train?.status || '—'}</div>
              <div style="font-size:12px;opacity:0.8">Speed: ${train?.speed_kmph ?? '—'} km/h</div>
              ${train?.platform ? `<div style=\"font-size:12px;opacity:0.8\">Platform: ${train.platform}</div>` : ''}
              <div style="font-size:11px;opacity:0.7;margin-top:4px">${train?.timestamp || ''}</div>
            </div>`;
          popupRef.current = new window.maplibregl.Popup({ closeOnClick: true })
            .setLngLat(lngLat)
            .setHTML(html)
            .addTo(mapRef.current);
        } catch {}
      };

      el.onclick = handleClick;

      if (!marker) {
        marker = new window.maplibregl.Marker({ element: el, anchor: 'center' })
          .setLngLat([train?.lon ?? 0, train?.lat ?? 0])
          .addTo(mapRef.current);
        markersRef.current.set(id, marker);
      } else {
        marker.setElement(el);
        if (Number.isFinite(train?.lon) && Number.isFinite(train?.lat)) {
          marker.setLngLat([train.lon, train.lat]);
        }
      }
    };

    const syncMarkers = (trains) => {
      const ids = new Set(trains.map(t => String(t?.train_id ?? 'unknown')));
      // remove stale markers
      for (const [id, m] of markersRef.current.entries()) {
        if (!ids.has(id)) {
          m.remove();
          markersRef.current.delete(id);
        }
      }
      // upsert markers
      trains.forEach(createOrUpdateMarker);
    };

    const fetchLive = async () => {
      try {
        const res = await fetch(`${API_BASE}/live`, { headers: { 'accept': 'application/json' }});
        const data = await res.json();
        if (!cancelled && Array.isArray(data)) {
          const valid = data.filter(t => Number.isFinite(t?.lat) && Number.isFinite(t?.lon));
          setLiveTrains(valid);
          if (valid.length === 0 && !mockActiveRef.current) {
            startMockSimulation(syncMarkers);
          } else if (valid.length > 0 && mockActiveRef.current) {
            stopMock();
          }
          syncMarkers(valid);
        }
      } catch (e) {
        // network errors ignored for demo; keep last state
      }
    };

    // Start mock immediately for demo visibility; real data will override and stop it when present
    if (!mockActiveRef.current) {
      startMockSimulation(syncMarkers);
    }
    fetchLive();
    const id = setInterval(fetchLive, 2000);
    return () => { cancelled = true; clearInterval(id); stopMock(); };
  }, [API_BASE]);

  // Mock simulation
  const startMockSimulation = (syncMarkers) => {
    mockActiveRef.current = true;
    const cities = {
      delhi: [77.209, 28.6139],
      mumbai: [72.8777, 19.076],
      kolkata: [88.3639, 22.5726],
      chennai: [80.2707, 13.0827],
      ahmedabad: [72.5714, 23.0225]
    };
    const routes = [
      { id: '12301', path: [cities.delhi, cities.ahmedabad, cities.mumbai] },
      { id: '12951', path: [cities.delhi, [83.0, 25.3], cities.kolkata] },
      { id: '12009', path: [cities.chennai, [78.1, 15.4], cities.mumbai] },
      { id: '12267', path: [cities.mumbai, [76.9, 21.2], cities.delhi] },
      { id: '12432', path: [cities.kolkata, [85.4, 24.6], cities.delhi] },
      { id: '12618', path: [[76.6, 10.1], [77.7, 12.9], cities.chennai] },
      { id: '22691', path: [cities.mumbai, [74.3, 22.7], cities.ahmedabad] },
      { id: '19019', path: [cities.ahmedabad, [76.0, 24.8], cities.delhi] },
      { id: '22823', path: [cities.kolkata, [84.0, 20.2], cities.chennai] },
      { id: '22105', path: [cities.delhi, [76.0, 23.2], cities.chennai] }
    ];
    mockStateRef.current = routes.map((r, idx) => ({ id: r.id, path: r.path, progress: (0.09 * idx) % 1, speed_kmph: 80 + 3*idx, status: 'en_route' }));

    const interp = (path, prog) => {
      const segs = path.length - 1;
      const pos = prog * segs;
      const i = Math.max(0, Math.min(segs - 1, Math.floor(pos)));
      const t = pos - i;
      const [lon1, lat1] = path[i];
      const [lon2, lat2] = path[i + 1];
      return { lon: lon1 + (lon2 - lon1) * t, lat: lat1 + (lat2 - lat1) * t };
    };

    const tick = () => {
      const data = mockStateRef.current.map((m, i) => {
        m.progress = (m.progress + 0.012 + i * 0.0004) % 1;
        const pos = interp(m.path, m.progress);
        const status = m.progress < 0.02 ? 'boarding' : m.progress > 0.98 ? 'arrived' : 'en_route';
        return { train_id: m.id, lat: pos.lat, lon: pos.lon, status, speed_kmph: m.speed_kmph };
      });
      setLiveTrains(data);
      syncMarkers(data);
    };
    tick();
    mockTimerRef.current = setInterval(tick, 1500);
  };

  const stopMock = () => {
    mockActiveRef.current = false;
    if (mockTimerRef.current) clearInterval(mockTimerRef.current);
    mockTimerRef.current = null;
  };

  const handleResetView = () => {
    if (!mapRef.current) return;
    mapRef.current.flyTo({ center: [78.9629, 22.5937], zoom: 4.5, speed: 0.8 });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-60">
          <div className="flex h-[calc(100vh-0px)]">
            {/* Left control panel */}
            <aside className="w-80 shrink-0 border-r border-border bg-surface flex flex-col">
              <div className="p-4 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground">Live Map Controls</h2>
                <p className="text-sm text-muted-foreground">Trusted Railway Operations View</p>
              </div>
              <div className="p-4 space-y-4 overflow-auto">
                <Select
                  label="Region"
                  options={[
                    { label: 'All Zones', value: 'all' },
                    { label: 'Northern Railway', value: 'nr' },
                    { label: 'Western Railway', value: 'wr' },
                    { label: 'Central Railway', value: 'cr' },
                  ]}
                  value={region}
                  onChange={setRegion}
                />
                <Select
                  label="Layer"
                  options={[
                    { label: 'Base + Lines', value: 'base' },
                    { label: 'Stations', value: 'stations' },
                    { label: 'Traffic Heat', value: 'heat' },
                  ]}
                  defaultValue={'base'}
                />
                <Input label="Search station/train" placeholder="Type name or number" />
              </div>
              <div className="p-4 border-t border-border mt-auto">
                <Button fullWidth variant="outline" onClick={handleResetView}>
                  Reset View
                </Button>
              </div>
            </aside>

            {/* Map container */}
            <section className="flex-1 relative">
              <div ref={mapContainerRef} className="absolute inset-0" />
              {!styleLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-surface/80 backdrop-blur-md border border-border rounded-md px-4 py-2 text-sm text-muted-foreground">
                    Loading map…
                  </div>
                </div>
              )}
              <div className="absolute left-3 bottom-3 bg-surface/90 backdrop-blur-md border border-border rounded-md px-3 py-2 text-xs text-muted-foreground shadow-railway-md flex items-center gap-3">
                <span>Ministry of Railways • Operational View</span>
                <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{background:'#22c55e'}} /> On time</span>
                <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{background:'#f59e0b'}} /> Boarding/Other</span>
                <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{background:'#ef4444'}} /> Delayed</span>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LiveMapPage;


