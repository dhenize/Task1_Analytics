import React, { useState, useMemo } from 'react';

const CategorySales = ({ data }) => {
  const [expandedCategories, setExpandedCategories] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const toggleCategory = (categoryName) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  const toNumber = (value) => {
    if (value === null || value === undefined || value === '') return 0;
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num;
  };

  if (!data || data.length === 0) {
    return (
      <div className="card">
        <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '1rem' }}>Category Sales Breakdown</h3>
        <div style={{ height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(15,23,42,0.3)', borderRadius: '12px' }}>
          <p style={{ color: '#64748b', fontFamily: "'Sora', sans-serif" }}>No category data available</p>
        </div>
      </div>
    );
  }

  const types = ['all', ...new Set(data.map(item => item.type).filter(Boolean))];

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = item.category?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
      const matchesType = typeFilter === 'all' || item.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [data, searchTerm, typeFilter]);

  const groupedData = filteredData.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = { items: [], type: item.type };
    }
    acc[item.category].items.push(item);
    return acc;
  }, {});

  const categoryTotals = Object.entries(groupedData).map(([category, { items, type }]) => {
    const totalSales = items.reduce((sum, item) => sum + toNumber(item.total_sales), 0);
    const totalItems = items.reduce((sum, item) => sum + toNumber(item.total_items), 0);
    const orderCount = items.reduce((sum, item) => sum + toNumber(item.order_count), 0);
    return {
      category, type, totalSales, totalItems, orderCount,
      items: items.map(item => ({
        ...item,
        total_sales: toNumber(item.total_sales),
        total_items: toNumber(item.total_items),
        order_count: toNumber(item.order_count)
      }))
    };
  });

  const sortedCategories = [...categoryTotals].sort((a, b) => b.totalSales - a.totalSales);
  const maxSales = sortedCategories[0]?.totalSales || 1;

  const typeColors = {
    all: '#6366f1',
  };
  const getTypeColor = (type) => {
    const colors = ['#3b82f6', '#22d3ee', '#a78bfa', '#34d399', '#f59e0b', '#f87171'];
    const idx = types.indexOf(type);
    return colors[idx % colors.length] || '#6366f1';
  };

  return (
    <div className="card">
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', fontWeight: 700, color: '#f1f5f9', margin: 0 }}>Category Sales Breakdown</h3>
        <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '2px 0 0 0' }}>Detailed performance by uniform category</p>
      </div>

      {/* Search and Filter */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
          <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%', padding: '9px 12px 9px 36px',
              background: 'rgba(15,23,42,0.6)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '10px',
              color: '#e2e8f0', fontSize: '0.82rem',
              fontFamily: "'Sora', sans-serif",
              outline: 'none',
              boxSizing: 'border-box',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => e.target.style.borderColor = 'rgba(99,102,241,0.5)'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          style={{
            padding: '9px 32px 9px 14px',
            background: 'rgba(15,23,42,0.6)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '10px',
            color: '#e2e8f0', fontSize: '0.82rem',
            fontFamily: "'Sora', sans-serif",
            outline: 'none', cursor: 'pointer',
            minWidth: '130px',
          }}
        >
          {types.map(type => (
            <option key={type} value={type} style={{ background: '#1e293b' }}>
              {type === 'all' ? 'All Types' : type}
            </option>
          ))}
        </select>
      </div>

      <p style={{ fontSize: '0.72rem', color: '#64748b', marginBottom: '1rem', fontFamily: "'Sora', sans-serif" }}>
        Showing <strong style={{ color: '#94a3b8' }}>{sortedCategories.length}</strong> of <strong style={{ color: '#94a3b8' }}>{Object.keys(groupedData).length}</strong> categories
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {sortedCategories.map((category) => {
          const isExpanded = expandedCategories[category.category];
          const barWidth = (category.totalSales / maxSales) * 100;
          const typeColor = getTypeColor(category.type);

          return (
            <div
              key={category.category}
              style={{
                borderRadius: '12px',
                border: `1px solid ${isExpanded ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.05)'}`,
                overflow: 'hidden',
                transition: 'border-color 0.2s ease',
                background: 'rgba(15,23,42,0.4)',
              }}
            >
              <button
                onClick={() => toggleCategory(category.category)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center',
                  padding: '14px 16px',
                  background: isExpanded ? 'rgba(30,41,59,0.8)' : 'transparent',
                  border: 'none', cursor: 'pointer',
                  transition: 'background 0.2s ease', textAlign: 'left',
                  gap: '12px',
                }}
                onMouseEnter={e => { if (!isExpanded) e.currentTarget.style.background = 'rgba(30,41,59,0.5)'; }}
                onMouseLeave={e => { if (!isExpanded) e.currentTarget.style.background = 'transparent'; }}
              >
                {/* Color accent dot */}
                <div style={{ width: '4px', height: '36px', borderRadius: '2px', background: typeColor, flexShrink: 0 }} />

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <h4 style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.85rem', fontWeight: 600, color: '#e2e8f0', margin: 0 }}>
                      {category.category}
                    </h4>
                    <span style={{
                      fontSize: '0.65rem', padding: '2px 8px',
                      background: `${typeColor}20`, color: typeColor,
                      borderRadius: '20px', border: `1px solid ${typeColor}40`,
                      fontFamily: "'Sora', sans-serif", fontWeight: 600,
                      letterSpacing: '0.04em',
                    }}>
                      {category.type}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', marginBottom: '8px' }}>
                    <div style={{
                      height: '100%', width: `${barWidth}%`,
                      background: `linear-gradient(90deg, ${typeColor}, ${typeColor}80)`,
                      borderRadius: '2px', transition: 'width 0.6s ease',
                    }} />
                  </div>

                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.82rem', fontWeight: 600, color: typeColor }}>
                      ${category.totalSales.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{category.totalItems.toLocaleString()} items</span>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{category.orderCount.toLocaleString()} orders</span>
                  </div>
                </div>

                <div style={{
                  color: '#475569', fontSize: '0.7rem',
                  transform: isExpanded ? 'rotate(90deg)' : 'none',
                  transition: 'transform 0.2s ease',
                  flexShrink: 0,
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </div>
              </button>

              {isExpanded && (
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '400px' }}>
                      <thead>
                        <tr style={{ background: 'rgba(15,23,42,0.5)' }}>
                          {['Date', 'Orders', 'Items', 'Sales'].map(h => (
                            <th key={h} style={{
                              padding: '10px 16px',
                              fontSize: '0.65rem', fontWeight: 700,
                              color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em',
                              textAlign: h === 'Date' ? 'left' : 'right',
                              fontFamily: "'Sora', sans-serif",
                              borderBottom: '1px solid rgba(255,255,255,0.05)',
                            }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {category.items.map((item, idx) => {
                          let dateDisplay = 'N/A';
                          if (item.date) dateDisplay = item.date;
                          else if (item.start_date && item.end_date) dateDisplay = `${item.start_date} – ${item.end_date}`;
                          else if (item.month) dateDisplay = item.month;

                          return (
                            <tr
                              key={idx}
                              style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.15s' }}
                              onMouseEnter={e => e.currentTarget.style.background = 'rgba(99,102,241,0.05)'}
                              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                            >
                              <td style={{ padding: '10px 16px', fontSize: '0.8rem', color: '#94a3b8', fontFamily: "'Sora', sans-serif" }}>{dateDisplay}</td>
                              <td style={{ padding: '10px 16px', fontSize: '0.8rem', color: '#94a3b8', textAlign: 'right', fontFamily: "'DM Mono', monospace" }}>{item.order_count}</td>
                              <td style={{ padding: '10px 16px', fontSize: '0.8rem', color: '#94a3b8', textAlign: 'right', fontFamily: "'DM Mono', monospace" }}>{item.total_items}</td>
                              <td style={{ padding: '10px 16px', fontSize: '0.8rem', fontWeight: 600, color: typeColor, textAlign: 'right', fontFamily: "'DM Mono', monospace" }}>
                                ${item.total_sales.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </td>
                            </tr>
                          );
                        })}
                        {/* Total row */}
                        <tr style={{ background: 'rgba(99,102,241,0.08)', borderTop: `1px solid ${typeColor}30` }}>
                          <td style={{ padding: '10px 16px', fontSize: '0.8rem', fontWeight: 700, color: '#e2e8f0', fontFamily: "'Sora', sans-serif" }}>Category Total</td>
                          <td style={{ padding: '10px 16px', fontSize: '0.8rem', fontWeight: 700, color: '#e2e8f0', textAlign: 'right', fontFamily: "'DM Mono', monospace" }}>{category.orderCount.toLocaleString()}</td>
                          <td style={{ padding: '10px 16px', fontSize: '0.8rem', fontWeight: 700, color: '#e2e8f0', textAlign: 'right', fontFamily: "'DM Mono', monospace" }}>{category.totalItems.toLocaleString()}</td>
                          <td style={{ padding: '10px 16px', fontSize: '0.85rem', fontWeight: 700, color: typeColor, textAlign: 'right', fontFamily: "'DM Mono', monospace" }}>
                            ${category.totalSales.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySales;