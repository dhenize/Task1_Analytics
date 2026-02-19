import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const SalesChart = ({ data, period }) => {

  const getDataKey = () => {
    if (period === 'daily') return 'date';
    if (period === 'weekly') return 'week';
    return 'month';
  };

  const formatXAxis = (value) => value;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      let displayLabel = label;
      if (period === 'weekly' && payload[0]?.payload?.start_date) {
        displayLabel = `${payload[0].payload.start_date} – ${payload[0].payload.end_date}`;
      }
      if (period === 'monthly' && payload[0]?.payload?.month_name) {
        displayLabel = payload[0].payload.month_name;
      }

      return (
        <div style={{
          background: 'rgba(15,23,42,0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '12px 16px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        }}>
          <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '8px', margin: '0 0 8px 0', fontFamily: "'Sora', sans-serif" }}>{displayLabel}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }} />
              <span style={{ fontSize: '0.82rem', color: '#e2e8f0', fontFamily: "'Sora', sans-serif" }}>
                Sales: <strong>${payload[0]?.value?.toLocaleString() || 0}</strong>
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22d3ee' }} />
              <span style={{ fontSize: '0.82rem', color: '#e2e8f0', fontFamily: "'Sora', sans-serif" }}>
                Orders: <strong>{payload[1]?.value || 0}</strong>
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  if (!data || data.length === 0) {
    return (
      <div className="card">
        <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '1rem' }}>Sales Overview</h3>
        <div style={{ height: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(15,23,42,0.3)', borderRadius: '12px' }}>
          <p style={{ color: '#64748b', fontFamily: "'Sora', sans-serif" }}>No sales data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', fontWeight: 700, color: '#f1f5f9', margin: 0 }}>Sales Overview</h3>
          <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '2px 0 0 0' }}>Revenue & order trends</p>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '24px', height: '3px', borderRadius: '2px', background: 'linear-gradient(90deg, #3b82f6, #6366f1)' }} />
            <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontFamily: "'Sora', sans-serif" }}>Sales</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '24px', height: '3px', borderRadius: '2px', background: 'linear-gradient(90deg, #22d3ee, #06b6d4)' }} />
            <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontFamily: "'Sora', sans-serif" }}>Orders</span>
          </div>
        </div>
      </div>
      <div style={{ height: '320px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis
              dataKey={getDataKey()}
              tickFormatter={formatXAxis}
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: '#64748b', fontSize: 11, fontFamily: "'Sora', sans-serif" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              yAxisId="left"
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: '#64748b', fontSize: 11, fontFamily: "'DM Mono', monospace" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: '#64748b', fontSize: 11, fontFamily: "'DM Mono', monospace" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }} />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="total_sales"
              name="Sales ($)"
              stroke="#3b82f6"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorSales)"
              dot={false}
              activeDot={{ r: 5, fill: '#3b82f6', stroke: '#0f172a', strokeWidth: 2 }}
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="order_count"
              name="Orders"
              stroke="#22d3ee"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorOrders)"
              dot={false}
              activeDot={{ r: 4, fill: '#22d3ee', stroke: '#0f172a', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;