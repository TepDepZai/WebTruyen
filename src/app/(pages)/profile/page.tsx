"use client";

import { getCurrentUser, updateUser as updateUserService, changePassword as changePasswordService } from "@/services/authService";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProfileMain = () => {
    const defaultUser = {
        name: "",
        email: "",
        avatar: "./avataaars.svg",
        joinDate: "",
        readingStats: {
            totalRead: 0,
            favorites: 0,
            currentlyReading: 0
        }
    };
    const [user, setUser] = useState(defaultUser);
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await getCurrentUser();
                if (res.success) {
                    const data = res.user;
                    setUser({
                        name: data.fullName || data.userName || "Chưa có tên",
                        email: data.email || "",
                        avatar: data.avatar || "./avataaars.svg",
                        joinDate: data.createdAt ? new Date(data.createdAt).toLocaleDateString("vi-VN", {
                            month: 'long',
                            year: 'numeric'
                        }) : "Chưa rõ",
                        readingStats: {
                            totalRead: data.totalRead || 0,
                            favorites: data.favorites || 0,
                            currentlyReading: data.currentlyReading || 0
                        }
                    });
                } else {
                    console.error("Failed to fetch user data");
                }
            } catch (error: any) {
                console.error("Lỗi khi lấy thông tin user:", error);
            }
        };
        checkAuth();
    }, []);
    const updateUser = async () => {
        try {
            const res = await updateUserService({ fullName: user.name.trim() });
            if (res.success) {
                setIsEditing(false);
                setUser((prev) => ({
                    ...prev,
                    name: res.user.fullName,
                }));
            } else {
                console.error("Failed to update user data");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật thông tin user:", error);
        }
    };
    const changePassword = async () => {
        try {
            const res = await changePasswordService({ oldPassword, newPassword });
            if (res.success) {
                alert("Password changed successfully!");
            } else {
                console.error("Failed to change password:", res.message);
            }
        } catch (error) {
            console.error("Lỗi khi đổi mật khẩu:", error);
        }
    }
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
            <button
                className="flex fixed border-2 p-3 rounded-2xl bg-blue-100 shadow-[0_0_8px_rgba(0,0,0,0.25)] transition-shadow duration-300 hover:shadow-[0_0_12px_rgba(239,68,68,0.7)] hover:border-amber-200"
                onClick={() => router.push('/')}
            >
                <ChevronLeft /> Back to Menu
            </button>
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="relative">
                            <img
                                src={user.avatar}
                                alt="Profile Avatar"
                                className="w-32 h-32 rounded-full border-4 border-blue-200 shadow-lg object-cover"
                            />
                            <button
                                className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-colors"
                                title="Edit avatar"
                                aria-label="Edit avatar"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">{user.name}</h1>
                            <p className="text-gray-600 mb-2">{user.email}</p>
                            <p className="text-sm text-gray-500 mb-4">Created account on {user.joinDate}</p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={() => {
                                        if (isEditing) {
                                            updateUser();
                                        } else {
                                            setIsEditing(true);
                                        }
                                    }}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl transition-colors"
                                >
                                    {isEditing ? "Save changes" : "Edit Profile"}
                                </button>
                                <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-xl transition-colors"
                                    onClick={() => changePassword()}
                                >
                                    Change password
                                </button>
                                <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl transition-colors">
                                    Upload
                                </button>
                            </div>
                            <div className=" block p-3">
                                <label className="p-2">Old Password: <input onChange={(e) => setOldPassword(e.target.value)} className="border-b" type="password" /></label>
                                <label className="p-2">New Password: <input onChange={(e) => setNewPassword(e.target.value)} className="border-b" type="password" /></label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">User Name</label>
                            {isEditing ? (
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <input
                                        type="text"
                                        value={user.name}
                                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="User Name"
                                    />
                                </label>
                            ) : (
                                <div className="p-3 bg-gray-50 rounded-xl text-gray-800">{user.name}</div>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <div className="p-3 bg-gray-50 rounded-xl text-gray-800">{user.email}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-6">Reading Statistics</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="bg-blue-50 p-6 rounded-xl shadow-lg text-center">
                            <h3 className="text-xl font-semibold text-blue-600 mb-2">Total chapters</h3>
                            <p className="text-3xl font-bold text-gray-800">{user.readingStats.totalRead}</p>
                        </div>
                        <div className="bg-green-50 p-6 rounded-xl shadow-lg text-center">
                            <h3 className="text-xl font-semibold text-green-600 mb-2">Favourite</h3>
                            <p className="text-3xl font-bold text-gray-800">{user.readingStats.favorites}</p>
                        </div>
                        <div className="bg-yellow-50 p-6 rounded-xl shadow-lg text-center">
                            <h3 className="text-xl font-semibold text-yellow-600 mb-2">Reading</h3>
                            <p className="text-3xl font-bold text-gray-800">{user.readingStats.currentlyReading}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileMain;