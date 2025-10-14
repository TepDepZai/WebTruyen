"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ChapterDetail } from "../../../../../../env/type/type";
import { getChapterByIdAndNumber } from "@/services/chapterService";
import { Button } from "@/components/ui/button";
import DialogForm from "../components/dialogForm";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AISmooth } from "@/services/AIService";
import { Loader2 } from "lucide-react"; // thêm icon loader từ lucide-react

const BookChapterViewPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const numberId = searchParams.get("number");
  const [bookDetail, setBookDetail] = useState<string[]>([]);
  const [currentChapter, setCurrentChapter] = useState<ChapterDetail | null>(null);
  const [prevChapter, setPrevChapter] = useState<number | null>(null);
  const [nextChapter, setNextChapter] = useState<number | null>(null);
  const [language, setLanguage] = useState<string>("en");
  const [AIGenContent, setAIGenContent] = useState<string>("");
  const [AIContent, setAIContent] = useState(false);
  const [loading, setLoading] = useState(false); // 🔹 thêm state loading
  const router = useRouter();

  useEffect(() => {
    if (!id || !numberId) return;
    const fetchBookDetail = async () => {
      const data = await getChapterByIdAndNumber(id, Number(numberId));
      setBookDetail(data.chapterNumbers || []);
      setCurrentChapter(data.chapter || null);
      setPrevChapter(data.prevChapter || null);
      setNextChapter(data.nextChapter || null);
    };
    fetchBookDetail();
  }, [id, numberId]);

  const reqAISmooth = async () => {
    try {
      setLoading(true);
      const res = await AISmooth(
        currentChapter?.chapterContent || "",
        language,
        currentChapter?.chapterName || ""
      );
      const data = res?.answer || "Không nhận được phản hồi."
      setAIGenContent(data);
      setAIContent(true);
    } catch (error) {
      console.error("AI Smooth error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 flex justify-center">
      <div className="fixed left-1 w-45 h-45 bg-[#9582ae] md:flex hidden flex-col items-center  text-white p-1 border-r-3 border-gray-300 rounded-xl">
        <div className="bg-white w-43 h-43 rounded-2xl flex flex-col items-center justify-center text-black ">
          AI ToolBar
          <div className="flex flex-col space-y-4 mt-4">
            <Select onValueChange={(value) => setLanguage(value)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Language</SelectLabel>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="vi">Vietnamese</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="zh">Chinese</SelectItem>
                  <SelectItem value="hi">Hindi</SelectItem>
                  <SelectItem value="ar">Arabic</SelectItem>
                  <SelectItem value="pt">Portuguese</SelectItem>
                  <SelectItem value="ru">Russian</SelectItem>
                  <SelectItem value="ja">Japanese</SelectItem>
                  <SelectItem value="ko">Korean</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="id">Indonesian</SelectItem>
                  <SelectItem value="bn">Bengali</SelectItem>
                  <SelectItem value="ur">Urdu</SelectItem>
                  <SelectItem value="it">Italian</SelectItem>
                  <SelectItem value="tr">Turkish</SelectItem>
                  <SelectItem value="th">Thai</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button onClick={reqAISmooth} disabled={loading}>
              {loading ? (
                <div className="flex items-center space-x-2">
                  <Loader2 className="animate-spin w-4 h-4" />
                  <span>Processing...</span>
                </div>
              ) : (
                "AI Smooth"
              )}
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full bg-yellow-50 shadow-lg p-6 flex flex-col items-center">
        <div className="text-center">
          <p className="uppercase font-bold text-2xl text-yellow-600">
            {currentChapter?.bookName}
          </p>
          <p className="text-lg text-gray-700 mt-2 font-medium">
            Chương {currentChapter?.chapterNumber} : {currentChapter?.chapterName}
          </p>
        </div>
        <div className="flex space-x-4 mt-6">
          <Button
            disabled={!prevChapter}
            onClick={() => router.push(`/book/chapter/view?id=${id}&number=${prevChapter}`)}
            className="px-4 py-2 rounded-lg bg-gray-200 text-black hover:bg-gray-300 transition"
          >
            Back
          </Button>
          <DialogForm
            nameDialog="List"
            items={bookDetail.map((chapter) => chapter)}
            id={id}
            currentChapterNumber={currentChapter?.chapterNumber}
          />
          <Button
            disabled={!nextChapter}
            onClick={() => router.push(`/book/chapter/view?id=${id}&number=${nextChapter}`)}
            className="px-4 py-2 rounded-lg bg-gray-200 text-black hover:bg-gray-300 transition"
          >
            Next
          </Button>
        </div>
        <div className="mt-6 text-justify leading-relaxed text-gray-800 whitespace-pre-wrap w-full">
          {loading ? (
            <div className="flex justify-center items-center mt-10 text-gray-600">
              <Loader2 className="animate-spin w-6 h-6 mr-2" /> Loading AI translation...
            </div>
          ) : AIContent ? (
            <p>{AIGenContent}</p>
          ) : (
            <p>{currentChapter?.chapterContent}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookChapterViewPage;
