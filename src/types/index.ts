
export type UploadStatus = "idle" | "uploading" | "success" | "error" | "processing";

export type FileWithEmployee = {
  file: File;
  employeeId: string;
};

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
}

export interface Skill {
  id: string;
  name: string;
  source: "resume" | "certification" | "combined";
  confidence: number;
  proficiency: number;
}

export interface EmployeeSkill extends Skill {
  employeeId: string;
}

export interface Certification {
  id: string;
  employeeId: string;
  name: string;
  issuingBody: string;
  dateIssued: string;
  fileName: string;
}

export interface InferenceWeights {
  resume: number;
  certification: number;
}

export interface InferenceJob {
  id: string;
  status: "queued" | "processing" | "completed" | "failed";
  type: "resume" | "certification";
  timestamp: string;
  totalFiles: number;
  processedFiles: number;
  successFiles: number;
  failedFiles: number;
}
