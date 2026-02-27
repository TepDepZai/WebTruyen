export interface Role {
  _id: string;
  name: "Guest" | "User" | "Author" | "Moderator" | "Admin" | "SuperAdmin";
  description: string;
  permissions: Permission[];
  priority: number;
  isActive: boolean;
  totalUsers: number;
  createdAt?: string;
  updatedAt?: string;
}

export type Permission =
  | "read"
  | "comment"
  | "follow"
  | "favorite"
  | "create_book"
  | "edit_own_book"
  | "edit_any_book"
  | "delete_own_book"
  | "delete_any_book"
  | "moderate"
  | "manage_users"
  | "manage_roles"
  | "system_config";

export interface RoleStats {
  name: string;
  totalUsers: number;
  _id: string;
}

export interface CreateRoleRequest {
  name: string;
  description: string;
  permissions?: Permission[];
  priority?: number;
}

export interface UpdateRoleRequest {
  description?: string;
  permissions?: Permission[];
  priority?: number;
  isActive?: boolean;
}

export interface RoleResponse {
  success: boolean;
  role?: Role;
  roles?: Role[];
  stats?: RoleStats[];
  message?: string;
}
