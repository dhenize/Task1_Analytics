import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const PaymentMethods = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="card">
        <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '1rem' }}>Payment Methods</h3>
        <div style={{ height: '256px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(15,23,42,0.3)', borderRadius: '12px' }}>
          <p style={{ color: '#64748b', fontFamily: "'Sora', sans-serif" }}>No payment data available</p>
        </div>
      </div>
    );
  }

  const maxOrders = Math.max(...data.map(d => d.orders || 0));

  const barColors = [
    'url(#pay0)', 'url(#pay1)', 'url(#pay2)', 'url(#pay3)', 'url(#pay4)',
  ];

  const gradientDefs = [
    ['#3b82f6', '#6366f1'],
    ['#22d3ee', '#06b6d4'],
    ['#a78bfa', '#8b5cf6'],
    ['#34d399', '#10b981'],
    ['#f59e0b', '#f97316'],
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'rgba(15,23,42,0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '12px 16px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        }}>
          <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0 0 8px 0', fontFamily: "'Sora', sans-serif" }}>{label}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }} />
            <span style={{ fontSize: '0.82rem', color: '#e2e8f0', fontFamily: "'Sora', sans-serif" }}>
              Orders: <strong style={{ fontFamily: "'DM Mono', monospace" }}>{payload[0]?.value || 0}</strong>
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card">
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', fontWeight: 700, color: '#f1f5f9', margin: 0 }}>Payment Methods</h3>
        <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '2px 0 0 0' }}>Orders by payment type</p>
      </div>

      <div style={{ height: '256px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <defs>
              {gradientDefs.map(([c1, c2], i) => (
                <linearGradient key={i} id={`pay${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={c1} stopOpacity={0.9} />
                  <stop offset="100%" stopColor={c2} stopOpacity={0.6} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis
              dataKey="name"
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: '#64748b', fontSize: 11, fontFamily: "'Sora', sans-serif" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: '#64748b', fontSize: 11, fontFamily: "'DM Mono', monospace" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
            <Bar dataKey="orders" radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend row */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        {data.map((entry, index) => {
          const [c1] = gradientDefs[index % gradientDefs.length];
          return (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: c1 }} />
              <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontFamily: "'Sora', sans-serif" }}>{entry.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentMethods;