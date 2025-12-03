import React from 'react';
import { useProject } from '../context/ProjectContext';
import { BrainCircuit, Compass, Briefcase, FileCheck, Trash2 } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { currentStep, setCurrentStep, resetProject } = useProject();

  const steps = [
    { id: 0, label: 'Compétences', icon: BrainCircuit },
    { id: 1, label: 'Métiers & Plan', icon: Compass },
    { id: 2, label: 'Kit Candidature', icon: Briefcase },
    { id: 3, label: 'Synthèse', icon: FileCheck }
  ];

  const handleReset = () => {
    if (window.confirm("Êtes-vous sûr de vouloir tout effacer et recommencer à zéro ?")) {
      resetProject();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex-shrink-0 no-print flex flex-col">
        <div className="p-6 border-b border-slate-100">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            CareerFlow AI
          </h1>
          <p className="text-xs text-slate-500 mt-1">Assistant Projet Pro</p>
        </div>
        
        <nav className="p-4 space-y-2 flex-1">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            
            return (
              <button
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 
                  ${isActive ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'}
                `}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-blue-400' : ''}`} />
                {step.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button
            onClick={handleReset}
            className="w-full flex items-center gap-2 px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg text-sm font-medium transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            Tout effacer
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto print:p-0 print:overflow-visible">
        <div className="max-w-4xl mx-auto">
            {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;