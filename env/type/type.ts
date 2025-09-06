// Thông tin đăng nhập
export interface LoginCredentials {
  identifier: string;
  password: string;
}

// Dữ liệu khi đăng ký
export interface RegisterData {
  email: string;
  password: string;
  userName: string;
  fullName?: string;
  avatar?: string; // URL hoặc base64 của ảnh đại diện, nếu có
  role?: string; // Vai trò của người dùng, nếu cần
}

// Thông tin người dùng trả về sau khi đăng nhập
export interface User {
  id: string;
  email: string;
  userName: string;
  fullName?: string;
  role?: string;
  avatar?: string;
  updatedAt?: string;
}
// Thông tin sách
export interface Book {
  title: string;
  img: string;
  tags: string;
  content: string;
  author: string;
}

// Thông tin sách theo ID
export interface BookForId {
  id: string;
  title: string;
  img: string;
  tags: string;
  content: string;
  createdByName: string;
  author: string;
}

// Phản hồi từ API đăng nhập
export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  refreshToken?: string;
  user: User;
}

// Phản hồi từ API đăng ký (nếu khác login)
export interface RegisterResponse {
  message: string;
  user: User;
}
export interface BookMainPage {
  id: string;
  title: string;
  img: string;
  Chapter: ChapterNumber[];
}
export interface PaginationResponse<T> {
  has_next: boolean;
  has_prev: boolean;
  page: number;
  size: number;
  total_pages: number;
}
export interface ChapterNumber {
  _id: string;
  ChapterNumber: number;
  createdAt: string;
}
export interface BookDetail {
  id: string;
  title: string;
  img: string;
  tags: string;
  content: string;
  updatedAt: string;
  createdAt: string;
  Chapter: ChapterDetail2[];
  status: string;
  createdByName: string;
  author: string;
}
export interface ChapterDetail {
  _id: string;
  chapterName: string;
  chapterNumber: number;
  createdAt: string;
  chapterContent?: string;
  bookName?: string;
}
export interface ChapterDetail2 {
  _id: string;
  ChapterName: string;
  ChapterNumber: number;
  createdAt: string;
  ChapterContent?: string;
  BookName?: string;
}