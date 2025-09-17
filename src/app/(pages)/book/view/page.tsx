"use client"
import { useEffect, useState } from "react";
import { BookDetail } from "../../../../../env/type/type";
import { getBookByIdMainPage } from "@/services/mainPage";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
    

const BookViewPage = () => {
    const [author, setAuthor] = useState(false)
    const searchParams = useSearchParams();
    const id = searchParams.get("id"); 
    const [bookDetail, setBookDetail] = useState<BookDetail | null>(null);
    const router = useRouter();
    useEffect(() => {
        const fetchBookDetail = async () => {
            if (!id) return;
            const data = await getBookByIdMainPage(id);
            setBookDetail(data.book);
            setAuthor(data.author);
        };
        fetchBookDetail();
    }, [id]);

    const timeAgo = (date: string) => {
  const now = new Date();
  const past = new Date(date);
  const diff = Math.floor((now.getTime() - past.getTime()) / 1000); 

  if (diff < 60) return `${diff} second ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;
  if (diff < 2592000) return `${Math.floor(diff / 604800)} weeks ago`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)} months ago`;
  return `${Math.floor(diff / 31536000)} years ago`;
};


    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            <h2 className="text-4xl font-bold mb-6">{bookDetail?.title}</h2>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-96">
                    <img
                        className="w-full h-[500px] object-cover rounded-xl shadow-lg border-4 border-white"
                        src={bookDetail?.img}
                        alt="Book Cover"
                    />
                </div>
                <div className="flex-1 space-y-3 text-md">
                    <p className="text-gray-700"><span className="font-semibold">Author:</span> {bookDetail?.author}</p>
                    <p className="text-gray-700"><span className="font-semibold">Corner Author:</span> {bookDetail?.author}</p>
                    <p className="text-gray-700"><span className="font-semibold">Genre:</span> {bookDetail?.tags}</p>
                    <p className="text-gray-700"><span className="font-semibold">Date:</span> {timeAgo(bookDetail?.createdAt ?? "")}</p>
                    <p className="text-gray-700"><span className="font-semibold">Date Update:</span> {timeAgo(bookDetail?.updatedAt ?? "")}</p>
                    <p className="text-gray-700"><span className="font-semibold">Status:</span> {bookDetail?.status}</p>
                    <div>
                        <span className="font-semibold text-gray-800">Description:</span>
                        <p className="text-gray-600 mt-1 max-h-48 overflow-y-auto pr-2 leading-relaxed">
                            {bookDetail?.content || "No description available."}
                        </p>
                    </div>
                </div>
                <div>
                    {author && (
                        <div className="flex gap-2">
                            <Button
                            id="add-chapter-button"
                            onClick={() => router.push(`/book/chapter?id=${id}`)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md">
                                Add Chapter
                            </Button>
                            <Button 
                            id="edit-book-button"
                            onClick={() => router.push(`/book?id=${id}`)}
                            className="bg-green-500 text-white px-4 py-2 rounded-md">
                                Edit Book
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-3 flex flex-col justify-center items-center">
               <h3 className="text-2xl font-bold mb-4">Chapters</h3>
               <div className="border-2 border-gray-500 w-150 h-100 overflow-y-auto">
                    <div>{bookDetail?.Chapter.map(chapter => (
                        <div className="flex justify-between p-4 hover:bg-blue-100 hover:text-blue-600 " 
                        onClick={() => router.push(`/book/chapter/view?id=${bookDetail.id}&number=${chapter.ChapterNumber}`)}
                        key={chapter._id}>
                            <h4 className="font-semibold">Chapter {chapter.ChapterNumber}: {chapter.ChapterName}</h4>
                            <p className="text-gray-600">{timeAgo(chapter.createdAt)}</p>
                        </div>
                    ))}</div>
               </div>
            </div>
        </div>
    );
};

export default BookViewPage;
