
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Upload, X, FileText } from "lucide-react";
import { UploadStatus, FileWithEmployee } from "@/types";

export function ResumeUploadForm() {
  const [files, setFiles] = useState<FileWithEmployee[]>([]);
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
        return ext === 'pdf' || ext === 'doc' || ext === 'docx';
      });
      
      if (validFiles.length !== droppedFiles.length) {
        toast.warning("Some files were skipped. Only PDF, DOC, and DOCX formats are supported.");
      }
      
      const newFiles = validFiles.map(file => ({
        file,
        employeeId: ""
      }));
      
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      const validFiles = selectedFiles.filter(file => {
        const ext = file.name.split('.').pop()?.toLowerCase();
        return ext === 'pdf' || ext === 'doc' || ext === 'docx';
      });
      
      if (validFiles.length !== selectedFiles.length) {
        toast.warning("Some files were skipped. Only PDF, DOC, and DOCX formats are supported.");
      }
      
      const newFiles = validFiles.map(file => ({
        file,
        employeeId: ""
      }));
      
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleEmployeeIdChange = (index: number, value: string) => {
    setFiles(prev => prev.map((file, i) => 
      i === index ? { ...file, employeeId: value } : file
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate employee IDs
    const missingIds = files.some(file => !file.employeeId.trim());
    if (missingIds) {
      toast.error("Please assign an Employee ID to all files.");
      return;
    }
    
    setUploadStatus("uploading");
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setUploadStatus("success");
      toast.success(`Successfully uploaded ${files.length} resumes.`);
    } catch (error) {
      setUploadStatus("error");
      toast.error("Failed to upload files. Please try again.");
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
          <Upload className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-xl font-medium mb-2">Drop resume files here</h3>
          <p className="text-sm text-gray-500 mb-4">
            Upload up to 50 files at once (PDF, DOC, DOCX)
          </p>
          <div>
            <Label htmlFor="file-upload" className="cursor-pointer">
              <span className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md">
                Browse Files
              </span>
              <Input
                id="file-upload"
                type="file"
                className="hidden"
                multiple
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />
            </Label>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-accent p-4">
            <h3 className="font-medium">
              {files.length} {files.length === 1 ? "File" : "Files"} Selected
            </h3>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 border-t hover:bg-accent/50"
              >
                <FileText className="h-5 w-5 text-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(file.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <div className="w-36">
                  <Input
                    type="text"
                    placeholder="Employee ID"
                    value={file.employeeId}
                    onChange={(e) => handleEmployeeIdChange(index, e.target.value)}
                    className="text-sm"
                    required
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveFile(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <div className="bg-accent p-4 border-t">
            <Button
              type="submit"
              className="bg-primary hover:bg-primary-dark text-white"
              disabled={uploadStatus === "uploading" || files.length === 0}
            >
              {uploadStatus === "uploading" ? "Uploading..." : "Upload Files"}
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}
