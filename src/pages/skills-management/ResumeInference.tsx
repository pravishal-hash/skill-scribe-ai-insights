
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResumeUploadForm } from "@/components/resume/ResumeUploadForm";
import { InferenceJobTrigger } from "@/components/resume/InferenceJobTrigger";
import { SkillsTable } from "@/components/shared/SkillsTable";
import { Skill } from "@/types";

export default function ResumeInference() {
  const [activeTab, setActiveTab] = useState("upload");
  const [inferredSkills, setInferredSkills] = useState<Skill[]>([]);
  
  const handleJobComplete = (data: { skills: Skill[] }) => {
    setInferredSkills(data.skills);
    setActiveTab("results");
  };

  return (
    <div className="container py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Resume Inference</h1>
        <p className="text-muted-foreground">
          Upload employee resumes and extract skills using AI
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="upload">Upload Resumes</TabsTrigger>
              <TabsTrigger value="results">Inference Results</TabsTrigger>
            </TabsList>
            <TabsContent value="upload">
              <ResumeUploadForm />
            </TabsContent>
            <TabsContent value="results">
              {inferredSkills.length > 0 ? (
                <div className="space-y-6">
                  <div className="bg-white p-4 rounded-lg border">
                    <h2 className="text-lg font-medium mb-4">Inferred Skills</h2>
                    <SkillsTable skills={inferredSkills} source="resume" />
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg border">
                  <p className="text-gray-500">
                    No inference results available yet. Trigger an inference job to see results.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <InferenceJobTrigger onJobComplete={handleJobComplete} />
          
          <div className="mt-6 bg-white p-6 rounded-lg border">
            <h3 className="font-medium mb-3">Tips</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Upload up to 50 resumes at once</li>
              <li>• Include employee ID for each file</li>
              <li>• Supported formats: PDF, DOC, DOCX</li>
              <li>• AI processing can take up to 10 minutes</li>
              <li>• Results can be exported as CSV</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
