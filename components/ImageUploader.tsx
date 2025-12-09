"use client";

import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { isValidImageFile } from "@/lib/utils";

interface ImageUploaderProps {
  onImageUpload: (file: File, base64: string) => void;
  isLoading: boolean;
}

export function ImageUploader({ onImageUpload, isLoading }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    if (!isValidImageFile(file)) {
      toast.error("Invalid file. Please upload PNG, JPG, JPEG, or WebP images under 10MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      onImageUpload(file, base64);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }, []);

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`w-full p-12 rounded-2xl border-2 border-dashed transition-all cursor-pointer ${
        isDragging
          ? "border-indigo-400 dark:border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 shadow-xl shadow-indigo-400/20"
          : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 bg-gray-50 dark:bg-gray-800/30 hover:bg-gray-100 dark:hover:bg-gray-800/50"
      }`}
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="p-5 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30">
          <svg
            className="w-12 h-12 text-indigo-600 dark:text-indigo-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>
        <div className="text-center">
          <p className="text-gray-900 dark:text-white font-semibold mb-1 text-lg">
            Drag and drop your image here
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            or click below to select
          </p>
        </div>
        <label className="relative cursor-pointer">
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            disabled={isLoading}
            className="hidden"
          />
          <div className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed">
            {isLoading ? "Processing..." : "Select Image"}
          </div>
        </label>
        <p className="text-gray-500 dark:text-gray-500 text-xs">
          Supported: PNG, JPG, JPEG, WebP | Max size: 10MB
        </p>
      </div>
    </div>
  );
}
