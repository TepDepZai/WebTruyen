"use client";
import { useEffect, useState } from "react";
import { useSearchParams, forbidden } from "next/navigation";
import { PaginationResponse, User } from "../../../../../env/type/type";
import { getAllUsers } from "@/services/authService";
import { useAdmin } from "../../_components/hook/useAdmin";

import CardAdmin from "../components/cardAdmin";
import AppPagination from "../../_components/pagination";
import { AppSearch } from "../../_components/search";
import TabBarAdmin from "../components/tabBarAdmin";
import ViewUserDialog from "./dialog/view.dialog";

const UserPage = () => {
  const searchParam = useSearchParams();
  const page = searchParam.get("page") || 1;
  const size = searchParam.get("size") || 10;
  const search = searchParam.get("search") || "";

  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<PaginationResponse<User>>();


  const { isAdmin, loading } = useAdmin();

  if (!isAdmin) {
    if (!loading) {
      forbidden();
    }
  }

  const fetchGetAllUsers = async () => {
    const response = await getAllUsers(Number(page), Number(size), search);
    setUsers(response.users);
    setPagination(response.pagination);
  };

  useEffect(() => {
    fetchGetAllUsers();
  }, [page, size, search]);

  return (
    <div>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
            User Management
          </h1>

          <TabBarAdmin />

          <div className="w-full md:w-1/3">
            <AppSearch placeholder="Search users..." />
          </div>
        </div>

        <p className="text-gray-600 text-base">
          Manage user accounts, roles, and permissions easily.
        </p>

        <ViewUserDialog userData={users} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {users.map((user) => (
            <CardAdmin
              key={user._id}
              _id={user._id}
              name={user.fullName || "No Name"}
              role={user.role || "No Role"}
              email={user.email}
              activated={user.isActive}
              refresh={fetchGetAllUsers}
            />
          ))}
        </div>

        <div className="flex justify-center pt-6">
          <AppPagination
            total_pages={pagination?.total_pages || 1}
            page={pagination?.page || 1}
            has_next={pagination?.has_next || false}
            has_prev={pagination?.has_prev || false}
          />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
