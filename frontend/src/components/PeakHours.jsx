import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

const PeakHours = ({ data }) => {
  const formatHour = (hour) => {
    const h = parseInt(hour);
    if (h === 0) return '12 AM';
    if (h < 12) return `${h} AM`;
    if (h === 12) return '12 PM';
    return `${h - 12} PM`;
  };

  if (!data || data.length === 0) {
    return (
      <div className="card">
        <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '1rem' }}>Peak Ordering Hours</h3>
        <div style={{ height: '256px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(15,23,42,0.3)', borderRadius: '12px' }}>
          <p style={{ color: '#64748b', fontFamily: "'Sora', sans-serif" }}>No peak hours data available</p>
        </div>
      </div>
    );
  }

  const sortedData = [...data].sort((a, b) => a.hour - b.hour);
  const chartData = sortedData.map(item => ({
    hour: formatHour(item.hour),
    orders: item.order_count,
    sales: item.total_sales,
    rawHour: item.hour
  }));

  const maxOrders = Math.max(...chartData.map(d => d.orders));

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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <p style={{ fontSize: '0.82rem', color: '#e2e8f0', margin: 0, fontFamily: "'Sora', sans-serif" }}>
              Orders: <strong style={{ color: '#a78bfa' }}>{payload[0]?.value || 0}</strong>
            </p>
            <p style={{ fontSize: '0.82rem', color: '#e2e8f0', margin: 0, fontFamily: "'Sora', sans-serif" }}>
              Sales: <strong style={{ color: '#34d399' }}>${payload[0]?.payload?.sales?.toLocaleString() || 0}</strong>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card">
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', fontWeight: 700, color: '#f1f5f9', margin: 0 }}>Peak Ordering Hours</h3>
        <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '2px 0 0 0' }}>Order volume by time of day</p>
      </div>

      <div style={{ height: '256px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis
              dataKey="hour"
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: '#64748b', fontSize: 10, fontFamily: "'Sora', sans-serif" }}
              angle={-35}
              textAnchor="end"
              height={50}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: '#64748b', fontSize: 10, fontFamily: "'DM Mono', monospace" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
            <Bar dataKey="orders" radius={[6, 6, 0, 0]}>
              {chartData.map((entry, index) => {
                const intensity = maxOrders > 0 ? entry.orders / maxOrders : 0;
                const isPeak = intensity > 0.7;
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={isPeak
                      ? 'url(#peakGradient)'
                      : intensity > 0.4
                      ? 'rgba(99,102,241,0.6)'
                      : 'rgba(99,102,241,0.3)'
                    }
                  />
                );
              })}
            </Bar>
            <defs>
              <linearGradient id="peakGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.9}/>
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0.7}/>
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PeakHours;