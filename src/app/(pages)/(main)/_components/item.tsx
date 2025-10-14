"use client";

import { useEffect, useState } from "react";
import { BookMainPage, PaginationResponse } from "../../../../../env/type/type";
import { getAllBooksMainPage } from "@/services/mainPage";
import { useRouter, useSearchParams } from "next/navigation";
import AppPagination from "../../_components/pagination";
import AIChatBotBox from "./AIChatBot";

const ItemMain = () => {
  const [books, setBooks] = useState<BookMainPage[]>([]);
  const [pagination, setPagination] = useState<PaginationResponse<BookMainPage[]>>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const size = searchParams.get("size");
  useEffect(() => {
    const getAllBooks = async () => {
      const allBooks = await getAllBooksMainPage(Number(page) || 1, Number(size) || 10);
      setBooks(allBooks.books);
      setPagination(allBooks.pagination);
    };
    getAllBooks();
  }, [page, size]);

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
    <div className="">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-4">
        {books.map((book) => (
          <div
            onClick={() => router.push(`/book/view?id=${book.id}`)}
            key={book.id}
            className="flex flex-col bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden"
          >
            {/* Ảnh bìa */}
            <div className="w-full h-52 overflow-hidden relative">
              <img
                src={book.img}
                alt={book.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Tiêu đề */}
            <div className="p-3 flex flex-col flex-1">
              <h2
                className="h-11 font-semibold text-center text-gray-800 text-sm line-clamp-2 group-hover:text-blue-600 transition-colors duration-200"
              >
                {book.title}
              </h2>
              {/* Danh sách chapter */}
              <div className="mt-3 border-t pt-2 space-y-1 text-xs text-gray-600">
                {book.Chapter?.slice(0, 3).map((chapter) => (
                  <div className="flex justify-between" key={chapter._id}>
                    <span>Chap {chapter.ChapterNumber}</span>
                    <span className="text-gray-500">
                      {timeAgo(chapter.createdAt)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <AIChatBotBox />
      </div>
      <AppPagination
        total_pages={pagination?.total_pages || 1}
        page={pagination?.page || 1}
        has_next={pagination?.has_next || false}
        has_prev={pagination?.has_prev || false} />
    </div>
  );
};

export default ItemMain;
