import { useState } from "react";
import { FileUp, File, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

interface PDFFile {
  name: string;
  size: number;
  file: File;
}

export const PDFSplitter = () => {
  const [pdf, setPdf] = useState<PDFFile | null>(null);
  const [pageRange, setPageRange] = useState("");

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length !== 1 || files[0].type !== "application/pdf") {
      toast({
        title: "Invalid file",
        description: "Please drop a single PDF file",
        variant: "destructive",
      });
      return;
    }

    const file = files[0];
    setPdf({
      name: file.name,
      size: file.size,
      file,
    });
    toast({
      title: "File added",
      description: "PDF file ready to split",
    });
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    const file = e.target.files[0];
    if (file.type !== "application/pdf") {
      toast({
        title: "Invalid file",
        description: "Please select a PDF file",
        variant: "destructive",
      });
      return;
    }

    setPdf({
      name: file.name,
      size: file.size,
      file,
    });
    toast({
      title: "File added",
      description: "PDF file ready to split",
    });
  };

  const removePdf = () => {
    setPdf(null);
    setPageRange("");
    toast({
      title: "File removed",
      description: "PDF file removed",
    });
  };

  const splitPdf = async () => {
    if (!pdf) {
      toast({
        title: "No file selected",
        description: "Please add a PDF file to split",
        variant: "destructive",
      });
      return;
    }

    if (!pageRange) {
      toast({
        title: "No page range",
        description: "Please specify the page range to split",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Coming soon",
      description: "PDF splitting functionality will be implemented soon",
    });
  };

  return (
    <Card className="p-6 animate-fade-up">
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed rounded-lg p-8 text-center mb-6 transition-colors hover:border-primary"
      >
        <FileUp className="mx-auto mb-4 text-muted-foreground" size={40} />
        <p className="text-lg font-medium mb-2">Drag and drop a PDF file here</p>
        <p className="text-sm text-muted-foreground mb-4">or</p>
        <Button variant="outline" className="relative">
          Choose file
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </Button>
      </div>

      {pdf && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              <File size={20} className="text-muted-foreground" />
              <div>
                <p className="font-medium">{pdf.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(pdf.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={removePdf}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 size={18} />
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pageRange">Page Range</Label>
            <Input
              id="pageRange"
              placeholder="e.g., 1-3, 5, 7-9"
              value={pageRange}
              onChange={(e) => setPageRange(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              Specify page numbers and/or ranges separated by commas
            </p>
          </div>

          <Button onClick={splitPdf} className="w-full mt-4">
            Split PDF
          </Button>
        </div>
      )}
    </Card>
  );
};