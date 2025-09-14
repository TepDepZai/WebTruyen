"use client";
import { Input } from "@/components/ui/input";
import CardAdmin from "../components/cardAdmin";
import { useEffect, useState } from "react";
import { User } from "../../../../../env/type/type";
import { getAllUsers } from "@/services/authService";
import AppPagination from "../../_components/pagination";
import { useSearchParams } from "next/navigation";
import ViewUserDialog from "./dialog/view.dialog";
const UserPage = () => {
    const searchParam = useSearchParams();
    const page = searchParam.get("page") || 1;
    const size = searchParam.get("size") || 10;
    const [users, setUsers] = useState<User[]>([]);
    const [pagination, setPagination] = useState({
        has_prev: false,
        has_next: false,
        page: 1,
        total_pages: 1
    });
    const fetchGetAllUsers = async () => {
            const response = await getAllUsers(Number(page) || 1, Number(size) || 10);
            setUsers(response.users);
            setPagination(response.pagination);
        };
    useEffect(() => {
        fetchGetAllUsers();
    }, [page, size]);
  return (
    <div className="p-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold mb-4">User Management</h1>
          <div className="w-1/3">
            <Input placeholder="Search users..." />
          </div>
        </div>
        <p className="text-gray-600">Manage user accounts and permissions</p>
      </div>
      <ViewUserDialog userData={users} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user, index) => (
          <CardAdmin
            key={user._id }
            _id={user._id}
            name={user.fullName || "No Name"}
            role={user.role || "No Role"}
            email={user.email}
            activated={user.isActive}
            refresh={fetchGetAllUsers}
          />
        ))}
      </div>
      <AppPagination
        has_next={pagination.has_next}
        has_prev={pagination.has_prev}
        page={pagination.total_pages}
        total_pages={pagination.page}
      />
    </div>
  );
};

export default UserPage;
