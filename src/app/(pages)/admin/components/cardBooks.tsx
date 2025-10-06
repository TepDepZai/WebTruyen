"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, Edit3, Trash2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface CardBooksProps {
  img: string;
  title: string;
  author: string;
  state: string;
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const CardBooks = ({ img, title, author, state, onView, onEdit, onDelete }: CardBooksProps) => {
    const searchParam = useSearchParams();
    const router = useRouter();
    const bookId = searchParam.get("id");
    const mode = searchParam.get("mode");
    const open = mode === "view";
  
const getStateColor = (state?: string) => {
  switch (state?.toLowerCase()) {
    case "published":
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "draft":
      return "bg-amber-100 text-amber-700 border-amber-200";
    default:
      return "bg-slate-100 text-slate-700 border-slate-200";
  }
};

  return (
    <Card className="group w-full max-w-sm overflow-hidden rounded-xl shadow-sm hover:shadow-lg border border-slate-200/60 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1">
      <div className="p-5">
        <div className="flex gap-4 mb-4">
          <div className="relative w-16 h-20 flex-shrink-0">
            <img
              src={img}
              alt={`${title} cover`}
              className="w-full h-full object-cover rounded-lg shadow-sm ring-1 ring-slate-200/50"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder-book.png"; 
              }}
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 text-base leading-tight truncate mb-1">
              {title}
            </h3>
            <p className="text-sm text-slate-600 truncate mb-2">
              by {author}
            </p>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStateColor(state)}`}>
              {state}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={onView}
            size="sm"
            variant="outline"
            className="flex-1 h-8 text-xs font-medium text-slate-700 border-slate-300 hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 mr-1.5" />
            View
          </Button>
          <Button
            onClick={onEdit}
            size="sm"
            variant="outline"
            className="flex-1 h-8 text-xs font-medium text-blue-700 border-blue-300 hover:bg-blue-50 hover:text-blue-900 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5 mr-1.5" />
            Edit
          </Button>
          <Button
            onClick={onDelete}
            size="sm"
            variant="outline"
            className="flex-1 h-8 text-xs font-medium text-red-700 border-red-300 hover:bg-red-50 hover:text-red-900 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5 mr-1.5" />
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CardBooks;