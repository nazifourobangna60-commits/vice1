export enum SkillType {
  HARD = 'Savoir-faire',
  SOFT = 'Savoir-être'
}

export interface Skill {
  name: string;
  type: SkillType;
  description: string;
}

export interface ActionStep {
  step: string;
  details: string;
}

export interface JobOption {
  id: string;
  title: string;
  matchReason: string;
  actionPlan: ActionStep[];
}

export interface ApplicationKit {
  cvSummary: string;
  linkedinAbout: string;
  coverLetter: string;
}

export interface ProjectState {
  currentStep: number;
  userBio: string;
  skills: Skill[];
  selectedJob: JobOption | null;
  jobOptions: JobOption[];
  applicationKit: ApplicationKit;
  loading: boolean;
}