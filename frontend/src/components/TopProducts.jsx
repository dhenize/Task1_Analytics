import React from 'react';

const TopProducts = ({ products }) => {
  const rankStyles = [
    { bg: 'linear-gradient(135deg, #f59e0b, #d97706)', glow: 'rgba(245,158,11,0.3)', label: '#fbbf24' },
    { bg: 'linear-gradient(135deg, #94a3b8, #64748b)', glow: 'rgba(148,163,184,0.2)', label: '#cbd5e1' },
    { bg: 'linear-gradient(135deg, #f97316, #ea580c)', glow: 'rgba(249,115,22,0.2)', label: '#fb923c' },
  ];

  if (!products || products.length === 0) {
    return (
      <div className="card">
        <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '1rem' }}>Most Bought Uniforms</h3>
        <div style={{ height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(15,23,42,0.3)', borderRadius: '12px' }}>
          <p style={{ color: '#64748b', fontFamily: "'Sora', sans-serif" }}>No product data available</p>
        </div>
      </div>
    );
  }

  const maxQty = Math.max(...products.map(p => p.total_quantity || 0));

  return (
    <div className="card">
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', fontWeight: 700, color: '#f1f5f9', margin: 0 }}>Most Bought Uniforms</h3>
        <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '2px 0 0 0' }}>Top performing products</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {products.map((product, index) => {
          const rank = rankStyles[index] || { bg: 'rgba(59,130,246,0.2)', glow: 'rgba(59,130,246,0.1)', label: '#60a5fa' };
          const pct = maxQty > 0 ? (product.total_quantity / maxQty) * 100 : 0;

          return (
            <div
              key={index}
              style={{
                padding: '14px 16px',
                borderRadius: '12px',
                background: 'rgba(15,23,42,0.5)',
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'all 0.2s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(30,41,59,0.8)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(15,23,42,0.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* Rank badge */}
                <div style={{
                  width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
                  background: rank.bg,
                  boxShadow: `0 4px 12px ${rank.glow}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.72rem', fontWeight: 800, color: 'white',
                  fontFamily: "'DM Mono', monospace",
                }}>
                  #{index + 1}
                </div>

                {/* Product info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <div style={{ minWidth: 0 }}>
                      <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.85rem', fontWeight: 600, color: '#e2e8f0', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</p>
                      <p style={{ fontSize: '0.7rem', color: '#64748b', margin: '1px 0 0 0' }}>{product.category_name}</p>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '12px' }}>
                      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.85rem', fontWeight: 600, color: rank.label, margin: 0 }}>
                        {product.total_quantity} <span style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 400 }}>units</span>
                      </p>
                      <p style={{ fontSize: '0.7rem', color: '#64748b', margin: '1px 0 0 0', fontFamily: "'DM Mono', monospace" }}>
                        ${product.total_revenue?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', width: `${pct}%`,
                      background: rank.bg,
                      borderRadius: '2px',
                      transition: 'width 0.6s ease',
                    }} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopProducts;