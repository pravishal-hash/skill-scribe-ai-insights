
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Download } from "lucide-react";
import { Skill } from "@/types";

interface SkillsTableProps {
  skills: Skill[];
  source: "resume" | "certification" | "combined";
}

export function SkillsTable({ skills, source }: SkillsTableProps) {
  // Function to export data as CSV
  const exportToCsv = () => {
    // Create CSV content
    const headers = ["Skill Name", "Source", "Confidence", "Proficiency"];
    const csvContent = [
      headers.join(","),
      ...skills.map(skill => [
        `"${skill.name}"`,
        skill.source,
        skill.confidence.toFixed(2),
        skill.proficiency
      ].join(","))
    ].join("\n");
    
    // Create a blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${source}-skills-export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Skills data exported successfully.");
  };
  
  const getSourceColor = (source: string) => {
    switch (source) {
      case "resume": return "bg-skill-resume text-white";
      case "certification": return "bg-skill-certification text-white";
      case "combined": return "bg-skill-combined text-white";
      default: return "bg-gray-200";
    }
  };
  
  const getProficiencyLabel = (level: number) => {
    switch (level) {
      case 1: return "Beginner";
      case 2: return "Basic";
      case 3: return "Intermediate";
      case 4: return "Advanced";
      case 5: return "Expert";
      default: return "Unknown";
    }
  };
  
  const getProficiencyBadgeColor = (level: number) => {
    switch (level) {
      case 1: return "bg-blue-100 text-blue-800 border-blue-200";
      case 2: return "bg-cyan-100 text-cyan-800 border-cyan-200";
      case 3: return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case 4: return "bg-orange-100 text-orange-800 border-orange-200";
      case 5: return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <span className="text-sm text-gray-500">{skills.length} skills found</span>
        </div>
        <Button variant="outline" onClick={exportToCsv}>
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Skill Name</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Confidence</TableHead>
              <TableHead>Proficiency</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {skills.length > 0 ? (
              skills.map((skill) => (
                <TableRow key={skill.id}>
                  <TableCell className="font-medium">{skill.name}</TableCell>
                  <TableCell>
                    <Badge className={getSourceColor(skill.source)}>
                      {skill.source}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                        <div 
                          className="bg-primary h-2.5 rounded-full" 
                          style={{ width: `${skill.confidence * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">{Math.round(skill.confidence * 100)}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getProficiencyBadgeColor(skill.proficiency)}>
                      {skill.proficiency} - {getProficiencyLabel(skill.proficiency)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                  No skills data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
