import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Proposals from './components/Proposals';
import Game from './components/Game';
import { AppTab } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);

  // Simple Hash Router logic
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (Object.values(AppTab).includes(hash as AppTab)) {
        setActiveTab(hash as AppTab);
      }
    };

    // Set initial
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const updateTab = (tab: AppTab) => {
    window.location.hash = tab;
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.DASHBOARD:
        return <Dashboard />;
      case AppTab.PROPOSALS:
        return <Proposals />;
      case AppTab.GAME:
        return <Game />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={updateTab}>
      {renderContent()}
    </Layout>
  );
}

export default App;
