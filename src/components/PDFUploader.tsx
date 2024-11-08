/*

import { FileText, Upload } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function PDFUploader() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files[0]?.type === 'application/pdf') {
      setFile(files[0]);
    }
  };

  return (
    <div
      className={cn(
        'mt-6 p-8 border-2 border-dashed rounded-lg transition-all duration-200',
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300',
        file ? 'bg-gray-50' : 'bg-white'
      )}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        {file ? (
          <>
            <FileText className="w-16 h-16 text-blue-500" />
            <p className="text-sm text-gray-600">{file.name}</p>
          </>
        ) : (
          <>
            <Upload className="w-12 h-12 text-gray-400" />
            <p className="text-sm text-gray-500">
              Drag and drop your PDF file here, or click to select
            </p>
          </>
        )}
      </div>
    </div>
  );
}
*/
import { FileText, Upload } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function PDFUploader() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files[0]?.type === 'application/pdf') {
      setFile(files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setUploadSuccess(false);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/upload-pdf', { // Update with your backend endpoint
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setUploadSuccess(true);
        setFile(null);
      } else {
        console.error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className={cn(
        'mt-6 p-8 border-2 border-dashed rounded-lg transition-all duration-200',
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300',
        file ? 'bg-gray-50' : 'bg-white'
      )}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        {file ? (
          <>
            <FileText className="w-16 h-16 text-blue-500" />
            <p className="text-sm text-gray-600">{file.name}</p>
            <button
              onClick={handleUpload}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Upload PDF'}
            </button>
            {uploadSuccess && (
              <p className="text-green-500 mt-2">Upload successful!</p>
            )}
          </>
        ) : (
          <>
            <Upload className="w-12 h-12 text-gray-400" />
            <p className="text-sm text-gray-500">
              Drag and drop your PDF file here, or click to select
            </p>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => {
                const selectedFile = e.target.files?.[0];
                if (selectedFile && selectedFile.type === 'application/pdf') {
                  setFile(selectedFile);
                }
              }}
              className="hidden"
            />
          </>
        )}
      </div>
    </div>
  );
}
