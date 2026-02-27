"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { BookOpen, Users } from "lucide-react";

const TabBarAdmin = () => {
    const router = useRouter();
    return (
        <div className="flex space-x-4 p-4 border-b border-[#F5C452]/30 bg-[#14141A]/50 rounded-lg backdrop-blur-sm">
           <Button 
             variant="outline" 
             className="bg-gradient-to-r from-[#F5C452]/90 to-[#FFD700]/80 hover:from-[#F5C452] hover:to-[#FFD700] text-black font-semibold shadow-lg hover:shadow-[0_0_15px_rgba(245,196,82,0.4)] transition-all duration-200 flex items-center gap-2" 
             onClick={() => router.push("/admin/listBook")}
           >
             <BookOpen size={18} />
             Books
           </Button>
           <Button 
             variant="outline" 
             className="bg-gradient-to-r from-[#F5C452]/90 to-[#FFD700]/80 hover:from-[#F5C452] hover:to-[#FFD700] text-black font-semibold shadow-lg hover:shadow-[0_0_15px_rgba(245,196,82,0.4)] transition-all duration-200 flex items-center gap-2" 
             onClick={() => router.push("/admin/user")}
           >
             <Users size={18} />
             Users
           </Button>
        </div>
    );
}
 
export default TabBarAdmin;