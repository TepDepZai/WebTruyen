"use client";

import { getCurrentUser } from "@/services/authService";
import { updateUser, changePassword } from "@/services/profileService";
import { ChevronLeft, Camera } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useToastState from "../_components/hook/useToast";

const ProfileMain = () => {
  const defaultUser = {
    name: "",
    email: "",
    avatar: "./avataaars.svg",
    joinDate: "",
    readingStats: { totalRead: 0, favorites: 0, currentlyReading: 0 },
    role: ""
  };

  const [user, setUser] = useState(defaultUser);
  const [isEditing, setIsEditing] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const router = useRouter();
  const { setToast } = useToastState();
useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await getCurrentUser();
      if (!res.success) {
        console.log("Failed to fetch user data:", res.message);
        setToast({
          title: "Error",
          message: res.message || "You need to login to your account.",
          variant: "error",
        });
        router.push("/login");
      } else {
        const data = res.user;
        setUser({
          name: data.fullName || data.userName || "null",
          email: data.email || "null",
          avatar: data.avatar || "./avataaars.svg",
          joinDate: data.createdAt
            ? new Date(data.createdAt).toLocaleDateString("vi-VN", {
                month: "long",
                year: "numeric"
              })
            : "null",
          readingStats: {
            totalRead: data.totalRead || 0,
            favorites: data.favorites || 0,
            currentlyReading: data.currentlyReading || 0
          },
          role: data.role || "Null"
        });
      } 
    } catch (error) {
      console.error("Lỗi khi lấy thông tin user:", error);
      setToast({
        title: "Error",
        message: "Có lỗi khi lấy thông tin user.",
        variant: "error",
      });
      router.push("/login");
    }
  };
  fetchUser();
}, []);

  const handleUpdateUser = async () => {
    try {
      const res = await updateUser({ fullName: user.name.trim() });
      if (res.success) {
        setIsEditing(false);
        setUser((prev) => ({ ...prev, name: res.user.fullName }));
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật user:", error);
    }
  };

  const handleChangePassword = async () => {
    try {
      if (!oldPassword || !newPassword) {
        setToast({
          title: "Error",
          message: "Please fill in both password fields.",
          variant: "error",
        });
        return;
      }
      const res = await changePassword({ oldPassword, newPassword });
      if (res.success) {
        setToast({
          title: "Success",
          message: "Password changed successfully!",
          variant: "success",
        });
        setOldPassword("");
        setNewPassword("");
      }
    } catch (error) {
      console.error("Lỗi khi đổi mật khẩu:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      {/* Back button */}
      <button
        onClick={() => router.push("/")}
        className="flex items-center gap-2 mb-6 border border-blue-200 px-4 py-2 rounded-xl bg-white shadow-sm hover:shadow-md transition"
      >
        <ChevronLeft /> Back to Menu
      </button>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row gap-8">
          {/* Avatar */}
          <div className="relative group">
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-32 h-32 rounded-full border-4 border-blue-200 shadow-md object-cover"
            />
            <button
              title="Edit avatar"
              className="absolute bottom-0 right-0 p-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition"
            >
              <Camera size={16} />
            </button>
          </div>

          {/* Info */}
          <div className="flex-1 space-y-3">
            {isEditing ? (
              <input
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="text-3xl font-bold text-gray-800 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                placeholder="Enter your name"
                title="Name"
              />
            ) : (
              <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
            )}
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500">
              Created account on {user.joinDate}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() =>
                  isEditing ? handleUpdateUser() : setIsEditing(true)
                }
                className="px-5 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition"
              >
                {isEditing ? "Save changes" : "Edit Profile"}
              </button>
              <button
                onClick={handleChangePassword}
                className="px-5 py-2 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
              >
                Change password
              </button>
              <button
                onClick={() => router.push("/book")}
                className="px-5 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
              >
                Upload
              </button>
            </div>

            {/* Password Fields */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <input
                type="password"
                placeholder="Old password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-lg"
              />
              <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Extra Info */}
        <div className="bg-white rounded-2xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <div className="p-3 bg-gray-50 rounded-xl">{user.role}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="p-3 bg-gray-50 rounded-xl">{user.email}</div>
          </div>
        </div>

        {/* Reading Stats */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Reading Statistics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                title: "Total chapters",
                value: user.readingStats.totalRead,
                color: "blue"
              },
              {
                title: "Favourite",
                value: user.readingStats.favorites,
                color: "green"
              },
              {
                title: "Reading",
                value: user.readingStats.currentlyReading,
                color: "yellow"
              }
            ].map((stat, i) => (
              <div
                key={i}
                className={`bg-${stat.color}-50 p-6 rounded-xl shadow text-center`}
              >
                <h3
                  className={`text-xl font-semibold text-${stat.color}-600 mb-2`}
                >
                  {stat.title}
                </h3>
                <p className="text-3xl font-bold text-gray-800">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileMain;
