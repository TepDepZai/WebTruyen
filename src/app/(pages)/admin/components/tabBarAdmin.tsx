"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const TabBarAdmin = () => {
    const router = useRouter();
    return (
        <div className="flex space-x-4 p-4 border-b">
           <Button  variant="outline" className="bg-gradient-to-l from-[#a1b4f8] to-[#a1f8] hover:from-[#a1f8] hover:to-[#a1b4f8] hover:shadow-[0_0_10px_rgba(0,0,0,0.8)] " onClick={() => router.push("/admin/listBook")}>Books</Button>
           <Button variant="outline" className="bg-gradient-to-l from-[#a1b4f8] to-[#a1f8] hover:from-[#a1f8] hover:to-[#a1b4f8] hover:shadow-[0_0_10px_rgba(0,0,0,0.8)]" onClick={() => router.push("/admin/user")}>Users</Button>
        </div>
    );
}
 
export default TabBarAdmin;