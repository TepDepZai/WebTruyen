"use client";

import { useEffect, useState } from "react";
import { createBook, deleteBook, getAllBooks, getBookById, updateBook } from "@/services/bookService";
import Card from "./componants/card";
import { BookForId, } from "../../../../env/type/type";
import UploadForm from "./componants/form";
import { useRouter, useSearchParams } from "next/dist/client/components/navigation";
import { ChevronLeft } from "lucide-react";
import useToastState from "../_components/hook/useToast";
import { AppAlertDialog } from "../_components/alertDialog";
import { useAlertDialog } from "../_components/hook/useAlertDialog";
const TAGS = ["Manga", "Manhua", "Manhwa"];
const UpLoad = () => {
  const [title, setTitle] = useState("");
  const [corner_author, setCorner_author] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [currentBookId, setCurrentBookId] = useState<string | null>(null)
  const [content, setContent] = useState("");
  const [dataBooks, setDataBooks] = useState<BookForId[]>([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const { alertDialogProps, setAlertDialogProps } = useAlertDialog();

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  const { setToast } = useToastState();
  const handleUpload = async () => {
    try {
      await createBook(
        {
          title,
          content,
          tags: selectedTag,
          img: imageUrl,
          author: corner_author,
        });
      handleClear();
      const books = await getAllBooks();
      setDataBooks(books.paperPoints || []);
      setToast({
        title: "Upload Successful",
        message: "Your book has been uploaded successfully!",
        variant: "success",
      });

    } catch (error) {
      setToast({
        title: "Upload Failed",
        message: "There was an error uploading your book. Please try again.",
        variant: "error",
      });
      return;
    }
  };
  useEffect(() => {
    if (id) {
      handleGetById(id);
    }
  }, [id]);


  const handleDelete = (id: string) => {
    setAlertDialogProps({
      title: "Xác nhận xóa",
      description: "Bạn có chắc chắn muốn xóa sách này?",
      submitText: "Xóa",
      onSubmit: async () => {
        try {
          await deleteBook(id);
          setDataBooks((prev) => prev.filter((book) => book.id !== id));
          setToast({
            title: "Delete Successful",
            message: "Your book has been deleted successfully!",
            variant: "success",
          });
        } catch (error) {
          setToast({
            title: "Delete Failed",
            message: "There was an error deleting your book. Please try again.",
            variant: "error",
          });
        }
      },
      open: true,
      setOpen: setOpenAlertDialog,
    });
    setOpenAlertDialog(true);
  };

  const handleUpdate = async (id: string) => {
    try {
      await updateBook(id, {
        title,
        content,
        tags: selectedTag,
        img: imageUrl,
        author: corner_author,
      });
      handleClear();
      setCurrentBookId(null);
      setIsUpdate(false)
      setToast({
        title: "Update Successful",
        message: "Your book has been updated successfully!",
        variant: "success",
      });
      const books = await getAllBooks();
      setDataBooks(books.paperPoints || []);
    } catch (error) {
      setToast({
        title: "Update Failed",
        message: "There was an error updating your book. Please try again.",
        variant: "error",
      });
    }
  }
  const handleSubmitUpdate = async () => {
    if (!currentBookId) return;
    await handleUpdate(currentBookId);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("id");
    router.push(`/book?${params.toString()}`, { scroll: false });
  };
  const handleGetById = async (id: string) => {
    try {
      const res = await getBookById(id);
      const book = res?.paperPoint;
      if (!book) return;
      setCurrentBookId(book.id || id);
      setTitle(book.title || "");
      setCorner_author(book.author || "");
      setImageUrl(book.img || "");
      setSelectedTag(book.tags?.[0] || "");
      setContent(book.content || "");
      setIsUpdate(true);
      const params = new URLSearchParams(searchParams.toString());
      params.set("id", book.id || id);
      router.push(`/book?${params.toString()}`, { scroll: false });
    } catch (error) {
      setToast({
        title: "Fetch Failed",
        message: "There was an error fetching the book. Please try again.",
        variant: "error",
      });
    }
  };
  const handleClear = () => {
    setTitle("");
    setCorner_author("");
    setSelectedTag("");
    setImageUrl("");
    setContent("");
  }
  useEffect(() => {
    const fetchBooks = async () => {
      const books = await getAllBooks();
      console.log(books);
      setDataBooks(books.paperPoints || []);
    };
    fetchBooks();
  }, []);

  const handleCancelUpdate = () => {
    setIsUpdate(false);
    handleClear();
    const params = new URLSearchParams(searchParams.toString());
    params.delete("id");
    router.push(`/book?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col items-center min-h-screen  p-6">
      <div className="flex justify-start w-full mb-6">
        <button
          onClick={() => router.push("/profile")}
          className="flex items-center gap-2 mb-6 border border-blue-200 px-4 py-2 rounded-xl bg-white shadow-sm hover:shadow-md transition"
        >
          <ChevronLeft /> Back to Menu
        </button>
      </div>
      <h1 className="text-4xl font-bold text-[#4ED7F1] mb-6">Upload Page</h1>
      <div className="max-w-lg w-full">
        {!isUpdate ? (<UploadForm
          title={title}
          corner_author={corner_author}
          selectedTag={selectedTag}
          imageUrl={imageUrl}
          content={content}
          tags={TAGS}
          confirmButtonText="Upload"
          onTitleChange={setTitle}
          onCornerAuthorChange={setCorner_author}
          onTagChange={setSelectedTag}
          onImageUrlChange={setImageUrl}
          onContentChange={setContent}
          onConfirm={handleUpload}
          onClear={handleClear}
        />) : (
          <div >
            <div className="flex justify-end mb-4">
              <button
                onClick={() => { handleCancelUpdate() }}
                className="px-4 py-2 rounded-xl border border-red-500 text-red-500 bg-red-50 hover:bg-red-100 hover:text-red-600 transition-colors duration-200 shadow-sm"
              >
                ✖ Cancel Update
              </button>
            </div>
            <UploadForm
              title={title}
              corner_author={corner_author}
              selectedTag={selectedTag}
              imageUrl={imageUrl}
              content={content}
              confirmButtonText="Update"
              tags={TAGS}
              onTitleChange={setTitle}
              onCornerAuthorChange={setCorner_author}
              onTagChange={setSelectedTag}
              onImageUrlChange={setImageUrl}
              onContentChange={setContent}
              onConfirm={handleSubmitUpdate}
              onClear={handleClear}
            />
          </div>)}
      </div>
      <div className="mt-10 border-2 border-gray-700 p-4 gap-4  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {dataBooks.map((book) => (
          <Card key={book.id} id={book.id}
            title={book.title} author={book.createdByName}
            tags={book.tags} imageUrl={book.img}
            corner_author={book.author}
            triggerDelete={() => handleDelete(book.id)}
            onClick={() => handleGetById(book.id)}
          />
        ))}
      </div>
      <AppAlertDialog
        title={alertDialogProps.title || "Xác nhận xóa quyền"}
        description={alertDialogProps.description || "Bạn có chắc chắn muốn xóa quyền này?"}
        open={openAlertDialog}
        setOpen={setOpenAlertDialog}
        onSubmit={() => { alertDialogProps.onSubmit?.(); setOpenAlertDialog(false); }}
      />
    </div>
  );
};
export default UpLoad;
