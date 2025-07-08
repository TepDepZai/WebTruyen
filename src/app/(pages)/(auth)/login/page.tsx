"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import InputSomeThing from "../components/inputsomething";
import ToolTip from "../components/tooltip";
import { login } from "@/services/authService";
import LoadingPage from "../../_components/loading";

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const [identifier, setidentifier] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const [submitted, setsubmitted] = useState(false);
    const UserNull = submitted && identifier.trim() === "";
    const PwNull = submitted && password.trim() === "";

    const handleLogin = async () => {
        setsubmitted(true);
        if (!password || !identifier) {
            setError("Vui lòng nhập đầy đủ thông tin.");
            return;
        }
        try {
            const res = await login({
                identifier,
                password
            });
            if (res.success) {
                router.push("/");
            } else {
                setError("Sai tài khoản hoặc mật khẩu.");
            }
        } catch (error: any) {
            console.error(error);

            if (error.response?.status === 403) {
                setError("Bạn không có quyền truy cập hoặc tài khoản bị khóa.");
            } else if (error.response?.status === 401) {
                setError("Sai tài khoản hoặc mật khẩu.");
            } else if (error.response?.status === 500) {
                setError("Lỗi server. Vui lòng thử lại sau.");
            } else {
                setError("Có lỗi xảy ra. Vui lòng thử lại.");
            }
        }
    }
    const backToMain = () => {
        return router.push("/");
    }


    return (
        <div className=" flex flex-col items-center min-h-screen bg-gray-100">
            <div
                className="text-4xl font-bold p-6 text-[#5459AC] cursor-pointer hover: hover:text-[#3d4290] transition"
                onClick={backToMain}
            >
                Paper Point
            </div>

            <form className="flex-grow flex items-center justify-center" onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
            }}>
                <div className="bg-white w-[450px] rounded-lg shadow-lg p-8">
                    <h2 className="text-xl font-bold text-center mb-6">Sign in to your account</h2>

                    {/* Hiển thị lỗi */}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col gap-4 mb-4">
                        <ToolTip changed={submitted && password.length > 0 && password.length < 8} />
                        <div>
                            <label htmlFor="username" className={`${UserNull ? "block mb-1 text-red-500" : "block mb-1"}`}>User Name</label>
                            <input
                                id="username"
                                type="text"
                                placeholder="Enter your username"
                                className="w-full border border-gray-300 p-2 rounded-md"
                                onChange={(e) => setidentifier(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className={`${PwNull ? "block mb-1 text-red-500" : "block mb-1"}`}
                            >Password</label>
                            <InputSomeThing onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm mb-6">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" name="rememberMe" />
                            Remember Me
                        </label>
                        <a href="#" className="text-blue-500 hover:underline">Forgot password?</a>
                    </div>
                    <div className="flex justify-center">
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-xl disabled:opacity-50"
                            type="submit"
                        >
                            {loading ? "Đang đăng nhập..." : "Login"}
                        </button>
                    </div>
                    <div className="flex items-center justify-center mt-4 mb-6">
                        <button
                            type="button"
                            className="bg-white border-1 text-sm hover:bg-blue-400 text-black py-2 px-3 rounded-xl flex gap-1"
                        >
                            <img src="./google.svg" alt="ảnh google" className="w-5 h-5" />
                            Login with google
                        </button>
                    </div>
                    <p className="text-center mt-6 text-sm">
                        Don't have an account?{" "}
                        <span className="text-blue-500 cursor-pointer hover:underline"
                            onClick={() => router.push('/register')}>
                            Sign Up
                        </span>

                    </p>
                </div>
            </form>

        </div>
    );
};

export default LoginPage;