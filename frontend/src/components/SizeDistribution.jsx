import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const GRADIENTS = [
  { id: 'sz0', c1: '#3b82f6', c2: '#6366f1' },
  { id: 'sz1', c1: '#22d3ee', c2: '#06b6d4' },
  { id: 'sz2', c1: '#a78bfa', c2: '#8b5cf6' },
  { id: 'sz3', c1: '#34d399', c2: '#10b981' },
  { id: 'sz4', c1: '#f59e0b', c2: '#f97316' },
];

const SizeDistribution = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="card">
        <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '1rem' }}>Size Distribution</h3>
        <div style={{ height: '256px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(15,23,42,0.3)', borderRadius: '12px' }}>
          <p style={{ color: '#64748b', fontFamily: "'Sora', sans-serif" }}>No size data available</p>
        </div>
      </div>
    );
  }

  const total = data.reduce((sum, d) => sum + (d.value || 0), 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const entry = payload[0];
      const pct = total > 0 ? ((entry.value / total) * 100).toFixed(1) : 0;
      const grad = GRADIENTS[data.findIndex(d => d.name === entry.name) % GRADIENTS.length];
      return (
        <div style={{
          background: 'rgba(15,23,42,0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '12px 16px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: grad.c1 }} />
            <p style={{ fontSize: '0.82rem', fontWeight: 600, color: '#e2e8f0', margin: 0, fontFamily: "'Sora', sans-serif" }}>{entry.name}</p>
          </div>
          <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0, fontFamily: "'DM Mono', monospace" }}>
            {entry.value?.toLocaleString()} units &nbsp;·&nbsp; <span style={{ color: grad.c1 }}>{pct}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom label inside pie slice (only for larger slices)
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
    if (percent < 0.08) return null;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central"
        style={{ fontSize: '11px', fontWeight: 700, fontFamily: "'Sora', sans-serif", pointerEvents: 'none' }}>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="card">
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', fontWeight: 700, color: '#f1f5f9', margin: 0 }}>Size Distribution</h3>
        <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '2px 0 0 0' }}>Uniform sizes sold</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
        {/* Chart */}
        <div style={{ flex: '0 0 auto', width: '200px', height: '200px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                {GRADIENTS.map(({ id, c1, c2 }) => (
                  <linearGradient key={id} id={id} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={c1} stopOpacity={0.95} />
                    <stop offset="100%" stopColor={c2} stopOpacity={0.75} />
                  </linearGradient>
                ))}
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
                labelLine={false}
                label={renderCustomLabel}
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`url(#${GRADIENTS[index % GRADIENTS.length].id})`}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend + stats */}
        <div style={{ flex: 1, minWidth: '140px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {data.map((entry, index) => {
            const grad = GRADIENTS[index % GRADIENTS.length];
            const pct = total > 0 ? ((entry.value / total) * 100) : 0;
            return (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {/* Color swatch */}
                <div style={{
                  width: '4px', height: '32px', borderRadius: '2px', flexShrink: 0,
                  background: `linear-gradient(180deg, ${grad.c1}, ${grad.c2})`,
                }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#e2e8f0', fontFamily: "'Sora', sans-serif" }}>{entry.name}</span>
                    <span style={{ fontSize: '0.75rem', fontFamily: "'DM Mono', monospace", color: grad.c1, fontWeight: 600 }}>{pct.toFixed(1)}%</span>
                  </div>
                  {/* Mini bar */}
                  <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px' }}>
                    <div style={{
                      height: '100%', width: `${pct}%`,
                      background: `linear-gradient(90deg, ${grad.c1}, ${grad.c2})`,
                      borderRadius: '2px', transition: 'width 0.6s ease',
                    }} />
                  </div>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#64748b', fontFamily: "'DM Mono', monospace", flexShrink: 0 }}>
                  {entry.value?.toLocaleString()}
                </span>
              </div>
            );
          })}

          {/* Total */}
          <div style={{
            marginTop: '4px', paddingTop: '10px',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "'Sora', sans-serif" }}>Total</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#e2e8f0', fontFamily: "'DM Mono', monospace" }}>{total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeDistribution;