import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ProjectState, Skill, JobOption, ApplicationKit } from '../types';

interface ProjectContextType extends ProjectState {
  setBio: (bio: string) => void;
  setSkills: (skills: Skill[]) => void;
  setJobOptions: (jobs: JobOption[]) => void;
  setSelectedJob: (job: JobOption) => void;
  setApplicationKit: (kit: ApplicationKit) => void;
  setLoading: (loading: boolean) => void;
  setCurrentStep: (step: number) => void;
  resetProject: () => void;
}

const defaultState: ProjectState = {
  currentStep: 0,
  userBio: "",
  skills: [],
  selectedJob: null,
  jobOptions: [],
  applicationKit: {
    cvSummary: "",
    linkedinAbout: "",
    coverLetter: ""
  },
  loading: false,
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ProjectState>(defaultState);

  const updateState = (updates: Partial<ProjectState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  return (
    <ProjectContext.Provider value={{
      ...state,
      setBio: (userBio) => updateState({ userBio }),
      setSkills: (skills) => updateState({ skills }),
      setJobOptions: (jobOptions) => updateState({ jobOptions }),
      setSelectedJob: (selectedJob) => updateState({ selectedJob }),
      setApplicationKit: (applicationKit) => updateState({ applicationKit }),
      setLoading: (loading) => updateState({ loading }),
      setCurrentStep: (currentStep) => updateState({ currentStep }),
      resetProject: () => setState(defaultState)
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
};