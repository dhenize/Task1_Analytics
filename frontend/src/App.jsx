import React, { useEffect, useState } from 'react';
import Home from './pages/Home';
import { salesAPI } from './services/api';

function App() {
  const [backendReady, setBackendReady] = useState(false);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        // Just check if backend is alive, don't setup database
        const response = await salesAPI.getOverview();
        console.log('Backend connected:', response.data);
        setBackendReady(true);
      } catch (error) {
        console.error('Backend connection failed:', error);
        // Still set to true to show the dashboard (it will show error state)
        setBackendReady(true);
      }
    };

    checkBackend();
  }, []);

  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;