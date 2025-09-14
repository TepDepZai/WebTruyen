"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const SideBarAdmin = () => {
    const router = useRouter();
    return ( <div>
                <div className="flex items-start gap-4">
                <Button onClick={() => router.push('/admin/user')} variant="outline" className="mb-4 hover:bg-blue-300 hover:text-white">Admin Dashboard</Button>
                <Button onClick={() => router.push('/admin/roles')} variant="outline" className="mb-4 hover:bg-blue-300 hover:text-white">Role Management</Button>
            </div>
    </div> );
}
 
export default SideBarAdmin;