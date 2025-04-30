
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Play, Loader2 } from "lucide-react";
import { InferenceJob } from "@/types";

interface CertInferenceJobTriggerProps {
  onJobComplete?: (data: any) => void;
}

export function CertInferenceJobTrigger({ onJobComplete }: CertInferenceJobTriggerProps) {
  const [job, setJob] = useState<InferenceJob | null>(null);
  
  const startInferenceJob = async () => {
    // Create a new job
    const newJob: InferenceJob = {
      id: `job-${Date.now()}`,
      status: "queued",
      type: "certification",
      timestamp: new Date().toISOString(),
      totalFiles: 8, // Simulated data
      processedFiles: 0,
      successFiles: 0,
      failedFiles: 0
    };
    
    setJob(newJob);
    toast.info("Certification inference job queued. Processing will begin shortly.");
    
    // Simulate processing
    setTimeout(() => {
      setJob(prev => prev ? { ...prev, status: "processing" } : null);
      toast.info("Certification inference job is now processing.");
      
      // Simulate progress updates
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progress <= 100) {
          setJob(prev => prev 
            ? { 
                ...prev, 
                processedFiles: Math.floor((progress / 100) * prev.totalFiles),
                successFiles: Math.floor((progress / 100) * prev.totalFiles * 0.95),
                failedFiles: Math.floor((progress / 100) * prev.totalFiles * 0.05)
              } 
            : null
          );
        } else {
          clearInterval(interval);
          setJob(prev => prev 
            ? {
                ...prev,
                status: "completed",
                processedFiles: prev.totalFiles,
                successFiles: Math.floor(prev.totalFiles * 0.95),
                failedFiles: Math.floor(prev.totalFiles * 0.05)
              }
            : null
          );
          toast.success("Certification inference job completed successfully.");
          
          // Generate mock inference data
          const mockData = {
            skills: [
              { id: "1", name: "AWS Cloud Architecture", source: "certification", confidence: 0.97, proficiency: 5 },
              { id: "2", name: "Docker", source: "certification", confidence: 0.95, proficiency: 4 },
              { id: "3", name: "Kubernetes", source: "certification", confidence: 0.92, proficiency: 4 },
              { id: "4", name: "DevOps", source: "certification", confidence: 0.89, proficiency: 4 },
              { id: "5", name: "CI/CD", source: "certification", confidence: 0.85, proficiency: 3 },
            ]
          };
          
          if (onJobComplete) {
            onJobComplete(mockData);
          }
        }
      }, 500);
    }, 1500);
  };

  const getProgressPercentage = () => {
    if (!job) return 0;
    return Math.round((job.processedFiles / job.totalFiles) * 100);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Certification Inference</CardTitle>
        <CardDescription>
          Extract validated skills from employee certifications using AI
        </CardDescription>
      </CardHeader>
      <CardContent>
        {job ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Job Status: <span className="text-primary">{job.status}</span></p>
                <p className="text-sm text-gray-500">
                  Processing {job.processedFiles} of {job.totalFiles} files
                </p>
              </div>
              {job.status === "processing" && (
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
              )}
            </div>
            
            <Progress value={getProgressPercentage()} className="h-2" />
            
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="text-center p-2 bg-green-50 rounded-md">
                <p className="text-sm text-gray-600">Successful</p>
                <p className="font-bold text-green-600">{job.successFiles}</p>
              </div>
              <div className="text-center p-2 bg-red-50 rounded-md">
                <p className="text-sm text-gray-600">Failed</p>
                <p className="font-bold text-red-600">{job.failedFiles}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-500 mb-4">
              Ready to process uploaded certifications and extract validated skills.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={startInferenceJob} 
          className="w-full bg-primary hover:bg-primary-dark text-white"
          disabled={!!job && job.status !== "completed"}
        >
          {!job ? (
            <>
              <Play className="mr-2 h-4 w-4" />
              Trigger Inference Job
            </>
          ) : job.status === "completed" ? (
            "Job Completed"
          ) : (
            "Processing..."
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
