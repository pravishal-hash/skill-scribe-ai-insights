
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartPie, FileText, Badge, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SkillsManagement() {
  const navigate = useNavigate();
  const [stats] = useState({
    totalEmployees: 247,
    totalSkills: 568,
    averageProficiency: 3.2,
    resumesProcessed: 189,
    certificatesProcessed: 156,
  });
  
  const modules = [
    {
      title: "Resume Inference",
      description: "Upload and process employee resumes to extract skills and proficiencies",
      icon: FileText,
      path: "/dashboard/module/skills-management/resume-inference",
      color: "bg-skill-resume/10 text-skill-resume"
    },
    {
      title: "Certificate Inference",
      description: "Upload and process employee certifications to validate skills",
      icon: Badge,
      path: "/dashboard/module/skills-management/certificate-inference",
      color: "bg-skill-certification/10 text-skill-certification"
    },
    {
      title: "Employee Skills",
      description: "View and manage inferred employee skills and proficiencies",
      icon: Users,
      path: "/dashboard/module/skills-management/employee-skills",
      color: "bg-primary-light/10 text-primary"
    },
    {
      title: "Settings",
      description: "Configure inference weights and system preferences",
      icon: ChartPie,
      path: "/dashboard/module/skills-management/settings",
      color: "bg-secondary/10 text-secondary"
    }
  ];

  return (
    <div className="container py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Skills Management</h1>
        <p className="text-muted-foreground">
          AI-driven skill & proficiency inference from resumes and certifications
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Employees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEmployees}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSkills}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Proficiency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageProficiency.toFixed(1)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Documents Processed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.resumesProcessed + stats.certificatesProcessed}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((module) => (
          <Card key={module.title} className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg ${module.color}`}>
                  <module.icon className="h-5 w-5" />
                </div>
                <CardTitle>{module.title}</CardTitle>
              </div>
              <CardDescription>{module.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button 
                onClick={() => navigate(module.path)}
                className="w-full bg-primary hover:bg-primary-dark text-white"
              >
                Access Module
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
