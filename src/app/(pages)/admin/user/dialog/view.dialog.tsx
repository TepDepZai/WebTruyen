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
    isActive?: boolean;
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


  const user = userData.find((u) => u._id === userId);

  const formatDateTime = (value?: string) => {
    if (!value) {
      return "—";
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return "—";
    }

    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  };

  return (
    <DialogAdmin
      sizeX="xl"
      sizeY="lg"
      title="View User"
      description="Chi tiết thông tin người dùng"
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
                  className="h-24 w-24 rounded-full border-2 border-[#F5C452]/40 shadow-lg"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#F5C452]/30 bg-gradient-to-br from-[#F5C452]/20 to-[#FFD700]/10 text-2xl font-bold text-[#F5C452]">
                  {user.fullName?.charAt(0) || "?"}
                </div>
              )}
              <div className="text-center">
                <h2 className="text-xl font-semibold text-white">
                  {user.fullName || "—"}
                </h2>
                <p className="text-sm text-gray-400">{user.email || "—"}</p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                    user.role === "SuperAdmin"
                      ? "border-purple-500/30 bg-purple-500/20 text-purple-400"
                      : user.role === "Admin"
                      ? "border-red-500/30 bg-red-500/20 text-red-400"
                      : user.role === "Moderator"
                      ? "border-emerald-500/30 bg-emerald-500/20 text-emerald-400"
                      : user.role === "Author"
                      ? "border-blue-500/30 bg-blue-500/20 text-blue-400"
                      : "border-gray-500/30 bg-gray-500/20 text-gray-300"
                  }`}
                >
                  {user.role || "—"}
                </span>
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                    user.isActive
                      ? "border-green-500/30 bg-green-500/20 text-green-400"
                      : "border-yellow-500/30 bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {user.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            <div className="grid gap-4 text-sm md:grid-cols-2">
              <Field label="UserID: " value={user._id} />
              <Field label="User Name: " value={user.userName || "—"} />
              <Field label="Created At: " value={formatDateTime(user.createdAt)} />
              <Field label="Updated At: " value={formatDateTime(user.updatedAt)} />
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">User not found</div>
        )
      }
    />
  );
};

const Field = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex justify-between items-center border-b border-[#F5C452]/20 pb-3">
    <span className="font-medium text-[#F5C452]/70">{label}</span>
    <span className="text-gray-200 text-right">{value}</span>
  </div>
);

export default ViewUserDialog;
