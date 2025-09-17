"use client";

import { updateUser, changePassword } from "@/services/profileService";
import { ChevronLeft, Camera } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useToastState from "../_components/hook/useToast";
import { useAuth } from "@/contexts/authProvider";
import { useEffect } from "react";
const ProfileMain = () => {
  const router = useRouter();
  const { setToast } = useToastState();
  const { user, setUser,loading } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return <div className="p-6 text-gray-500">Loading...</div>;
  }

  if (!user) {
    return null; 
  }

  const handleUpdateUser = async () => {
    try {
      const res = await updateUser({ fullName: user.fullName.trim() });
      if (res.success) {
        setIsEditing(false);
        setUser((prev) =>
          prev ? { ...prev, fullName: res.user.fullName } : prev
        );
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

  // Map màu thủ công (tránh Tailwind không build class)
  const statStyles: Record<string, { bg: string; text: string }> = {
    blue: { bg: "bg-blue-50", text: "text-blue-600" },
    green: { bg: "bg-green-50", text: "text-green-600" },
    yellow: { bg: "bg-yellow-50", text: "text-yellow-600" },
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
              src={user.avatar || "./avataaars.svg"}
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
                value={user.fullName}
                onChange={(e) =>
                  setUser((prev) =>
                    prev ? { ...prev, fullName: e.target.value } : prev
                  )
                }
                placeholder="Enter your name"
                title="Name"
                className="p-2 border border-gray-300 rounded-lg w-full max-w-sm"
              />
            ) : (
              <h1 className="text-3xl font-bold text-gray-800">
                {user.fullName}
              </h1>
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
                value: user.readingStats?.totalRead || 0,
                color: "blue",
              },
              {
                title: "Favourite",
                value: user.readingStats?.favorites || 0,
                color: "green",
              },
              {
                title: "Reading",
                value: user.readingStats?.currentlyReading || 0,
                color: "yellow",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className={`${statStyles[stat.color].bg} p-6 rounded-xl shadow text-center`}
              >
                <h3
                  className={`text-xl font-semibold ${statStyles[stat.color].text} mb-2`}
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
