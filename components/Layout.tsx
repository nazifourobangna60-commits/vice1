import React from 'react';
import { useProject } from '../context/ProjectContext';
import { BrainCircuit, Compass, Briefcase, FileCheck, Info } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { currentStep, setCurrentStep, skills, selectedJob } = useProject();

  const steps = [
    { id: 0, label: 'Compétences', icon: BrainCircuit, enabled: true },
    { id: 1, label: 'Métiers & Plan', icon: Compass, enabled: skills.length > 0 },
    { id: 2, label: 'Kit Candidature', icon: Briefcase, enabled: !!selectedJob },
    { id: 3, label: 'Synthèse', icon: FileCheck, enabled: !!selectedJob }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex-shrink-0 no-print">
        <div className="p-6 border-b border-slate-100">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            CareerFlow AI
          </h1>
          <p className="text-xs text-slate-500 mt-1">Assistant Projet Pro</p>
        </div>
        
        <nav className="p-4 space-y-2">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            
            return (
              <button
                key={step.id}
                onClick={() => step.enabled && setCurrentStep(step.id)}
                disabled={!step.enabled}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 
                  ${isActive ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'}
                  ${!step.enabled ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-blue-400' : ''}`} />
                {step.label}
                {isCompleted && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-green-500" />}
              </button>
            );
          })}
        </nav>

        <div className="p-6 mt-auto">
          <div className="bg-blue-50 p-4 rounded-lg text-xs text-blue-800 border border-blue-100">
            <div className="flex items-center gap-2 font-bold mb-1">
              <Info className="h-4 w-4" /> Info
            </div>
            Temps estimé total: 5h-6h. Prenez des pauses toutes les 45 min.
          </div>
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