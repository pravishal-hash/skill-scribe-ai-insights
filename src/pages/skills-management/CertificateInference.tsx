
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CertUploadForm } from "@/components/certification/CertUploadForm";
import { CertInferenceJobTrigger } from "@/components/certification/CertInferenceJobTrigger";
import { SkillsTable } from "@/components/shared/SkillsTable";
import { Skill } from "@/types";

export default function CertificateInference() {
  const [activeTab, setActiveTab] = useState("upload");
  const [inferredSkills, setInferredSkills] = useState<Skill[]>([]);
  
  const handleJobComplete = (data: { skills: Skill[] }) => {
    setInferredSkills(data.skills);
    setActiveTab("results");
  };

  return (
    <div className="container py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Certificate Inference</h1>
        <p className="text-muted-foreground">
          Upload employee certifications and extract validated skills using AI
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="upload">Upload Certifications</TabsTrigger>
              <TabsTrigger value="results">Inference Results</TabsTrigger>
            </TabsList>
            <TabsContent value="upload">
              <CertUploadForm />
            </TabsContent>
            <TabsContent value="results">
              {inferredSkills.length > 0 ? (
                <div className="space-y-6">
                  <div className="bg-white p-4 rounded-lg border">
                    <h2 className="text-lg font-medium mb-4">Inferred Skills from Certifications</h2>
                    <SkillsTable skills={inferredSkills} source="certification" />
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
          <CertInferenceJobTrigger onJobComplete={handleJobComplete} />
          
          <div className="mt-6 bg-white p-6 rounded-lg border">
            <h3 className="font-medium mb-3">Tips</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Upload only PDF format certifications</li>
              <li>• Provide accurate issuing body and dates</li>
              <li>• Certifications typically yield higher proficiency scores</li>
              <li>• Recent certifications have higher weights</li>
              <li>• Results can be exported as CSV</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
