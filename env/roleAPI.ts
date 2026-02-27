import api from "@/middleware/api";
import { CreateRoleRequest, UpdateRoleRequest, RoleResponse } from "./type/typeRole";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:2004";

// Lấy tất cả roles (public)
export const getAllRoles = async (): Promise<RoleResponse> => {
  try {
    const response = await api.get(`${API_BASE}/api/v1/role/getAllRoles`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { success: false, message: "Network error" };
  }
};

// Lấy role theo ID (public)
export const getRoleById = async (roleId: string): Promise<RoleResponse> => {
  try {
    const response = await api.get(`${API_BASE}/api/v1/role/getRole/${roleId}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { success: false, message: "Network error" };
  }
};

// Lấy role theo tên (public)
export const getRoleByName = async (name: string): Promise<RoleResponse> => {
  try {
    const response = await api.get(`${API_BASE}/api/v1/role/getRoleByName/${name}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { success: false, message: "Network error" };
  }
};

// Lấy thống kê role (Admin/SuperAdmin only)
export const getRoleStats = async (): Promise<RoleResponse> => {
  try {
    const response = await api.get(`${API_BASE}/api/v1/role/getRoleStats`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { success: false, message: "Network error" };
  }
};

// Tạo role mới (SuperAdmin only)
export const createRole = async (roleData: CreateRoleRequest): Promise<RoleResponse> => {
  try {
    const response = await api.post(`${API_BASE}/api/v1/role/createRole`, roleData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { success: false, message: "Network error" };
  }
};

// Cập nhật role (SuperAdmin only)
export const updateRole = async (roleId: string, roleData: UpdateRoleRequest): Promise<RoleResponse> => {
  try {
    const response = await api.put(`${API_BASE}/api/v1/role/updateRole/${roleId}`, roleData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { success: false, message: "Network error" };
  }
};

// Xóa role (SuperAdmin only)
export const deleteRole = async (roleId: string): Promise<RoleResponse> => {
  try {
    const response = await api.delete(`${API_BASE}/api/v1/role/deleteRole/${roleId}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { success: false, message: "Network error" };
  }
};
