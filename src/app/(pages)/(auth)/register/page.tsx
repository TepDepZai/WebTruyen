"use client";
import { useState } from "react";
import { useRouter } from "next/dist/client/components/navigation";
import InputSomeThing from "../components/inputsomething";
import { register } from "@/services/authService";
import ToolTip from "../components/tooltip";
const RegisterPage = () => {
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userName, setuserName] = useState("")
    const [email, setemail] = useState("")
    const [submitted, setsubmitted] = useState(false);
    const checkCfPw = password.trim() === confirmPassword.trim();
    const router = useRouter();
    const isValidEmail = (email: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isEmpty = (value: string) => value.trim() === "";
    const errors = {
        fullName: submitted && isEmpty(fullName),
        userName: submitted && isEmpty(userName),
        email: submitted && (isEmpty(email) || !isValidEmail(email)),
        password: submitted && isEmpty(password),
        confirmPassword: submitted && (isEmpty(confirmPassword) || !checkCfPw),
    };
    const handleRegister = async () => {
        setsubmitted(true)
        if (!userName || !password || !confirmPassword || !email) {
            return;
        }
        else if (password.length < 8) {
            return;
        }
        try {
            const res = await register({
                userName,
                password,
                fullName,
                email
            });
            if (res.success) {

                router.push("/login");
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold p-6">Paper Point</h1>
            <div className="flex-grow flex items-center justify-center">
                <form className="bg-white w-[450px] rounded-lg shadow-lg p-8" onSubmit={(e) => {
                    e.preventDefault();  // ✅ chặn reload mặc định
                    handleRegister();    // ✅ gọi hàm đăng ký
                }}>
                    <h2 className="text-xl font-bold text-center mb-6">Create your account</h2>
                    <div className="flex flex-col gap-3 mb-4">
                        <div>
                            <ToolTip changed={submitted && password.length < 8} />
                            <label htmlFor="fullname" className={`${errors.fullName ? "block mb-1 text-red-500" : "block mb-1"}`}>Full Name(optional)</label>
                            <input
                                id="fullname"
                                type="text"
                                placeholder="Enter your fullname"
                                className="w-full border border-gray-300 p-2 rounded-md"
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="username" className={`${errors.userName ? "block mb-1 text-red-500" : "block mb-1"}`}>User Name</label>
                            <input
                                id="username"
                                type="text"
                                placeholder="Enter your username"
                                className="w-full border border-gray-300 p-2 rounded-md"
                                onChange={(e) => setuserName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className={`${errors.email ? "block mb-1 text-red-500" : "block mb-1"}`}>Email</label>
                            <input
                                id="email"
                                type="text"
                                placeholder="Enter your email"
                                className="w-full border border-gray-300 p-2 rounded-md"
                                onChange={(e) => setemail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className={`${errors.password ? "block mb-1 text-red-500" : "block mb-1"}`}>Password</label>
                            <InputSomeThing onChange={(e) => {
                                setPassword(e.target.value)
                            }} />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className={`${errors.confirmPassword ? "block mb-1 text-red-500" : "block mb-1"}`}>Confirm Password</label>
                            <InputSomeThing onChange={(e) => {
                                setConfirmPassword(e.target.value)
                            }} />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-xl"
                            type="submit"
                        >
                            Register
                        </button>
                    </div>
                    <p className="text-center mt-6 text-sm">
                        Already have an account?{" "}
                        <span className="text-blue-500 cursor-pointer hover:underline"
                            onClick={() => router.push("/login")}>
                            Sign In
                        </span>
                    </p>
                </form>
            </div >
        </div >
    );
};

export default RegisterPage;