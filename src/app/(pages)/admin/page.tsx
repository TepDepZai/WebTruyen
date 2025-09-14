"use client";
import { useRouter } from "next/navigation";

const AdminPage = () => {
    const router = useRouter();
    return (
        router.push('/admin/user')
    );
}
 
export default AdminPage;