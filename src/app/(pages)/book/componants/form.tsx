"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import InputField from "./inputField";
import { Textarea } from "@/components/ui/textarea";

interface UploadFormProps {
  title: string;
  corner_author: string;
  selectedTag: string;
  imageUrl: string;
  content: string;
  tags: string[];
  confirmButtonText?: string;
  onTitleChange: (val: string) => void;
  onCornerAuthorChange: (val: string) => void;
  onTagChange: (val: string) => void;
  onImageUrlChange: (val: string) => void;
  onContentChange: (val: string) => void;
  onConfirm: () => void;
  onClear: () => void;
}

export default function UploadForm({
  title,
  corner_author,
  selectedTag,
  imageUrl,
  content,
  tags,
  confirmButtonText,
  onTitleChange,
  onCornerAuthorChange,
  onTagChange,
  onImageUrlChange,
  onContentChange,
  onConfirm,
  onClear
}: UploadFormProps) {
  const [isValidImage, setIsValidImage] = useState<boolean | null>(null);

  useEffect(() => {
    if (!imageUrl.trim()) return setIsValidImage(null);
    let alive = true;
    const img = new Image();
    img.onload = () => alive && setIsValidImage(true);
    img.onerror = () => alive && setIsValidImage(false);
    img.src = imageUrl;
    return () => { alive = false; };
  }, [imageUrl]);

  return (
    <div className="bg-[#ffffff] border border-[#05000c] rounded-xl p-6 shadow-2xl shadow-[#b6b6b8] w-full max-w-lg space-y-5">
      <InputField
        label="Title"
        placeholder="Enter title..."
        value={title}
        onChange={onTitleChange}
      />
      <InputField
        label="Corner Author"
        placeholder="Enter Corner author..."
        value={corner_author}
        onChange={onCornerAuthorChange}
      />

      {/* Tags */}
      <div className="space-y-2">
        <label className="text-black font-medium">Tags</label>
        <Select onValueChange={onTagChange} value={selectedTag}>
          <SelectTrigger className="w-full rounded-lg bg-[#2b2b3a] border border-[#3d3d50] text-white focus:ring-2 focus:ring-[#4ED7F1] outline-none">
            <SelectValue placeholder="Select tag" />
          </SelectTrigger>
          <SelectContent>
            {tags.map((tag) => (
              <SelectItem key={tag} value={tag}>
                {tag}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Image */}
      <div className="space-y-2">
        <label className="text-black font-medium">Image (URL)</label>
        <input
          value={imageUrl}
          onChange={(e) => onImageUrlChange(e.target.value)}
          placeholder="https://..."
          className="w-full rounded-lg bg-[#272c38] border border-[#3b4252] px-3 py-2 text-sm text-white placeholder-slate-400 focus:ring-2 focus:ring-fuchsia-500 outline-none"
        />
        {isValidImage !== null && (
          <p className={`text-xs ${isValidImage ? "text-emerald-400" : "text-red-400"}`}>
            {isValidImage ? "✅ Valid image" : "❌ Cannot load image"}
          </p>
        )}
        {isValidImage && imageUrl.trim() && (
          <img
            src={imageUrl }
            alt="Preview"
            className="mt-2 h-40 w-full object-cover rounded-md ring-1 ring-slate-600/40 transition-all duration-300 hover:scale-105"
          />
        )}
      </div>

      {/* Content */}
      <div className="space-y-2">
        <label className="text-black font-medium">Content</label>
        <Textarea
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder="Write your content here..."
          className="w-full min-h-[120px] px-4 py-2 rounded-lg bg-[#2b2b3a] border border-[#3d3d50] text-white placeholder-gray-400 focus:ring-2 focus:ring-[#4ED7F1] outline-none"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-10">
        <button
          onClick={onConfirm}
          className="bg-gradient-to-r from-[#4ED7F1] to-[#3ba6c5] hover:from-[#3ba6c5] hover:to-[#4ED7F1] text-black font-semibold px-6 py-2 rounded-xl transition-all shadow-md hover:shadow-lg"
        >
         {confirmButtonText}
        </button>
        <button
          onClick={onClear}
          className="bg-gradient-to-r from-[#f14e4e] to-[#c53b3b] hover:from-[#c53b3b] hover:to-[#f15e4e] text-black font-semibold px-6 py-2 rounded-xl transition-all shadow-md hover:shadow-lg"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
