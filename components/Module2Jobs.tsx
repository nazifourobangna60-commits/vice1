import React from 'react';
import { useProject } from '../context/ProjectContext';
import { suggestJobs } from '../services/geminiService';
import { Compass, Loader2, ArrowRight, Target, CheckSquare, AlertCircle } from 'lucide-react';

const Module2Jobs: React.FC = () => {
  const { skills, jobOptions, setJobOptions, selectedJob, setSelectedJob, loading, setLoading, setCurrentStep } = useProject();

  const handleDiscovery = async () => {
    setLoading(true);
    try {
      const result = await suggestJobs(skills);
      setJobOptions(result);
    } catch (e) {
      console.error(e);
      alert("Erreur lors de la génération des métiers.");
    } finally {
      setLoading(false);
    }
  };

  // Initial load trigger if no jobs yet
  React.useEffect(() => {
    if (jobOptions.length === 0 && !loading && skills.length > 0) {
      handleDiscovery();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (skills.length === 0) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2 mb-2">
            <Compass className="text-purple-600" />
            2. Exploration & Plan d'Action
          </h2>
        </div>
        
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-8 text-center">
          <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-amber-900 mb-2">Compétences manquantes</h3>
          <p className="text-amber-800 mb-6">
            Pour explorer des pistes de métiers pertinentes, l'IA a besoin de connaître vos compétences.
            Veuillez d'abord compléter l'étape 1.
          </p>
          <button
            onClick={() => setCurrentStep(0)}
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
          >
            Retourner à l'étape "Compétences"
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2 mb-2">
          <Compass className="text-purple-600" />
          2. Exploration & Plan d'Action
        </h2>
        <p className="text-slate-600">
          Basé sur vos 10 compétences identifiées, voici des pistes concrètes.
        </p>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-10 w-10 text-purple-600 animate-spin mb-4" />
          <p className="text-slate-500 animate-pulse">L'IA analyse vos compétences pour trouver les meilleurs métiers...</p>
        </div>
      )}

      {!loading && jobOptions.length > 0 && (
        <div className="grid md:grid-cols-3 gap-6">
          {jobOptions.map((job) => (
            <div 
              key={job.id} 
              onClick={() => setSelectedJob(job)}
              className={`cursor-pointer group relative p-6 rounded-xl border-2 transition-all duration-200 ${
                selectedJob?.id === job.id 
                  ? 'border-purple-600 bg-purple-50 shadow-md' 
                  : 'border-slate-100 bg-white hover:border-purple-300 hover:shadow-lg'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg text-slate-800 group-hover:text-purple-700">{job.title}</h3>
                {selectedJob?.id === job.id && <CheckSquare className="h-6 w-6 text-purple-600" />}
              </div>
              <p className="text-sm text-slate-600 mb-4 italic">"{job.matchReason}"</p>
              
              <div className="space-y-3">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Plan d'action express</p>
                {job.actionPlan.slice(0, 3).map((step, i) => (
                  <div key={i} className="flex gap-2 items-start text-sm text-slate-700">
                    <span className="bg-purple-100 text-purple-700 text-xs font-bold px-1.5 py-0.5 rounded mt-0.5">{i + 1}</span>
                    <span>{step.step}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedJob && (
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mt-6">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-600" />
            Détail du plan d'action pour : {selectedJob.title}
          </h3>
          <div className="grid gap-4">
             {selectedJob.actionPlan.map((step, idx) => (
               <div key={idx} className="flex gap-4 items-start bg-white p-4 rounded-lg border border-slate-200">
                 <div className="bg-purple-600 text-white h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                   {idx + 1}
                 </div>
                 <div>
                   <h4 className="font-semibold text-slate-800">{step.step}</h4>
                   <p className="text-slate-600 text-sm mt-1">{step.details}</p>
                 </div>
               </div>
             ))}
          </div>
          
          <div className="flex justify-end pt-8">
            <button
              onClick={() => setCurrentStep(2)}
              className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2 transition-transform active:scale-95 shadow-lg shadow-slate-200"
            >
              Étape suivante : Créer mon Kit Candidature <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Module2Jobs;