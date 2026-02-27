// Kiểm tra quyền hạn người dùng
import { User } from "@/contexts/authProvider";

export const canRead = (user: User | null) => {
  // Guest, User, Author, Admin, Moderator đều có thể đọc
  return true;
};

export const canComment = (user: User | null) => {
  // Chỉ User đã đăng nhập có thể bình luận
  if (!user) return false;
  return ["User", "Author", "Moderator", "Admin", "SuperAdmin"].includes(user.role);
};

export const canFollow = (user: User | null) => {
  // Chỉ User đã đăng nhập có thể theo dõi
  if (!user) return false;
  return ["User", "Author", "Moderator", "Admin", "SuperAdmin"].includes(user.role);
};

export const canFavorite = (user: User | null) => {
  // Chỉ User đã đăng nhập có thể yêu thích
  if (!user) return false;
  return ["User", "Author", "Moderator", "Admin", "SuperAdmin"].includes(user.role);
};

export const canCreateBook = (user: User | null) => {
  // Chỉ Author và Admin có thể tạo truyện
  if (!user) return false;
  return ["Author", "Admin", "SuperAdmin"].includes(user.role);
};

export const canEditBook = (user: User | null, authorId?: string) => {
  // Chỉ Author (chủ sở hữu) và Admin có thể chỉnh sửa
  if (!user) return false;
  if (user.role === "Admin" || user.role === "SuperAdmin") return true;
  if (user.role === "Author" && user.id === authorId) return true;
  return false;
};

export const canDeleteBook = (user: User | null, authorId?: string) => {
  // Chỉ Author (chủ sở hữu) và Admin có thể xóa
  return canEditBook(user, authorId);
};

export const canModerate = (user: User | null) => {
  // Chỉ Moderator và Admin có thể kiểm duyệt
  if (!user) return false;
  return ["Moderator", "Admin", "SuperAdmin"].includes(user.role);
};
