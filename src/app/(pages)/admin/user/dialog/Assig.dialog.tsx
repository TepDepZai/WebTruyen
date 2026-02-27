"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DialogAdmin from "../../components/dialogAdmin";
import { Button } from "@/components/ui/button";


interface AssginUserDialogProps {
    userData: {
        _id: string;
        email: string;
        userName: string;
        fullName?: string;
        role?: string;
        avatar?: string;
    }[];
    onAssign?: (userId: string, role: string) => Promise<void>;
}

const ROLES = [
    {
        id: "User",
        name: "User",
        description: "Người dùng bình thường",
        color: "gray",
        icon: "👤",
    },
    {
        id: "Moderator",
        name: "Moderator",
        description: "Kiểm duyệt nội dung và báo cáo",
        color: "emerald",
        icon: "🛡️",
    },
    {
        id: "Author",
        name: "Author",
        description: "Tác giả có thể tạo nội dung",
        color: "blue",
        icon: "✍️",
    },
    {
        id: "Admin",
        name: "Admin",
        description: "Quản trị viên hệ thống",
        color: "red",
        icon: "⚙️",
    },
];

const getRoleColors = (role: string) => {
    if (role === "Admin")
        return {
            bg: "bg-red-500/20",
            border: "border-red-500/30",
            text: "text-red-400",
        };
    if (role === "Moderator")
        return {
            bg: "bg-emerald-500/20",
            border: "border-emerald-500/30",
            text: "text-emerald-400",
        };
    if (role === "Author")
        return {
            bg: "bg-blue-500/20",
            border: "border-blue-500/30",
            text: "text-blue-400",
        };
    return {
        bg: "bg-gray-500/20",
        border: "border-gray-500/30",
        text: "text-gray-300",
    };
};

const AssginUserDialog = ({ userData, onAssign }: AssginUserDialogProps) => {
    const searchParam = useSearchParams();
    const router = useRouter();
    const userId = searchParam.get("id");
    const mode = searchParam.get("mode");
    const open = mode === "Assign";
    const [selectedRole, setSelectedRole] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const closeModal = () => {
        const params = new URLSearchParams(searchParam.toString());
        params.delete("mode");
        params.delete("id");
        router.push(`/admin/user?${params.toString()}`, { scroll: false });
    };

    const user = userData.find((u) => u._id === userId);

    const handleAssign = async () => {
        if (!selectedRole || !userId) return;

        setIsLoading(true);
        try {
            if (onAssign) {
                await onAssign(userId, selectedRole);
            }
            closeModal();
        } catch (error) {
            console.error("Error assigning role:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <DialogAdmin
            sizeX="lg"
            sizeY="lg"
            title="Assign Role"
            description="Chọn vai trò cho người dùng"
            open={open}
            onClose={closeModal}
            showFooter={false}
            content={
                user ? (
                    <div className="space-y-6">
                        <div className="flex flex-col items-center gap-3 rounded-2xl border border-[#F5C452]/20 bg-gradient-to-br from-[#1a1a1a]/70 to-[#0f0f0f]/70 p-5">
                            {user.avatar ? (
                                <img
                                    src={user.avatar}
                                    alt="Avatar"
                                    className="h-20 w-20 rounded-full border-2 border-[#F5C452]/40 shadow-lg"
                                />
                            ) : (
                                <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#F5C452]/30 bg-gradient-to-br from-[#F5C452]/20 to-[#FFD700]/10 text-xl font-bold text-[#F5C452]">
                                    {user.fullName?.charAt(0) || "?"}
                                </div>
                            )}
                            <div className="text-center">
                                <h2 className="text-lg font-semibold text-white">
                                    {user.fullName || user.userName}
                                </h2>
                                <p className="text-sm text-gray-400">{user.email}</p>
                            </div>

                            <span
                                className={`rounded-full border px-3 py-1 text-xs font-semibold inline-block mt-1 ${getRoleColors(
                                    user.role || "User"
                                ).bg} ${getRoleColors(user.role || "User").border} ${getRoleColors(user.role || "User").text
                                    }`}
                            >
                                {user.role || "User"}
                            </span>
                        </div>
                        <div>
                            <p className="mb-3 text-sm font-medium text-[#F5C452]/70">
                                Chọn vai trò mới:
                            </p>
                            <div className="grid gap-3 md:grid-cols-1">
                                {ROLES.map((role) => (
                                    <div
                                        key={role.id}
                                        className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${selectedRole === role.id
                                                ? "border-[#F5C452] bg-[#F5C452]/10"
                                                : "border-[#F5C452]/20 bg-[#1a1a1a]/40 hover:border-[#F5C452]/40 hover:bg-[#1a1a1a]/60"
                                            }`}
                                        onClick={() => setSelectedRole(role.id)}
                                    >
                                        <div className="flex items-start gap-3">
                                            <input
                                                type="radio"
                                                name="role"
                                                value={role.id}
                                                checked={selectedRole === role.id}
                                                onChange={() => setSelectedRole(role.id)}
                                                className="mt-1"
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg">{role.icon}</span>
                                                    <h3 className="font-semibold text-white">
                                                        {role.name}
                                                    </h3>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-400">
                                                    {role.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={closeModal}
                                disabled={isLoading}
                            >
                                Hủy
                            </Button>
                            <Button
                                className="flex-1 bg-[#F5C452] text-black hover:bg-[#FFD700]"
                                onClick={handleAssign}
                                disabled={!selectedRole || isLoading}
                            >
                                {isLoading ? "Đang xử lý..." : "Gán vai trò"}
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-gray-500">User not found</div>
                )
            }
        />
    );
};

export default AssginUserDialog;
