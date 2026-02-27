"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "./hook/useDebounce";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export interface AppSearchProps {
    onSearch?: (query: string) => void;
    placeholder?: string;
    className?: string;
}

export const AppSearch = (
    { placeholder = "Tìm kiếm...", className }: AppSearchProps
) => {
    const [searchString, setSearchString] = useState("");
    const searchParam = useSearchParams();
    const router = useRouter();
    const debouncedValue = useDebounce(searchString, 300);

    useEffect(() => {
        const params = new URLSearchParams(searchParam.toString());
        if (debouncedValue) {
            params.set("search", debouncedValue as string);
        } else {
            params.delete("search");
        }
        router.push(`?${params.toString()}`);
    }, [debouncedValue]);

    const handleSearch = (query: string) => {
        setSearchString(query);
    };
    return (
        <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#F5C452]/60" />
            <Input
                type="text"
                className={`pl-10 min-w-[15rem] bg-[#1B1B23] border-[#F5C452]/30 text-white placeholder:text-gray-500 hover:border-[#F5C452]/50 focus:border-[#F5C452]/70 focus:ring-[#F5C452]/20 transition ${className}`}
                placeholder={placeholder}
                value={searchString}
                onChange={(e) => handleSearch(e.target.value)}
            />
        </div>
    )
}