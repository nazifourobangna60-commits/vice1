import React from 'react';
import { useProject } from '../context/ProjectContext';
import { Printer, Download, CheckCircle, ArrowLeft } from 'lucide-react';
import { SkillType } from '../types';

const Summary: React.FC = () => {
  const { userBio, skills, selectedJob, applicationKit, setCurrentStep } = useProject();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="flex justify-between items-center no-print">
         <button onClick={() => setCurrentStep(0)} className="text-slate-500 hover:text-slate-800 flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Retour à l'édition
         </button>
         <button
            onClick={handlePrint}
            className="bg-slate-900 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-800 transition-colors"
         >
            <Printer className="h-4 w-4" /> Imprimer / Sauvegarder en PDF
         </button>
      </div>

      <div className="bg-white p-12 shadow-xl print:shadow-none print:p-0">
        <header className="border-b-2 border-slate-900 pb-6 mb-8">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Dossier de Projet Professionnel</h1>
          <p className="text-slate-500">Généré par CareerFlow AI</p>
          <div className="mt-4 text-sm text-slate-400">Date: {new Date().toLocaleDateString('fr-FR')}</div>
        </header>

        {/* Section 1: Compétences */}
        <section className="mb-12 break-inside-avoid">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 border-l-4 border-blue-600 pl-4">1. Bilan de Compétences</h2>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-blue-800 mb-3 uppercase tracking-wider text-sm">Hard Skills</h3>
              <ul className="list-disc pl-5 space-y-2 text-slate-700">
                {skills.filter(s => s.type === SkillType.HARD).map((s, i) => (
                    <li key={i}><span className="font-medium">{s.name}</span>: {s.description}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-emerald-800 mb-3 uppercase tracking-wider text-sm">Soft Skills</h3>
              <ul className="list-disc pl-5 space-y-2 text-slate-700">
                {skills.filter(s => s.type === SkillType.SOFT).map((s, i) => (
                    <li key={i}><span className="font-medium">{s.name}</span>: {s.description}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: Projet Métier */}
        {selectedJob && (
          <section className="mb-12 break-inside-avoid">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 border-l-4 border-purple-600 pl-4">2. Projet Ciblé : {selectedJob.title}</h2>
            
            <div className="bg-slate-50 p-6 rounded-lg mb-6 print:border print:border-slate-200">
                <p className="text-slate-700 italic mb-4">{selectedJob.matchReason}</p>
                <h4 className="font-bold text-slate-900 mb-4">Plan d'action :</h4>
                <div className="space-y-4">
                    {selectedJob.actionPlan.map((step, i) => (
                        <div key={i} className="flex gap-4">
                            <span className="font-bold text-purple-600">{i+1}.</span>
                            <div>
                                <div className="font-semibold text-slate-800">{step.step}</div>
                                <div className="text-slate-600 text-sm">{step.details}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </section>
        )}

        {/* Section 3: Kit Candidature */}
        {applicationKit.coverLetter && (
            <section className="break-before-page">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 border-l-4 border-orange-600 pl-4">3. Kit de Candidature</h2>
                
                <div className="mb-8">
                    <h3 className="font-bold text-slate-700 mb-2 bg-slate-100 p-2">Résumé CV</h3>
                    <p className="text-slate-700 whitespace-pre-wrap text-sm leading-relaxed">{applicationKit.cvSummary}</p>
                </div>

                <div className="mb-8">
                    <h3 className="font-bold text-slate-700 mb-2 bg-slate-100 p-2">Profil LinkedIn</h3>
                    <p className="text-slate-700 whitespace-pre-wrap text-sm leading-relaxed">{applicationKit.linkedinAbout}</p>
                </div>

                <div>
                    <h3 className="font-bold text-slate-700 mb-4 bg-slate-100 p-2">Lettre de Motivation</h3>
                    <div className="p-8 border border-slate-200 rounded-none text-slate-800 font-serif whitespace-pre-wrap leading-relaxed text-sm">
                        {applicationKit.coverLetter}
                    </div>
                </div>
            </section>
        )}
      </div>
    </div>
  );
};

export default Summary;