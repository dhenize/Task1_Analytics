import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import FilterBar from '../components/FilterBar';
import SalesChart from '../components/SalesChart';
import TopProducts from '../components/TopProducts';
import PeakHours from '../components/PeakHours';
import CategorySales from '../components/CategorySales';
import ReportGenerator from '../components/ReportGenerator';
import SizeDistribution from '../components/SizeDistribution';
import PaymentMethods from '../components/PaymentMethods';
import { salesAPI } from '../services/api';

const Home = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('daily');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    sales_data: [],
    top_products: [],
    peak_hours: [],
    category_sales: [],
    metrics: {
      total_revenue: 0,
      total_orders: 0,
      avg_order_value: 0,
      active_customers: 0
    }
  });
  const [sizeData, setSizeData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    fetchDashboardData();
    fetchAdditionalData();
  }, [selectedPeriod]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const response = await salesAPI.getOverview(selectedPeriod);
      console.log('Dashboard data:', response.data);
      setDashboardData(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch dashboard data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAdditionalData = async () => {
    try {
      const sizes = await salesAPI.getSizeAnalytics();
      setSizeData(sizes.data);
      
      const payments = await salesAPI.getPaymentAnalytics();
      setPaymentData(payments.data);
    } catch (err) {
      console.error('Failed to fetch additional data:', err);
    }
  };

  const handleGenerateReport = () => {
    setShowReport(true);
  };

  const statConfigs = [
    {
      title: 'Total Revenue',
      value: `$${Number(dashboardData.metrics.total_revenue).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: '+12.5%',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      ),
      accent: 'linear-gradient(135deg, #3b82f6, #6366f1)',
      glow: 'rgba(59,130,246,0.25)',
    },
    {
      title: 'Total Orders',
      value: Number(dashboardData.metrics.total_orders).toLocaleString(),
      change: '+8.2%',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
      ),
      accent: 'linear-gradient(135deg, #22d3ee, #06b6d4)',
      glow: 'rgba(34,211,238,0.2)',
    },
    {
      title: 'Avg Order Value',
      value: `$${Number(dashboardData.metrics.avg_order_value).toFixed(2)}`,
      change: '+5.1%',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
      ),
      accent: 'linear-gradient(135deg, #a78bfa, #8b5cf6)',
      glow: 'rgba(167,139,250,0.2)',
    },
    {
      title: 'Active Customers',
      value: Number(dashboardData.metrics.active_customers).toLocaleString(),
      change: '+15.3%',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      accent: 'linear-gradient(135deg, #34d399, #10b981)',
      glow: 'rgba(52,211,153,0.2)',
    },
  ];

  const StatCard = ({ title, value, change, icon, accent, glow }) => (
    <div className="stat-card">
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, margin: '0 0 12px 0', fontFamily: "'Sora', sans-serif" }}>
            {title}
          </p>
          <p style={{ fontSize: '1.7rem', fontWeight: 800, color: '#f1f5f9', margin: '0 0 8px 0', fontFamily: "'Sora', sans-serif", letterSpacing: '-0.03em', lineHeight: 1 }}>
            {value}
          </p>
          {change && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: 600, fontFamily: "'DM Mono', monospace" }}>
                ↑ {change}
              </span>
              <span style={{ fontSize: '0.68rem', color: '#64748b' }}>vs last period</span>
            </div>
          )}
        </div>
        <div style={{
          width: '42px', height: '42px', borderRadius: '12px', flexShrink: 0,
          background: accent, color: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 6px 20px ${glow}`,
        }}>
          {icon}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <Layout>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: '16px' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '50%',
            border: '3px solid rgba(99,102,241,0.2)',
            borderTop: '3px solid #6366f1',
            animation: 'spin 0.8s linear infinite',
          }} />
          <p style={{ color: '#64748b', fontFamily: "'Sora', sans-serif", fontSize: '0.82rem' }}>Loading dashboard…</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          padding: '16px 20px',
          background: 'rgba(239,68,68,0.1)',
          border: '1px solid rgba(239,68,68,0.2)',
          borderRadius: '12px',
          color: '#fca5a5',
          fontFamily: "'Sora', sans-serif",
          fontSize: '0.85rem',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          {error}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <FilterBar
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
        onGenerateReport={handleGenerateReport}
      />

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {statConfigs.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Sales Chart */}
      <div style={{ marginBottom: '1.5rem' }}>
        <SalesChart data={dashboardData.sales_data} period={selectedPeriod} />
      </div>

      {/* Two Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <TopProducts products={dashboardData.top_products} />
        <PeakHours data={dashboardData.peak_hours} />
      </div>

      {/* Category Sales */}
      <div style={{ marginBottom: '1.5rem' }}>
        <CategorySales data={dashboardData.category_sales} />
      </div>

      {/* New Analytics Row - Size Distribution and Payment Methods */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <SizeDistribution data={sizeData} />
        <PaymentMethods data={paymentData} />
      </div>

      {/* Report Generator Modal */}
      <ReportGenerator
        isOpen={showReport}
        onClose={() => setShowReport(false)}
        data={{
          categoryData: dashboardData.category_sales,
          salesData: dashboardData.sales_data
        }}
        period={selectedPeriod}
      />
    </Layout>
  );
};

export default Home;