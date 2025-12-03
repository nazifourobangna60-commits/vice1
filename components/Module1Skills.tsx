import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { extractSkills } from '../services/geminiService';
import { BrainCircuit, Loader2, CheckCircle2, ArrowRight } from 'lucide-react';
import { SkillType } from '../types';

const Module1Skills: React.FC = () => {
  const { userBio, setBio, skills, setSkills, loading, setLoading, setCurrentStep } = useProject();
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (userBio.trim().length < 50) {
      setError("Veuillez entrer une description plus détaillée (min. 50 caractères).");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const result = await extractSkills(userBio);
      setSkills(result);
    } catch (e) {
      setError("Une erreur est survenue lors de l'analyse. Veuillez réessayer.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const hardSkills = skills.filter(s => s.type === SkillType.HARD);
  const softSkills = skills.filter(s => s.type === SkillType.SOFT);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2 mb-4">
          <BrainCircuit className="text-blue-600" />
          1. Identification des Compétences
        </h2>
        <p className="text-slate-600 mb-6">
          Décrivez vos expériences passées (professionnelles, bénévoles, étudiantes) et vos centres d'intérêt. 
          L'IA analysera ce texte pour extraire vos 10 compétences clés.
        </p>
        
        <textarea
          className="w-full h-40 p-4 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all"
          placeholder="Ex: J'ai travaillé 3 ans comme vendeur en prêt-à-porter où je gérais les stocks et conseillais les clients. J'ai aussi été trésorier de mon association étudiante..."
          value={userBio}
          onChange={(e) => setBio(e.target.value)}
          disabled={loading || skills.length > 0}
        />
        
        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}

        <div className="mt-4 flex justify-end">
          {skills.length === 0 ? (
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Analyser mon profil"}
            </button>
          ) : (
            <button
              onClick={() => setSkills([])}
              className="text-slate-500 hover:text-slate-700 px-4 py-2 text-sm underline"
            >
              Recommencer l'analyse
            </button>
          )}
        </div>
      </div>

      {skills.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h3 className="font-semibold text-blue-900 mb-4 flex items-center gap-2">
              Hard Skills (Savoir-faire)
            </h3>
            <ul className="space-y-3">
              {hardSkills.map((skill, idx) => (
                <li key={idx} className="bg-white p-3 rounded-lg shadow-sm text-sm border border-blue-100">
                  <span className="font-bold text-slate-800 block">{skill.name}</span>
                  <span className="text-slate-500">{skill.description}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
            <h3 className="font-semibold text-emerald-900 mb-4 flex items-center gap-2">
              Soft Skills (Savoir-être)
            </h3>
            <ul className="space-y-3">
              {softSkills.map((skill, idx) => (
                <li key={idx} className="bg-white p-3 rounded-lg shadow-sm text-sm border border-emerald-100">
                  <span className="font-bold text-slate-800 block">{skill.name}</span>
                  <span className="text-slate-500">{skill.description}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {skills.length > 0 && (
        <div className="flex justify-end pt-4">
          <button
            onClick={() => setCurrentStep(1)}
            className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2 transition-transform active:scale-95 shadow-lg shadow-slate-200"
          >
            Étape suivante : Explorer les métiers <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Module1Skills;