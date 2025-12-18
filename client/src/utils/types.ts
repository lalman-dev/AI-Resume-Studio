export interface PersonalInfo {
  full_name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  profession: string;
  image: string;
}

export interface Experience {
  company: string;
  position: string;
  start_date: string;
  end_date: string;
  description: string;
  is_current: boolean;
  _id: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  graduation_date: string;
  gpa: string;
  _id: string;
}

export interface Project {
  name: string;
  type: string;
  description: string;
  _id: string;
}

export interface Resume {
  personal_info: PersonalInfo;
  _id: string;
  userId: string;
  title: string;
  public: boolean;
  professional_summary: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  template: string;
  accent_color: string;
  project: Project[];
  updatedAt: string;
  createdAt: string;
}

export interface ResumeData {
  _id: string;
  title: string;
  personal_info: any;
  professional_summary: string;
  experience: any[];
  education: any[];
  project: any[];
  skills: string[];
  template: "classic" | "modern" | "minimal" | "minimal-image";
  accent_color: string;
  public: boolean;
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
}
