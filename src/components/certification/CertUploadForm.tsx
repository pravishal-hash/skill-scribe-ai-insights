
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Badge, X, File } from "lucide-react";
import { UploadStatus } from "@/types";

interface CertUploadData {
  file: File;
  employeeId: string;
  certName: string;
  issuingBody: string;
  dateIssued: string;
}

export function CertUploadForm() {
  const [certifications, setCertifications] = useState<CertUploadData[]>([]);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [dragActive, setDragActive] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      const validFiles = droppedFiles.filter(file => {
        const ext = file.name.split('.').pop()?.toLowerCase();
        return ext === 'pdf';
      });
      
      if (validFiles.length !== droppedFiles.length) {
        toast.warning("Some files were skipped. Only PDF format is supported.");
      }
      
      const newCerts = validFiles.map(file => ({
        file,
        employeeId: "",
        certName: "",
        issuingBody: "",
        dateIssued: ""
      }));
      
      setCertifications(prev => [...prev, ...newCerts]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      const validFiles = selectedFiles.filter(file => {
        const ext = file.name.split('.').pop()?.toLowerCase();
        return ext === 'pdf';
      });
      
      if (validFiles.length !== selectedFiles.length) {
        toast.warning("Some files were skipped. Only PDF format is supported.");
      }
      
      const newCerts = validFiles.map(file => ({
        file,
        employeeId: "",
        certName: "",
        issuingBody: "",
        dateIssued: ""
      }));
      
      setCertifications(prev => [...prev, ...newCerts]);
    }
  };

  const handleRemoveCert = (index: number) => {
    setCertifications(prev => prev.filter((_, i) => i !== index));
  };

  const handleFieldChange = (index: number, field: keyof CertUploadData, value: string) => {
    setCertifications(prev => prev.map((cert, i) => 
      i === index ? { ...cert, [field]: value } : cert
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const missingFields = certifications.some(cert => 
      !cert.employeeId.trim() || 
      !cert.certName.trim() || 
      !cert.issuingBody.trim() || 
      !cert.dateIssued
    );
    
    if (missingFields) {
      toast.error("Please fill in all fields for each certification.");
      return;
    }
    
    setUploadStatus("uploading");
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setUploadStatus("success");
      toast.success(`Successfully uploaded ${certifications.length} certifications.`);
    } catch (error) {
      setUploadStatus("error");
      toast.error("Failed to upload certifications. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          dragActive ? "border-primary bg-primary/5" : "border-gray-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center">
          <Badge className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-xl font-medium mb-2">Drop certification files here</h3>
          <p className="text-sm text-gray-500 mb-4">
            Upload certification documents (PDF format only)
          </p>
          <div>
            <Label htmlFor="cert-upload" className="cursor-pointer">
              <span className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md">
                Browse Files
              </span>
              <Input
                id="cert-upload"
                type="file"
                className="hidden"
                multiple
                accept=".pdf"
                onChange={handleFileChange}
              />
            </Label>
          </div>
        </div>
      </div>

      {certifications.length > 0 && (
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-accent p-4">
            <h3 className="font-medium">
              {certifications.length} {certifications.length === 1 ? "Certification" : "Certifications"} Selected
            </h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="p-4 border-t hover:bg-accent/50"
              >
                <div className="flex items-center gap-3 mb-3">
                  <File className="h-5 w-5 text-primary shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{cert.file.name}</p>
                    <p className="text-xs text-gray-500">
                      {(cert.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveCert(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor={`employee-id-${index}`} className="text-xs">
                      Employee ID
                    </Label>
                    <Input
                      id={`employee-id-${index}`}
                      type="text"
                      value={cert.employeeId}
                      onChange={(e) => handleFieldChange(index, "employeeId", e.target.value)}
                      className="text-sm mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor={`cert-name-${index}`} className="text-xs">
                      Certification Name
                    </Label>
                    <Input
                      id={`cert-name-${index}`}
                      type="text"
                      value={cert.certName}
                      onChange={(e) => handleFieldChange(index, "certName", e.target.value)}
                      className="text-sm mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor={`issuing-body-${index}`} className="text-xs">
                      Issuing Body
                    </Label>
                    <Input
                      id={`issuing-body-${index}`}
                      type="text"
                      value={cert.issuingBody}
                      onChange={(e) => handleFieldChange(index, "issuingBody", e.target.value)}
                      className="text-sm mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor={`date-issued-${index}`} className="text-xs">
                      Date Issued
                    </Label>
                    <Input
                      id={`date-issued-${index}`}
                      type="date"
                      value={cert.dateIssued}
                      onChange={(e) => handleFieldChange(index, "dateIssued", e.target.value)}
                      className="text-sm mt-1"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-accent p-4 border-t">
            <Button
              type="submit"
              className="bg-primary hover:bg-primary-dark text-white"
              disabled={uploadStatus === "uploading" || certifications.length === 0}
            >
              {uploadStatus === "uploading" ? "Uploading..." : "Upload Certifications"}
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}
