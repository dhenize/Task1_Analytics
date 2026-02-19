import React, { useState } from 'react';

const ReportGenerator = ({ isOpen, onClose, data, period }) => {
  const [reportType, setReportType] = useState('summary');

  if (!isOpen) return null;

  const toNumber = (value) => {
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num;
  };

  const generateCSV = () => {
    if (!data) { alert('No data available to generate report'); return; }

    let csvContent = "data:text/csv;charset=utf-8,";
    let filename = `uniform_sales_report_${period}_${new Date().toISOString().split('T')[0]}.csv`;

    if (reportType === 'summary') {
      csvContent += "Category,Type,Total Sales ($),Total Items,Total Orders\n";
      if (data.categoryData && data.categoryData.length > 0) {
        const categoryMap = new Map();
        data.categoryData.forEach(item => {
          const key = item.category;
          if (!categoryMap.has(key)) categoryMap.set(key, { category: item.category, type: item.type || 'N/A', totalSales: 0, totalItems: 0, totalOrders: 0 });
          const cat = categoryMap.get(key);
          cat.totalSales += toNumber(item.total_sales);
          cat.totalItems += toNumber(item.total_items);
          cat.totalOrders += toNumber(item.order_count);
        });
        categoryMap.forEach(cat => {
          csvContent += `${cat.category},${cat.type},$${cat.totalSales.toFixed(2)},${cat.totalItems},${cat.totalOrders}\n`;
        });
      } else { csvContent += "No category data available"; }
    } else {
      csvContent += "Period,Orders,Total Items,Total Sales ($)\n";
      if (data.salesData && data.salesData.length > 0) {
        data.salesData.forEach(item => {
          const period_label = item.date || item.week || item.month || 'N/A';
          csvContent += `${period_label},${toNumber(item.order_count)},${toNumber(item.total_items)},$${toNumber(item.total_sales).toFixed(2)}\n`;
        });
      } else { csvContent += "No sales data available"; }
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateWord = () => {
    if (!data) { alert('No data available to generate report'); return; }

    let htmlContent = `<!DOCTYPE html><html><head><title>Uniform Sales Report</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; color: #1e293b; }
        h1 { color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px; }
        h2 { color: #374151; margin-top: 30px; }
        table { border-collapse: collapse; width: 100%; margin-top: 20px; }
        th { background-color: #2563eb; color: white; padding: 12px; text-align: left; }
        td { padding: 10px; border-bottom: 1px solid #e5e7eb; }
        tr:hover { background-color: #f9fafb; }
        .footer { margin-top: 40px; color: #6b7280; font-size: 12px; text-align: center; }
      </style></head><body>
      <h1>School Uniform Sales Report</h1>
      <p><strong>Period:</strong> ${period.charAt(0).toUpperCase() + period.slice(1)}</p>
      <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>`;

    if (reportType === 'summary') {
      htmlContent += `<h2>Category Summary</h2>`;
      if (data.categoryData && data.categoryData.length > 0) {
        const categoryMap = new Map();
        data.categoryData.forEach(item => {
          const key = item.category;
          if (!categoryMap.has(key)) categoryMap.set(key, { category: item.category, type: item.type || 'N/A', totalSales: 0, totalItems: 0, totalOrders: 0 });
          const cat = categoryMap.get(key);
          cat.totalSales += toNumber(item.total_sales);
          cat.totalItems += toNumber(item.total_items);
          cat.totalOrders += toNumber(item.order_count);
        });
        htmlContent += `<table><tr><th>Category</th><th>Type</th><th>Total Sales ($)</th><th>Total Items</th><th>Total Orders</th></tr>`;
        categoryMap.forEach(cat => {
          htmlContent += `<tr><td><strong>${cat.category}</strong></td><td>${cat.type}</td><td>$${cat.totalSales.toFixed(2)}</td><td>${cat.totalItems.toLocaleString()}</td><td>${cat.totalOrders.toLocaleString()}</td></tr>`;
        });
        htmlContent += `</table>`;
        const grandTotalSales = Array.from(categoryMap.values()).reduce((sum, cat) => sum + cat.totalSales, 0);
        const grandTotalItems = Array.from(categoryMap.values()).reduce((sum, cat) => sum + cat.totalItems, 0);
        const grandTotalOrders = Array.from(categoryMap.values()).reduce((sum, cat) => sum + cat.totalOrders, 0);
        htmlContent += `<div style="margin-top:30px;padding:20px;background:#f3f4f6;border-radius:8px"><h3 style="margin-top:0">Grand Totals</h3><p><strong>Total Sales:</strong> $${grandTotalSales.toFixed(2)}</p><p><strong>Total Items:</strong> ${grandTotalItems.toLocaleString()}</p><p><strong>Total Orders:</strong> ${grandTotalOrders.toLocaleString()}</p></div>`;
      } else { htmlContent += `<p>No category data available</p>`; }
    } else {
      htmlContent += `<h2>Sales Overview</h2>`;
      if (data.salesData && data.salesData.length > 0) {
        htmlContent += `<table><tr><th>Period</th><th>Orders</th><th>Total Items</th><th>Total Sales ($)</th></tr>`;
        data.salesData.forEach(item => {
          const period_label = item.date || item.week || item.month || 'N/A';
          htmlContent += `<tr><td>${period_label}</td><td>${toNumber(item.order_count).toLocaleString()}</td><td>${toNumber(item.total_items).toLocaleString()}</td><td>$${toNumber(item.total_sales).toFixed(2)}</td></tr>`;
        });
        htmlContent += `</table>`;
        const totalOrders = data.salesData.reduce((sum, item) => sum + toNumber(item.order_count), 0);
        const totalItems = data.salesData.reduce((sum, item) => sum + toNumber(item.total_items), 0);
        const totalSales = data.salesData.reduce((sum, item) => sum + toNumber(item.total_sales), 0);
        htmlContent += `<div style="margin-top:30px;padding:20px;background:#f3f4f6;border-radius:8px"><h3 style="margin-top:0">Summary</h3><p><strong>Total Orders:</strong> ${totalOrders.toLocaleString()}</p><p><strong>Total Items Sold:</strong> ${totalItems.toLocaleString()}</p><p><strong>Total Revenue:</strong> $${totalSales.toFixed(2)}</p></div>`;
      } else { htmlContent += `<p>No sales data available</p>`; }
    }

    htmlContent += `<div class="footer"><p>Report generated by School Uniform Sales Analytics System</p></div></body></html>`;

    const blob = new Blob([htmlContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `uniform_sales_report_${period}_${new Date().toISOString().split('T')[0]}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const recordCount = reportType === 'summary' ? data?.categoryData?.length || 0 : data?.salesData?.length || 0;

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.7)',
      backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 50, padding: '1rem',
    }}>
      <div style={{
        background: '#0f172a',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '20px',
        boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
        width: '100%', maxWidth: '520px',
        overflow: 'hidden',
        animation: 'modalIn 0.2s ease',
      }}>
        {/* Header */}
        <div style={{
          padding: '24px 28px',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(99,102,241,0.05))',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '12px',
              background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(59,130,246,0.35)',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <div>
              <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', fontWeight: 700, color: '#f1f5f9', margin: 0 }}>Generate Report</h2>
              <p style={{ fontSize: '0.72rem', color: '#64748b', margin: 0 }}>Export your sales data</p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: '32px', height: '32px', borderRadius: '8px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#64748b', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#e2e8f0'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#64748b'; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px 28px' }}>
          {/* Report Type */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, margin: '0 0 12px 0', fontFamily: "'Sora', sans-serif" }}>Report Type</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {[
                { value: 'summary', label: 'Category Summary', desc: 'Group by category' },
                { value: 'detailed', label: 'Sales Overview', desc: 'Period-by-period' },
              ].map(opt => (
                <label
                  key={opt.value}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: '10px',
                    padding: '14px',
                    borderRadius: '12px',
                    border: `1px solid ${reportType === opt.value ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.06)'}`,
                    background: reportType === opt.value ? 'rgba(99,102,241,0.1)' : 'rgba(15,23,42,0.4)',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{
                    width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0, marginTop: '1px',
                    border: `2px solid ${reportType === opt.value ? '#6366f1' : 'rgba(255,255,255,0.15)'}`,
                    background: reportType === opt.value ? '#6366f1' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.15s',
                  }}>
                    {reportType === opt.value && (
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'white' }} />
                    )}
                  </div>
                  <input type="radio" value={opt.value} checked={reportType === opt.value} onChange={e => setReportType(e.target.value)} style={{ display: 'none' }} />
                  <div>
                    <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.82rem', fontWeight: 600, color: '#e2e8f0', margin: 0 }}>{opt.label}</p>
                    <p style={{ fontSize: '0.72rem', color: '#64748b', margin: '2px 0 0 0' }}>{opt.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Preview info */}
          <div style={{
            padding: '14px 16px', borderRadius: '12px',
            background: 'rgba(15,23,42,0.6)',
            border: '1px solid rgba(255,255,255,0.06)',
            marginBottom: '20px',
            display: 'flex', gap: '24px',
          }}>
            <div>
              <p style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 2px 0', fontFamily: "'Sora', sans-serif" }}>Period</p>
              <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e2e8f0', margin: 0, fontFamily: "'Sora', sans-serif" }}>{period.charAt(0).toUpperCase() + period.slice(1)}</p>
            </div>
            <div style={{ width: '1px', background: 'rgba(255,255,255,0.06)' }} />
            <div>
              <p style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 2px 0', fontFamily: "'Sora', sans-serif" }}>Records</p>
              <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e2e8f0', margin: 0, fontFamily: "'DM Mono', monospace" }}>{recordCount}</p>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <button
              onClick={generateCSV}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                padding: '12px',
                background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                color: 'white', border: 'none', borderRadius: '12px',
                fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
                fontFamily: "'Sora', sans-serif",
                boxShadow: '0 4px 15px rgba(59,130,246,0.35)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(59,130,246,0.45)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(59,130,246,0.35)'; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              CSV
            </button>
            <button
              onClick={generateWord}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                padding: '12px',
                background: 'rgba(255,255,255,0.06)',
                color: '#e2e8f0', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
                fontFamily: "'Sora', sans-serif",
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
              Word
            </button>
          </div>
        </div>

        <style>{`@keyframes modalIn { from { opacity: 0; transform: scale(0.96) translateY(8px); } to { opacity: 1; transform: scale(1) translateY(0); } }`}</style>
      </div>
    </div>
  );
};

export default ReportGenerator;