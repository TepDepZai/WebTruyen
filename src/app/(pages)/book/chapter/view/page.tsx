"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ChapterDetail } from "../../../../../../env/type/type";
import { getChapterByIdAndNumber } from "@/services/chapterService";
import { Button } from "@/components/ui/button";
import DialogForm from "../components/dialogForm";
const BookChapterViewPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const numberId = searchParams.get("number");
  const [bookDetail, setBookDetail] = useState<string[]>([]);
  const [currentChapter, setCurrentChapter] = useState<ChapterDetail | null>(null);
  const [prevChapter, setPrevChapter] = useState<number | null>(null);
  const [nextChapter, setNextChapter] = useState<number | null>(null);
  const router = useRouter();
  useEffect(() => {
    if (!id || !numberId) return;
    const fetchBookDetail = async () => {
      const data = await getChapterByIdAndNumber(id, Number(numberId));
      setBookDetail(data.chapterNumbers || []);
      setCurrentChapter(data.chapter || null);
      setPrevChapter(data.prevChapter || null);
      setNextChapter(data.nextChapter || null);
    }
    fetchBookDetail();
  }, [id, numberId]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 flex justify-center">
      <div className="w-full bg-yellow-50 shadow-lg p-6 flex flex-col items-center">
        {/* Title */}
        <div className="text-center">
          <p className="uppercase font-bold text-2xl text-yellow-600">
            {currentChapter?.bookName}
          </p>
          <p className="text-lg text-gray-700 mt-2 font-medium">
            Chương {currentChapter?.chapterNumber} : {currentChapter?.chapterName}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4 mt-6">
          <Button
            disabled={!prevChapter} onClick={() => router.push(`/book/chapter/view?id=${id}&number=${prevChapter}`)}
            className="px-4 py-2 rounded-lg bg-gray-200 text-black hover:bg-gray-300 transition">
            Back
          </Button>
          <DialogForm nameDialog="List" items={bookDetail.map(chapter => chapter)} id={id} currentChapterNumber={currentChapter?.chapterNumber} />
          <Button
            disabled={!nextChapter} onClick={() => router.push(`/book/chapter/view?id=${id}&number=${nextChapter}`)}
            className="px-4 py-2 rounded-lg bg-gray-200 text-black hover:bg-gray-300 transition">
            Next
          </Button>
        </div>

        {/* Content */}
        <div className="mt-6 text-justify leading-relaxed text-gray-800 whitespace-pre-wrap">
          <p>{currentChapter?.chapterContent}</p>
        </div>
        <div className="flex justify-between w-full mt-6">
          <Button
            disabled={!prevChapter} onClick={() => router.push(`/book/chapter/view?id=${id}&number=${prevChapter}`)}

            className="p-6 rounded-lg bg-blue-200 text-black hover:bg-gray-300 transition">
            Back
          </Button>
          <Button
            disabled={!nextChapter} onClick={() => router.push(`/book/chapter/view?id=${id}&number=${nextChapter}`)}
            className="p-6 rounded-lg bg-blue-200 text-black hover:bg-gray-300 transition">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookChapterViewPage;
