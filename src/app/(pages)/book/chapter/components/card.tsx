import { Button } from "@/components/ui/button";

interface CardChapterProps {
    chapterTitle: string;
    chapterNumber: number;
    onDelete: () => void;
    onEdit?: () => void;
    onView: () => void;
}

const CardChapter = ({ chapterTitle, chapterNumber, onDelete, onEdit, onView }: CardChapterProps) => {
    return (
        <div className="bg-gradient-to-br from-gray-100 to-gray-100 flex justify-center items-center p-6 gap-5">
            <div className="border border-gray-200 rounded-lg p-4 gap-2 flex justify-between w-180">
                <h2 className="text-lg font-semibold">Chapter Title: {chapterTitle}</h2>
                <h2 className="text-gray-600">Chapter {chapterNumber}</h2>
            </div>
            <div className="flex gap-2">
                <Button 
                onClick={onEdit}
                className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-1 px-2 rounded">
                    Edit Chapter
                </Button>
                <Button 
                onClick={() => onDelete()}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-2 rounded">
                    Delete Chapter
                </Button>
                <Button
                onClick={() => onView()}
                 className="bg-green-600 hover:bg-green-700 text-white font-semibold py-1 px-2 rounded">
                    View Chapter
                </Button>
            </div>
        </div>
    );
}
 
export default CardChapter;