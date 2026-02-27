import api from "@/middleware/api";

// Lấy tất cả roles
export const getAllRoles = async () => {
  try {
    const response = await api.get("/api/v1/role/getAllRoles");
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { success: false, message: "Network error" };
  }
};

// Lấy role theo ID
export const getRoleById = async (roleId: string) => {
  try {
    const response = await api.get(`/api/v1/role/getRole/${roleId}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { success: false, message: "Network error" };
  }
};

// Lấy role theo tên
export const getRoleByName = async (name: string) => {
  try {
    const response = await api.get(`/api/v1/role/getRoleByName/${name}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { success: false, message: "Network error" };
  }
};

// Lấy thống kê role (Admin/SuperAdmin only)
export const getRoleStats = async () => {
  try {
    const response = await api.get("/api/v1/role/getRoleStats");
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { success: false, message: "Network error" };
  }
};

// Tạo role mới (SuperAdmin only)
export const createRole = async (roleData: {
  name: string;
  description: string;
  permissions?: string[];
  priority?: number;
}) => {
  try {
    const response = await api.post("/api/v1/role/createRole", roleData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { success: false, message: "Network error" };
  }
};

// Cập nhật role (SuperAdmin only)
export const updateRole = async (roleId: string, roleData: {
  description?: string;
  permissions?: string[];
  priority?: number;
  isActive?: boolean;
}) => {
  try {
    const response = await api.put(`/api/v1/role/updateRole/${roleId}`, roleData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { success: false, message: "Network error" };
  }
};

// Xóa role (SuperAdmin only)
export const deleteRole = async (roleId: string) => {
  try {
    const response = await api.delete(`/api/v1/role/deleteRole/${roleId}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { success: false, message: "Network error" };
  }
};
