"use client"
import { useEffect, useState } from "react";
import { BookDetail } from "../../../../../env/type/type";
import { getBookByIdMainPage } from "@/services/mainPage";
import { useRouter, useSearchParams } from "next/navigation";
    

const BookViewPage = () => {
    const searchParams = useSearchParams();
    const [author, setAuthor] = useState(false)
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
                    <p className="text-gray-700"><span className="font-semibold">Date:</span> {bookDetail?.createdAt}</p>
                    <p className="text-gray-700"><span className="font-semibold">Date Update:</span> {bookDetail?.updatedAt}</p>
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
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                                Add Chapter
                            </button>
                            <button 
                            onClick={() => router.push(`/book?id=${id}`)}
                            className="bg-green-500 text-white px-4 py-2 rounded-md">
                                Edit Book
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookViewPage;
