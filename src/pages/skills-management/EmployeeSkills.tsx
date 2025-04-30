
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Search } from "lucide-react";
import { EmployeeSkill, Employee } from "@/types";

export default function EmployeeSkills() {
  const [searchTerm, setSearchTerm] = useState("");
  const [skillFilter, setSkillFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  
  // Mock data
  const [employees] = useState<Employee[]>([
    { id: "E001", name: "John Smith", role: "Frontend Developer", department: "Engineering" },
    { id: "E002", name: "Jane Doe", role: "Data Scientist", department: "Analytics" },
    { id: "E003", name: "Mike Johnson", role: "DevOps Engineer", department: "IT Infrastructure" }
  ]);
  
  const [employeeSkills] = useState<EmployeeSkill[]>([
    { id: "S001", employeeId: "E001", name: "JavaScript", source: "resume", confidence: 0.92, proficiency: 4 },
    { id: "S002", employeeId: "E001", name: "React", source: "resume", confidence: 0.88, proficiency: 4 },
    { id: "S003", employeeId: "E001", name: "AWS Certified Developer", source: "certification", confidence: 0.96, proficiency: 5 },
    { id: "S004", employeeId: "E001", name: "TypeScript", source: "combined", confidence: 0.85, proficiency: 3 },
    { id: "S005", employeeId: "E002", name: "Python", source: "resume", confidence: 0.95, proficiency: 5 },
    { id: "S006", employeeId: "E002", name: "Machine Learning", source: "resume", confidence: 0.90, proficiency: 4 },
    { id: "S007", employeeId: "E002", name: "TensorFlow Certified", source: "certification", confidence: 0.97, proficiency: 5 },
    { id: "S008", employeeId: "E002", name: "Data Visualization", source: "combined", confidence: 0.88, proficiency: 4 },
    { id: "S009", employeeId: "E003", name: "Kubernetes", source: "resume", confidence: 0.86, proficiency: 4 },
    { id: "S010", employeeId: "E003", name: "Docker", source: "resume", confidence: 0.89, proficiency: 4 },
    { id: "S011", employeeId: "E003", name: "AWS Solutions Architect", source: "certification", confidence: 0.98, proficiency: 5 },
    { id: "S012", employeeId: "E003", name: "CI/CD", source: "combined", confidence: 0.93, proficiency: 4 },
  ]);
  
  // Helper functions
  const getEmployeeById = (id: string) => {
    return employees.find(emp => emp.id === id);
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
  
  // Filters
  const uniqueSkills = Array.from(new Set(employeeSkills.map(skill => skill.name)));
  
  const filteredSkills = employeeSkills.filter(skill => {
    const employee = getEmployeeById(skill.employeeId);
    if (!employee) return false;
    
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSkillFilter = skillFilter === "all" || skill.name === skillFilter;
    const matchesSourceFilter = sourceFilter === "all" || skill.source === sourceFilter;
    
    return matchesSearch && matchesSkillFilter && matchesSourceFilter;
  });
  
  // Export function
  const exportToCsv = () => {
    // Create CSV headers
    const headers = ["Employee ID", "Employee Name", "Role", "Department", "Skill", "Source", "Confidence", "Proficiency"];
    
    // Create CSV rows
    const rows = filteredSkills.map(skill => {
      const employee = getEmployeeById(skill.employeeId);
      return [
        skill.employeeId,
        employee?.name || "",
        employee?.role || "",
        employee?.department || "",
        skill.name,
        skill.source,
        skill.confidence.toFixed(2),
        `${skill.proficiency} - ${getProficiencyLabel(skill.proficiency)}`
      ];
    });
    
    // Combine headers and rows
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");
    
    // Create and download the file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "employee-skills-export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Employee Skills</h1>
        <p className="text-muted-foreground">
          View and manage inferred employee skills and proficiencies
        </p>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filter Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search by employee or skill"
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="skill-filter">Skill</Label>
              <Select value={skillFilter} onValueChange={setSkillFilter}>
                <SelectTrigger id="skill-filter">
                  <SelectValue placeholder="Select skill" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Skills</SelectItem>
                  {uniqueSkills.map(skill => (
                    <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="source-filter">Source</Label>
              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger id="source-filter">
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="resume">Resume</SelectItem>
                  <SelectItem value="certification">Certification</SelectItem>
                  <SelectItem value="combined">Combined</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <Button
              variant="outline"
              onClick={exportToCsv}
              disabled={filteredSkills.length === 0}
            >
              <Download className="h-4 w-4 mr-2" />
              Export to CSV
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Employee Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Skill</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Confidence</TableHead>
                  <TableHead>Proficiency</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSkills.length > 0 ? (
                  filteredSkills.map((skill) => {
                    const employee = getEmployeeById(skill.employeeId);
                    return (
                      <TableRow key={skill.id}>
                        <TableCell className="font-medium">{employee?.name}</TableCell>
                        <TableCell>{employee?.role}</TableCell>
                        <TableCell>{skill.name}</TableCell>
                        <TableCell>
                          <Badge className={getSourceColor(skill.source)}>
                            {skill.source}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className="bg-primary h-2 rounded-full" 
                                style={{ width: `${skill.confidence * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm">{Math.round(skill.confidence * 100)}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={`border ${skill.proficiency >= 4 ? 'border-orange-200 bg-orange-50 text-orange-800' : 'border-blue-200 bg-blue-50 text-blue-800'}`}
                          >
                            {skill.proficiency} - {getProficiencyLabel(skill.proficiency)}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No results found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
