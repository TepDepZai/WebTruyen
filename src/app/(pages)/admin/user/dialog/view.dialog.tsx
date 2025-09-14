import { useRouter, useSearchParams } from "next/navigation";
import DialogAdmin from "../../components/dialogAdmin";



interface ViewUserDialogProps {
    userData: {
        _id: string;
        email: string;
        userName: string;
        fullName?: string;
        role?: string;
        avatar?: string;
        updatedAt?: string;
        state?: boolean;
        createdAt?: string;
    }[];

}

const ViewUserDialog = ({ userData }: ViewUserDialogProps) => {
    const searchParam = useSearchParams();
    const router = useRouter();
    const userId = searchParam.get("id");
    const mode = searchParam.get("mode");
    const open = mode === "view";

    const closeModal = () => {
        const params = new URLSearchParams(searchParam.toString());
        params.delete("mode");
        params.delete("id");
        router.push(`/admin/user?${params.toString()}`, { scroll: false });
    };
      const timeAgo = (date: string) => {
    const now = new Date();
    const past = new Date(date);
    const diff = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (diff < 60) return `${diff} second ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;
    if (diff < 2592000) return `${Math.floor(diff / 604800)} weeks ago`;
    if (diff < 31536000) return `${Math.floor(diff / 2592000)} months ago`;
    return `${Math.floor(diff / 31536000)} years ago`;
  };

    const user = userData.find(u => u._id === userId);

    const userFields = user
        ? [
            { label: "User ID", value: user._id },
            { label: "User Name", value: user.fullName },
            { label: "User Email", value: user.email },
            { label: "User Role", value: user.role },
            { label: "User State", value: user.state ? "Deactivated" : "Activated" },
            { label: "Created At", value: timeAgo(user.createdAt ?? "") },
            { label: "Updated At", value: timeAgo(user.updatedAt ?? "") },
        ]
        : [];
    return (
        <DialogAdmin
            title="View User"
            description="Chi tiết thông tin người dùng"
            open={open}
            onClose={closeModal}
            showFooter={false}
            content={
                <div className="grid gap-3 text-sm">
                    {userFields.map((field) => (
                        <div key={field.label} className="flex justify-between border-b pb-1">
                            <span className="font-medium text-gray-700">{field.label}</span>
                            <span className="text-gray-900">{field.value}</span>
                        </div>
                    ))}
                </div>
            }
        />
    );
};

export default ViewUserDialog;
