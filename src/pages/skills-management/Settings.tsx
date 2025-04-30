
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

export default function Settings() {
  const [resumeWeight, setResumeWeight] = useState(60);
  const [certWeight, setCertWeight] = useState(40);
  const [saving, setSaving] = useState(false);
  
  const handleResumeWeightChange = (value: number[]) => {
    const newResumeWeight = value[0];
    setResumeWeight(newResumeWeight);
    setCertWeight(100 - newResumeWeight);
  };
  
  const handleCertWeightChange = (value: number[]) => {
    const newCertWeight = value[0];
    setCertWeight(newCertWeight);
    setResumeWeight(100 - newCertWeight);
  };
  
  const saveSettings = async () => {
    setSaving(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Inference weights saved successfully.");
    } catch (error) {
      toast.error("Failed to save settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Configure inference weights and system preferences
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Inference Channel Weights</CardTitle>
            <CardDescription>
              Assign weights to different inference channels to calculate final skill proficiency scores
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Resume Weight</span>
                <span className="text-2xl font-semibold text-primary">{resumeWeight}%</span>
              </div>
              <Slider
                value={[resumeWeight]}
                onValueChange={handleResumeWeightChange}
                max={100}
                step={5}
                className="bg-primary/60"
              />
              <div className="text-xs text-gray-500">
                Weight applied to skills inferred from resume content
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Certification Weight</span>
                <span className="text-2xl font-semibold text-primary">{certWeight}%</span>
              </div>
              <Slider
                value={[certWeight]}
                onValueChange={handleCertWeightChange}
                max={100}
                step={5}
                className="bg-primary/60"
              />
              <div className="text-xs text-gray-500">
                Weight applied to skills inferred from certifications
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={saveSettings}
              disabled={saving}
              className="w-full bg-primary hover:bg-primary-dark text-white"
            >
              {saving ? "Saving..." : "Save Settings"}
            </Button>
          </CardFooter>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Weight Formula Explanation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                The system calculates final skill proficiency using the following formula:
              </p>
              
              <div className="bg-accent p-3 rounded-md text-center mb-4">
                <p className="font-mono">
                  Final Proficiency = (Resume Prof × {resumeWeight}%) + (Cert Prof × {certWeight}%)
                </p>
              </div>
              
              <p className="text-sm text-gray-600">
                For example, if a skill has proficiency 3 from resume and 4 from certification:
              </p>
              
              <div className="bg-accent p-3 rounded-md mt-2 text-center">
                <p className="font-mono">
                  Final = (3 × {resumeWeight/100}) + (4 × {certWeight/100}) = {((3 * resumeWeight/100) + (4 * certWeight/100)).toFixed(2)}
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recommended Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex gap-2">
                  <div className="bg-green-500 h-2 w-2 rounded-full mt-1.5" />
                  <span><strong>Balanced (60/40)</strong>: Good for general workforce skills assessment</span>
                </li>
                <li className="flex gap-2">
                  <div className="bg-green-500 h-2 w-2 rounded-full mt-1.5" />
                  <span><strong>Certification Focus (30/70)</strong>: For highly regulated industries</span>
                </li>
                <li className="flex gap-2">
                  <div className="bg-green-500 h-2 w-2 rounded-full mt-1.5" />
                  <span><strong>Resume Focus (80/20)</strong>: For creative industries with fewer certifications</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
