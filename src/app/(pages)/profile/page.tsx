"use client";
import { useState } from "react";

const ProfileMain = () => {
    const [user, setUser] = useState({
        name: "Nguyễn Văn A",
        email: "nguyenvana@example.com",
        avatar: "https://via.placeholder.com/150",
        joinDate: "Tháng 1, 2024",
        readingStats: {
            totalRead: 127,
            favorites: 45,
            currentlyReading: 8
        }
    });

    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header Profile */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        {/* Avatar */}
                        <div className="relative">
                            <img
                                src={user.avatar}
                                alt="Profile Avatar"
                                className="w-32 h-32 rounded-full border-4 border-blue-200 shadow-lg object-cover"
                            />
                            <button className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </button>
                        </div>

                        {/* User Info */}
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">{user.name}</h1>
                            <p className="text-gray-600 mb-2">{user.email}</p>
                            <p className="text-sm text-gray-500 mb-4">Tham gia từ {user.joinDate}</p>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl transition-colors"
                                >
                                    {isEditing ? "Lưu thay đổi" : "Chỉnh sửa hồ sơ"}
                                </button>
                                <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-xl transition-colors">
                                    Đổi mật khẩu
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reading Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">{user.readingStats.totalRead}</div>
                        <div className="text-gray-600">Truyện đã đọc</div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">{user.readingStats.favorites}</div>
                        <div className="text-gray-600">Yêu thích</div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                        <div className="text-3xl font-bold text-orange-600 mb-2">{user.readingStats.currentlyReading}</div>
                        <div className="text-gray-600">Đang đọc</div>
                    </div>
                </div>

                {/* Profile Details */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Thông tin cá nhân</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={user.name}
                                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            ) : (
                                <div className="p-3 bg-gray-50 rounded-xl text-gray-800">{user.name}</div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            {isEditing ? (
                                <input
                                    type="email"
                                    value={user.email}
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            ) : (
                                <div className="p-3 bg-gray-50 rounded-xl text-gray-800">{user.email}</div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                            {isEditing ? (
                                <input
                                    type="tel"
                                    placeholder="Nhập số điện thoại"
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            ) : (
                                <div className="p-3 bg-gray-50 rounded-xl text-gray-500">Chưa cập nhật</div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Ngày sinh</label>
                            {isEditing ? (
                                <input
                                    type="date"
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            ) : (
                                <div className="p-3 bg-gray-50 rounded-xl text-gray-500">Chưa cập nhật</div>
                            )}
                        </div>
                    </div>

                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Giới thiệu bản thân</label>
                        {isEditing ? (
                            <textarea
                                rows={4}
                                placeholder="Viết vài dòng về bản thân bạn..."
                                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            />
                        ) : (
                            <div className="p-3 bg-gray-50 rounded-xl text-gray-500 min-h-[100px]">
                                Chưa có mô tả...
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileMain;