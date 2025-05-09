
import { FC, useState, useCallback } from "react";
import { Upload, X } from "lucide-react";

interface UploadAreaProps {
  onFileUpload: (files: File[]) => void;
}

const UploadArea: FC<UploadAreaProps> = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    },
    []
  );

  const handleDragLeave = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    },
    []
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isDragging) {
        setIsDragging(true);
      }
    },
    [isDragging]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      if (files && files.length > 0) {
        onFileUpload(files);
      }
    },
    [onFileUpload]
  );

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileUpload(Array.from(e.target.files));
      e.target.value = ""; // Reset input value
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
        isDragging
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => document.getElementById("fileInput")?.click()}
    >
      <input
        type="file"
        id="fileInput"
        className="hidden"
        accept=".pdf"
        multiple
        onChange={handleFileInputChange}
      />
      <div className="flex flex-col items-center justify-center">
        {isDragging ? (
          <>
            <X
              className="h-10 w-10 text-blue-500 mb-2 animate-pulse"
              strokeWidth={1.5}
            />
            <p className="text-sm font-medium text-blue-600">
              Solte os arquivos aqui
            </p>
          </>
        ) : (
          <>
            <Upload
              className="h-10 w-10 text-gray-400 mb-2"
              strokeWidth={1.5}
            />
            <p className="text-sm font-medium mb-1">
              Arraste e solte arquivos PDF aqui
            </p>
            <p className="text-xs text-muted-foreground">
              ou clique para selecionar arquivos
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default UploadArea;
