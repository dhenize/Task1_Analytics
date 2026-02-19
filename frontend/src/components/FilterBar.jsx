import React from 'react';

const FilterBar = ({ selectedPeriod, onPeriodChange, onGenerateReport }) => {
  const periods = [
    { value: 'daily', label: 'Daily', icon: '◉' },
    { value: 'weekly', label: 'Weekly', icon: '◎' },
    { value: 'monthly', label: 'Monthly', icon: '○' },
  ];

  return (
    <div style={{
      background: 'rgba(30, 41, 59, 0.7)',
      backdropFilter: 'blur(20px)',
      borderRadius: '16px',
      border: '1px solid rgba(255,255,255,0.08)',
      padding: '1rem 1.5rem',
      marginBottom: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '1rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600 }}>
          Period
        </span>
        <div style={{
          display: 'flex',
          background: 'rgba(15,23,42,0.6)',
          borderRadius: '10px',
          border: '1px solid rgba(255,255,255,0.06)',
          padding: '4px',
          gap: '2px',
        }}>
          {periods.map((period) => (
            <button
              key={period.value}
              onClick={() => onPeriodChange(period.value)}
              style={{
                padding: '6px 16px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontFamily: "'Sora', sans-serif",
                ...(selectedPeriod === period.value ? {
                  background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                  color: 'white',
                  boxShadow: '0 2px 12px rgba(59,130,246,0.4)',
                } : {
                  background: 'transparent',
                  color: '#94a3b8',
                })
              }}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onGenerateReport}
        style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '8px 20px',
          background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          fontSize: '0.82rem',
          fontWeight: 600,
          cursor: 'pointer',
          fontFamily: "'Sora', sans-serif",
          boxShadow: '0 4px 15px rgba(59,130,246,0.35)',
          transition: 'all 0.2s ease',
          letterSpacing: '0.01em',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(59,130,246,0.5)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(59,130,246,0.35)'; }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Generate Report
      </button>
    </div>
  );
};

export default FilterBar;