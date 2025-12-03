import React from 'react';
import { useProject } from '../context/ProjectContext';
import { generateApplicationKit } from '../services/geminiService';
import { Briefcase, Loader2, FileText, Linkedin, UserCircle, ArrowRight } from 'lucide-react';

const Module3Kit: React.FC = () => {
  const { selectedJob, skills, userBio, applicationKit, setApplicationKit, loading, setLoading, setCurrentStep } = useProject();

  const handleGenerate = async () => {
    if (!selectedJob) return;
    setLoading(true);
    try {
      const result = await generateApplicationKit(selectedJob, skills, userBio);
      setApplicationKit(result);
    } catch (e) {
      console.error(e);
      alert("Erreur lors de la génération du kit.");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (selectedJob && !applicationKit.coverLetter && !loading) {
      handleGenerate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!selectedJob) {
    return (
      <div className="p-8 text-center text-slate-500">
        Veuillez d'abord sélectionner un métier à l'étape précédente.
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2 mb-2">
          <Briefcase className="text-orange-600" />
          3. Kit de Candidature International
        </h2>
        <p className="text-slate-600">
          Documents générés pour le poste de <strong>{selectedJob.title}</strong>.
        </p>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-10 w-10 text-orange-600 animate-spin mb-4" />
          <p className="text-slate-500 animate-pulse">Rédaction de vos documents professionnels en cours...</p>
        </div>
      )}

      {!loading && applicationKit.coverLetter && (
        <div className="grid gap-8">
          {/* CV Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center gap-2">
              <UserCircle className="text-slate-600" />
              <h3 className="font-semibold text-slate-800">Profil CV (Résumé)</h3>
            </div>
            <div className="p-6">
              <textarea 
                className="w-full h-32 p-3 text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                value={applicationKit.cvSummary}
                onChange={(e) => setApplicationKit({...applicationKit, cvSummary: e.target.value})}
              />
            </div>
          </div>

          {/* LinkedIn About */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-[#0077b5]/10 p-4 border-b border-[#0077b5]/20 flex items-center gap-2">
              <Linkedin className="text-[#0077b5]" />
              <h3 className="font-semibold text-slate-800">LinkedIn "About" Section</h3>
            </div>
            <div className="p-6">
              <textarea 
                className="w-full h-48 p-3 text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#0077b5] outline-none"
                value={applicationKit.linkedinAbout}
                onChange={(e) => setApplicationKit({...applicationKit, linkedinAbout: e.target.value})}
              />
            </div>
          </div>

          {/* Cover Letter */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-orange-50 p-4 border-b border-orange-200 flex items-center gap-2">
              <FileText className="text-orange-600" />
              <h3 className="font-semibold text-slate-800">Lettre de Motivation</h3>
            </div>
            <div className="p-6">
              <textarea 
                className="w-full h-96 p-4 font-serif text-slate-700 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none leading-relaxed"
                value={applicationKit.coverLetter}
                onChange={(e) => setApplicationKit({...applicationKit, coverLetter: e.target.value})}
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setCurrentStep(3)}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2 transition-transform active:scale-95 shadow-lg shadow-green-200"
            >
              Voir la synthèse finale <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Module3Kit;