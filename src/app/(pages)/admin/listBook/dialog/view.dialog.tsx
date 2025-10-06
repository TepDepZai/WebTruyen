import { useRouter, useSearchParams } from "next/navigation";
import DialogAdmin from "../../components/dialogAdmin";

interface ViewUserDialogProps {
  userData: {
    id: string;
    img: string;
    title: string;
    author: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    createdByName?: string;
    tags?: string[];
  }[];
}

const ViewBookDialog = ({ userData }: ViewUserDialogProps) => {
  const searchParam = useSearchParams();
  const router = useRouter();
  const userId = searchParam.get("id");
  const mode = searchParam.get("mode");
  const open = mode === "view";

  const closeModal = () => {
    const params = new URLSearchParams(searchParam.toString());
    params.delete("mode");
    params.delete("id");
    router.push(`/admin/listBook?${params.toString()}`, { scroll: false });
  };

  const timeAgo = (date?: string) => {
    if (!date) return "—";
    const now = new Date();
    const past = new Date(date);
    const diff = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (diff < 5) return "just now";
    if (diff < 60) return `${diff} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;
    if (diff < 2592000) return `${Math.floor(diff / 604800)} weeks ago`;
    if (diff < 31536000) return `${Math.floor(diff / 2592000)} months ago`;
    return `${Math.floor(diff / 31536000)} years ago`;
  };

  const user = userData.find((u) => u.id === userId);

  return (
    <DialogAdmin
      sizeX="xl"
      sizeY="xl"
      title="View Book"
      description=" Detailed information about the book."
      open={open}
      onClose={closeModal}
      showFooter={false}
      content={
        user ? (
          <div className="space-y-6">
            <div className="flex flex-col items-center space-y-2">
              {user.img ? (
                <img
                  src={user.img}
                  alt="Avatar"
                  className="w-24 h-24 rounded-full border shadow-md"
                />
              ) : (
                <div className="w-24 h-24 rounded-full flex items-center justify-center bg-gray-200 text-gray-500 text-xl font-bold">
                  {user.title?.charAt(0) || "?"}
                </div>
              )}
              <div className="text-center">
                <h2 className="text-lg font-semibold text-gray-900">
                  {user.title || "—"}
                </h2>
              </div>
            </div>

            <div className="grid gap-3 text-sm">
              <Field label="User ID" value={user.id} />
              <Field label="Book Title" value={user.title} />
              <Field label="Book Author" value={user.author} />
              <Field label="status" value={user.status} />
              <Field label="tags" value={user.tags?.join(", ") || "—"} />
              <Field label="Created By" value={user.createdByName || "—"} />
              <Field label="Created At" value={timeAgo(user.createdAt)} />
              <Field label="Updated At" value={timeAgo(user.updatedAt)} />
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
  <div className="flex justify-between items-center border-b pb-2">
    <span className="font-medium text-gray-600">{label}</span>
    <span className="text-gray-900 text-right">{value}</span>
  </div>
);

export default ViewBookDialog;
