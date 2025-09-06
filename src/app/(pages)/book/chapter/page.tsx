"use client";

import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import * as mammoth from "mammoth";
import { getBookById } from "@/services/bookService";
import { useRouter, useSearchParams } from "next/navigation";
import { BookForId } from "../../../../../env/type/type";
import { createChapter, deleteChapter, updateChapter } from "@/services/chapterService";
import CardChapter from "./components/card";
import { ChapterId } from "../../../../../env/type/typeChapter";
import ChapterForm from "./components/form";
import { ChevronLeft } from "lucide-react";

const CreateChapterPage = () => {
    const [chapterName, setChapterName] = useState("");
    const [chapterNumber, setChapterNumber] = useState("");
    const [bookId, setBookId] = useState<BookForId | null>(null);
    const [chapterContent, setChapterContent] = useState("");
    const [chapter, setChapter] = useState<ChapterId[]>([]);
    const [idChapter, setIdChapter] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [isEdit, setIsEdit] = useState(false);
    const router = useRouter();
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const arrayBuffer = await file.arrayBuffer();
        const { value } = await mammoth.extractRawText({ arrayBuffer });
        setChapterContent(value);
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createChapter({
            chapterName: chapterName,
            chapterNumber: Number(chapterNumber),
            content: chapterContent,
            bookId: bookId?.id || "",
            bookName: bookId?.title || "",
            createdByName: bookId?.createdByName || ""
        });

        const updatedBook = await getBookById(id || "");
        setChapter(updatedBook.paperPoint.Chapter);

        // Reset form 
        handleReset();
    };
    const handleReset = () => {
        setChapterName("");
        setChapterNumber("");
        setChapterContent("");
    };
    useEffect(() => {
        const getBook = async () => {
            if (id) {
                const book = await getBookById(id);
                setChapter(book.paperPoint.Chapter);
                setBookId(book.paperPoint);
            }
        };
        getBook();
    }, []);
    const handleDeleteChapter = async (chapterId: string) => {
        if (id) {
            await deleteChapter(id, chapterId);
            const updatedBook = await getBookById(id);
            setChapter(updatedBook.paperPoint.Chapter);
        }
    };
    const handleCancel = () => {
        setIsEdit(false);
        handleReset();
    };
    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateChapter( idChapter || "", {
            chapterName: chapterName,
            chapterNumber: Number(chapterNumber),
            content: chapterContent,
        });
        setIsEdit(false);
        const updatedBook = await getBookById(id || "");
        setChapter(updatedBook.paperPoint.Chapter);

        // Reset form 
        handleReset();
    };

    return (
        <div className="flex flex-col p-5 bg-gradient-to-br from-gray-50 to-gray-100">
            <div>        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 mb-6 border border-blue-200 px-4 py-2 rounded-xl bg-white shadow-sm hover:shadow-md transition"
        >
          <ChevronLeft /> Back to Menu
        </button></div>
            <div className="min-h-screen flex justify-center  p-3 gap-5">
                <div className=" h-113 w-80 shadow-lg rounded-2xl border border-gray-200 bg-white p-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Chapter Content
                    </label>
                    <Textarea
                        className="w-full h-100 resize-none whitespace-pre-wrap"
                        value={chapterContent}
                        onChange={(e) => setChapterContent(e.target.value)}
                        placeholder="Write your chapter content..."
                        rows={6}
                        required
                    />
                </div>
                <div>
                    {!isEdit ? <ChapterForm
                        handleSubmit={handleSubmit}
                        handleReset={handleReset}
                        chapterName={chapterName}
                        setChapterName={setChapterName}
                        chapterNumber={chapterNumber}
                        setChapterNumber={setChapterNumber}
                        bookId={bookId?.title || ""}
                        handleFileUpload={handleFileUpload}
                        submitButtonText={"Create Chapter"}
                    /> : <ChapterForm
                        handleSubmit={handleEdit}
                        handleReset={handleReset}
                        chapterName={chapterName}
                        setChapterName={setChapterName}
                        chapterNumber={chapterNumber}
                        setChapterNumber={setChapterNumber}
                        bookId={bookId?.title || ""}
                        handleFileUpload={handleFileUpload}
                        submitButtonText={"Update Chapter"}
                        isEdit={isEdit}
                        handleCancel={handleCancel}
                    />}
                </div>
                <div className="h-113 w-80 flex flex-col justify-center items-center rounded-xl shadow-lg">
                    <img
                        className="max-h-80 object-cover rounded-xl shadow-lg border-4 border-white"
                        src={bookId?.img}
                        alt="Book Cover"
                    />
                    <h1 className="text-center font-bold mt-5 tracking-wide">
                        {bookId?.title}
                    </h1>
                </div>
            </div>

            {chapter.map((ch) => (
                <div key={ch._id}>
                    <CardChapter
                        onEdit={() => {
                            setIsEdit(true);
                            setIdChapter(ch._id);
                            
                            setChapterName(ch.ChapterName || "");
                            setChapterNumber(ch.ChapterNumber ? String(ch.ChapterNumber) : "");
                            setChapterContent(ch.ChapterContent || "");
                        }}
                        onDelete={() => handleDeleteChapter(ch._id)}
                        onView={() => {
                             router.push(`/book/chapter/view?id=${id}&number=${ch.ChapterNumber}`);
                        }}
                        chapterNumber={ch.ChapterNumber || 0}
                        chapterTitle={ch.ChapterName || ""}
                    />
                </div>
            ))}

        </div>
    );
};

export default CreateChapterPage;
