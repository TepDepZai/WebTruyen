import { useAuth } from "@/contexts/authProvider";

export const useAdmin = () => {
  const { user, loading } = useAuth();
  const isAdmin = user?.role === "Admin";
  return { isAdmin, user, loading };
};