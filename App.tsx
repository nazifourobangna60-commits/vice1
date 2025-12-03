import React from 'react';
import { ProjectProvider, useProject } from './context/ProjectContext';
import Layout from './components/Layout';
import Module1Skills from './components/Module1Skills';
import Module2Jobs from './components/Module2Jobs';
import Module3Kit from './components/Module3Kit';
import Summary from './components/Summary';

const AppContent: React.FC = () => {
  const { currentStep } = useProject();

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <Module1Skills />;
      case 1: return <Module2Jobs />;
      case 2: return <Module3Kit />;
      case 3: return <Summary />;
      default: return <Module1Skills />;
    }
  };

  return (
    <Layout>
      {renderStep()}
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <ProjectProvider>
      <AppContent />
    </ProjectProvider>
  );
};

export default App;