"use client";

import AppPagination from "../../_components/pagination";
import { AppSearch } from "../../_components/search";
import CardBooks from "../components/cardBooks";
import TabBarAdmin from "../components/tabBarAdmin";
import { deleteBooksAdmin, getAllBooksAdmin, updateBooksAdmin } from "@/services/adminService";
import { use, useEffect, useState } from "react";
import { BookAdmin, StateBookAdmin } from "../../../../../env/type/typeBookAdmin";
import { PaginationResponse } from "../../../../../env/type/type";
import { useRouter, useSearchParams } from "next/navigation";
import ViewBookDialog from "./dialog/view.dialog";
import EditBookDialog from "./dialog/edit.dialog";
import { AppAlertDialog } from "../../_components/alertDialog";
import useToastState from "../../_components/hook/useToast";
import { useAlertDialog } from "../../_components/hook/useAlertDialog";


const ListBookPage = () => {
  const [books, setBooks] = useState<BookAdmin[]>([]);
  const [stateBook, setStateBook] = useState<StateBookAdmin[]>([]);
  const [pagination, setPagination] = useState<PaginationResponse<BookAdmin>>();
  const { alertDialogProps, setAlertDialogProps } = useAlertDialog();
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const size = searchParams.get("size");
  const router = useRouter();
  const userId = searchParams.get("id");
  const mode = searchParams.get("mode");
  const open = mode === "view";
  const search = searchParams.get("search") || "";
  const { setToast } = useToastState();

  const reqBooks = async () => {
    const data = await getAllBooksAdmin(Number(page) || 1, Number(size) || 9, search);
    console.log(data);
    setBooks(data.books);
    setStateBook(data.books);
    setPagination(data.pagination);
  };
  useEffect(() => {
    reqBooks();
  }, [page, size, search]);

  const handlePageQueryToModal = (mode: string, id?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("mode", mode);
    if (id) {
      params.set("id", id);
    } else {
      params.delete("id");
    }
    router.push(`/admin/listBook?${params.toString()}`, { scroll: false });
  };
  const handleDeleteBook = (id: string) => {
    setAlertDialogProps({
      title: "Confirm Deletion",
      description: "Are you sure you want to delete this book?",
      onSubmit: async () => {
        try {
          await deleteBooksAdmin(id);
          reqBooks();
          setToast({
            title: "Book Deleted",
            message: "The book has been successfully deleted.",
            variant: "success",
          });
        } catch (error) {
          setToast({
            title: "Deletion Failed",
            message: "There was an error deleting the book. Please try again.",
            variant: "error",
          });
        }
      },
      open: true,
      setOpen: setOpenAlertDialog,
    });
    setOpenAlertDialog(true);
  };
  const handleEditBook = async (data: { id: string; roleBar: boolean; status: string }) => {
    try {
      await updateBooksAdmin(data.id, {
        roleBar: data.roleBar,
        status: data.status
      });
      await reqBooks();
      
      setToast({
        title: "Book Updated",
        message: "The book has been successfully updated.",
        variant: "success",
      });
    } catch (error) {
      setToast({
        title: "Update Failed",
        message: "There was an error updating the book. Please try again.",
        variant: "error",
      });
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B0B0E] to-[#1B1B23] py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-[#F5C452] to-[#FFD700] bg-clip-text text-transparent drop-shadow-lg">
            Book Management
          </h1>
          <TabBarAdmin />
          <div className="w-full md:w-1/3">
            <AppSearch placeholder="Search Books..." />
          </div>
        </div>
        
        <p className="text-gray-300 text-base font-medium">
          Manage book inventory, details, and availability with ease.
        </p>
        
        <ViewBookDialog userData={books} />
        <EditBookDialog userData={stateBook} onSubmit={handleEditBook} />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => (
            <CardBooks
              key={book.id}
              img={book.img}
              title={book.title}
              author={book.author}
              state={book.status}
              onView={() => { handlePageQueryToModal("view", book.id); }}
              onEdit={() => { handlePageQueryToModal("edit", book.id); }}
              onDelete={() => { handleDeleteBook(book.id); }}
            />
          ))}
        </div>
        
        <AppAlertDialog
          title={alertDialogProps.title || "Xác nhận xóa book"}
          description={alertDialogProps.description || "Bạn có chắc chắn muốn xóa book này?"}
          open={openAlertDialog}
          setOpen={setOpenAlertDialog}
          onSubmit={() => { alertDialogProps.onSubmit?.(); setOpenAlertDialog(false); }}
        />
        
        <div className="flex justify-center pt-6">
          <AppPagination
            total_pages={pagination?.totalPages || 1}
            page={pagination?.page || 1}
            has_next={pagination?.has_next || false}
            has_prev={pagination?.has_prev || false}
            size={Number(size) || 9}
          />
        </div>
      </div>
    </div>
  );
};

export default ListBookPage;
