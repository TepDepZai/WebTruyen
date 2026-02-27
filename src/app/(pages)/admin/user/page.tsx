"use client";
import { useEffect, useState, useMemo } from "react";
import { useSearchParams, forbidden } from "next/navigation";
import { PaginationResponse, User } from "../../../../../env/type/type";
import { getAllUsers } from "@/services/authService";
import { useAdmin } from "../../_components/hook/useAdmin";
import CardAdmin from "../components/cardAdmin";
import AppPagination from "../../_components/pagination";
import { AppSearch } from "../../_components/search";
import TabBarAdmin from "../components/tabBarAdmin";
import ViewUserDialog from "./dialog/view.dialog";
import StatsCard from "../components/statsCard";
import FilterTabsAdmin from "../components/filterTabsAdmin";
import { Users, UserCheck, UserX, Shield, BookUser } from "lucide-react";
import { stats } from "../../../../../env/type/typeUser";
import AssginUserDialog from "./dialog/Assig.dialog";


const UserPage = () => {
  const searchParam = useSearchParams();
  const page = searchParam.get("page") || 1;
  const size = searchParam.get("size") || 9;
  const search = searchParam.get("search") || "";
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<PaginationResponse<User>>();
  const [stats, setStats] = useState<stats | undefined>();
  const [filter, setFilter] = useState<string>("all");
  const { isAdmin, loading } = useAdmin();

  if (!isAdmin) {
    if (!loading) {
      forbidden();
    }
  }

  const fetchGetAllUsers = async () => {
    const response = await getAllUsers(Number(page), Number(size), search, filter);
    setUsers(response.users);
    setStats(response.stats);
    setPagination(response.pagination);
  };

  useEffect(() => {
    fetchGetAllUsers();
  }, [page, size, search, filter]);



  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B0B0E] to-[#1B1B23] py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-[#F5C452] to-[#FFD700] bg-clip-text text-transparent drop-shadow-lg">
            User Management
          </h1>
          <TabBarAdmin />
          <div className="w-full md:w-1/3">
            <AppSearch placeholder="Search users..." />
          </div>
        </div>

        <p className="text-gray-300 text-base font-medium">
          Manage user accounts, roles, and permissions easily.
        </p>

        {/* Filter Tabs */}
        <FilterTabsAdmin
          activeTab={filter}
          onTabChange={setFilter}
        />

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <StatsCard
            title="Total Users"
            value={stats?.totalUsers || 0}
            icon={Users}
            description="All registered users"
            colorClass="from-blue-500/20 to-blue-600/10"
          />
          <StatsCard
            title="Active Users"
            value={stats?.activeUsers || 0}
            icon={UserCheck}
            description="Currently active"
            colorClass="from-green-500/20 to-emerald-500/10"
          />
          <StatsCard
            title="Inactive Users"
            value={stats?.inactiveUsers || 0}
            icon={UserX}
            description="Deactivated accounts"
            colorClass="from-red-500/20 to-rose-500/10"
          />
          <StatsCard
            title="Admins"
            value={stats?.admins || 0}
            icon={Shield}
            description="System administrators"
            colorClass="from-purple-500/20 to-violet-500/10"
          />
          <StatsCard
            title="Authors"
            value={stats?.authors || 0}
            icon={BookUser}
            description="Content creators"
            colorClass="from-[#F5C452]/20 to-[#FFD700]/10"
          />
        </div>

        <ViewUserDialog userData={users} />
        <AssginUserDialog userData={users} />

        {users.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-gray-400 text-lg">No users found</p>
          </div>
        ) : (
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
        )}

        <div className="flex justify-center pt-6">
          <AppPagination
            key={`${page}-${size}`}
            size={Number(size) || 9}
            total_pages={pagination?.totalPages || 1}
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
