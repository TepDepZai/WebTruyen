"use client"

import { useEffect, useState } from "react";
import { BookMainPage } from "../../../../../env/type/type";
import { getAllBooksMainPage } from "@/services/mainPage";
import { useRouter } from "next/navigation";

const ItemMain = () => {
    const [books, setBooks] = useState<BookMainPage[]>([]);
    useEffect(() => {
        const getAllBooks = async () => {
            const allBooks = await getAllBooksMainPage();
            setBooks(allBooks.books);
        };
        getAllBooks();
    }, []);

 const router = useRouter();
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-4">
            {books.map((book) => (
                <div
                    onClick={() => router.push(`/book/view?id=${book.id}`)}
                    key={book.id}
                    className="flex flex-col items-center bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-200 p-3 cursor-pointer group"
                >
                    <div className="w-32 h-44 mb-2 overflow-hidden rounded-lg shadow-md">
                        <img
                            src={book.img}
                            alt={book.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                    </div>
                    <h2 className="font-bold text-center text-sm text-gray-800 line-clamp-2 group-hover:text-blue-700 transition-colors duration-200">
                        {book.title}
                    </h2>
                </div>
            ))}
        </div>
    );
};

export default ItemMain;