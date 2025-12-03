import { GoogleGenAI, Type } from "@google/genai";
import { Skill, JobOption, ApplicationKit, SkillType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = "gemini-2.5-flash";

const cleanJson = (text: string | undefined): string => {
  if (!text) return "";
  let clean = text.trim();
  if (clean.startsWith("```json")) {
    clean = clean.replace(/^```json/, "").replace(/```$/, "");
  } else if (clean.startsWith("```")) {
    clean = clean.replace(/^```/, "").replace(/```$/, "");
  }
  return clean;
};

export const extractSkills = async (bio: string): Promise<Skill[]> => {
  const prompt = `
    Analyse le texte suivant qui décrit le parcours et les expériences d'un candidat.
    Identifie exactement 10 compétences clés (mélange équilibré de savoir-faire techniques et de savoir-être).
    Retourne le résultat en JSON.
    
    Texte du candidat: "${bio}"
  `;

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: "Nom de la compétence" },
            type: { type: Type.STRING, enum: [SkillType.HARD, SkillType.SOFT] },
            description: { type: Type.STRING, description: "Brève justification basée sur le texte" }
          },
          required: ["name", "type", "description"]
        }
      }
    }
  });

  try {
    return JSON.parse(cleanJson(response.text) || "[]");
  } catch (error) {
    console.error("Failed to parse skills JSON", error);
    return [];
  }
};

export const suggestJobs = async (skills: Skill[]): Promise<JobOption[]> => {
  const skillsList = skills.map(s => `${s.name} (${s.type})`).join(", ");
  
  const prompt = `
    Basé sur ces compétences : ${skillsList}.
    Suggère 2 à 3 pistes de métiers réalistes et pertinents.
    Pour chaque métier, établis un plan d'action numérique concret en 3 à 5 étapes pour y accéder ou postuler.
  `;

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            title: { type: Type.STRING, description: "Intitulé du poste" },
            matchReason: { type: Type.STRING, description: "Pourquoi ce métier correspond au profil" },
            actionPlan: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  step: { type: Type.STRING, description: "Titre de l'étape" },
                  details: { type: Type.STRING, description: "Détails de l'action à entreprendre" }
                }
              }
            }
          }
        }
      }
    }
  });

  try {
    return JSON.parse(cleanJson(response.text) || "[]");
  } catch (error) {
    console.error("Failed to parse jobs JSON", error);
    return [];
  }
};

export const generateApplicationKit = async (job: JobOption, skills: Skill[], userBio: string): Promise<ApplicationKit> => {
  const skillsList = skills.map(s => s.name).join(", ");
  
  const prompt = `
    Agis comme un expert en recrutement international.
    Le candidat vise le poste de : ${job.title}.
    Ses compétences sont : ${skillsList}.
    Son parcours (bio) : ${userBio}.
    
    Génère les éléments suivants en Français professionnel :
    1. Un résumé de profil pour un CV (3-4 phrases percutantes).
    2. Une section "About" pour LinkedIn (engageante, storytelling, première personne).
    3. Une lettre de motivation complète pour ce poste spécifique.
  `;

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          cvSummary: { type: Type.STRING },
          linkedinAbout: { type: Type.STRING },
          coverLetter: { type: Type.STRING }
        }
      }
    }
  });

  try {
    return JSON.parse(cleanJson(response.text) || "{}");
  } catch (error) {
    console.error("Failed to parse kit JSON", error);
    return {
      cvSummary: "",
      linkedinAbout: "",
      coverLetter: ""
    };
  }
};