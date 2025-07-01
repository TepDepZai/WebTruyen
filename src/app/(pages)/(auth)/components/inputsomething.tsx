'use client';
import { Eye, EyeOff } from "lucide-react";
import { ChangeEvent, useState } from "react";
interface InputSomeThingProps {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const InputSomeThing = ({ onChange }: InputSomeThingProps) => {

    return (
        <div className="relative">
            <input
                type={"password"}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Enter password"
                onChange={onChange}
            />

        </div>
    );
}

export default InputSomeThing;