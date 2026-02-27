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
      return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    case "draft":
      return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    default:
      return "bg-slate-500/20 text-slate-300 border-slate-500/30";
  }
};

  return (
    <Card className="group w-full max-w-sm overflow-hidden rounded-xl shadow-xl hover:shadow-2xl border border-[#F5C452]/30 bg-gradient-to-br from-[#1B1B23] to-[#14141A] hover:border-[#F5C452]/50 transition-all duration-300 hover:-translate-y-1">
      <div className="p-5">
        <div className="flex gap-4 mb-4">
          <div className="relative w-16 h-20 flex-shrink-0">
            <img
              src={img}
              alt={`${title} cover`}
              className="w-full h-full object-cover rounded-lg shadow-md ring-1 ring-[#F5C452]/20"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder-book.png"; 
              }}
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white text-base leading-tight truncate mb-1">
              {title}
            </h3>
            <p className="text-sm text-gray-400 truncate mb-2">
              by {author}
            </p>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStateColor(state)}`}>
              {state}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={onView}
            size="sm"
            variant="outline"
            className="flex-1 h-8 text-xs font-medium text-[#F5C452] border-[#F5C452]/40 hover:bg-[#F5C452]/10 hover:border-[#F5C452] transition-colors"
          >
            <Eye className="w-3.5 h-3.5 mr-1.5" />
            View
          </Button>
          <Button
            onClick={onEdit}
            size="sm"
            variant="outline"
            className="flex-1 h-8 text-xs font-medium text-blue-400 border-blue-500/40 hover:bg-blue-500/10 hover:border-blue-500 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5 mr-1.5" />
            Edit
          </Button>
          <Button
            onClick={onDelete}
            size="sm"
            variant="outline"
            className="flex-1 h-8 text-xs font-medium text-red-400 border-red-500/40 hover:bg-red-500/10 hover:border-red-500 transition-colors"
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