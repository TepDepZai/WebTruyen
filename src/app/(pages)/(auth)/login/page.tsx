"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ToolTip from "../components/tooltip";
import { login, loginWithGoogle } from "@/services/authService";
import useToastState from "../../_components/hook/useToast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "@/contexts/authProvider";

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const [identifier, setidentifier] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const [submitted, setsubmitted] = useState(false);
    const UserNull = submitted && identifier.trim() === "";
    const PwNull = submitted && password.trim() === "";
    const { setToast } = useToastState();
    const { setUser } = useAuth();
    const handleLogin = async () => {
        setsubmitted(true);
        if (!password || !identifier) {
            setToast({
                title: "Login Failed",
                message: "Please enter your username and password.",
                variant: "error",
            });
            return;
        }
        try {
            const res = await login({
                identifier: identifier.trim(),
                password: password.trim()
            });
            if (res.success) {
                setUser(res.user);
                router.push("/");
            } else {
                setToast({
                    title: "Login Failed",
                    message: "Please enter your username and password.",
                    variant: "error",
                });
            }
        } catch (error: any) {
            if (error.response && error.response.data) {
                setError(error.response.data.message || "Đã xảy ra lỗi khi đăng nhập.");
            } else {
                setError("Đã xảy ra lỗi khi đăng nhập.");
            }
        }
    }
    const reqLoginGoogle = async (token: string) => {
        const data = await loginWithGoogle(token);
        if (data.success) {
            router.push("/");
        } else {
            setToast({
                title: "Login Failed",
                message: "Google login failed. Please try again.",
                variant: "error",
            });
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
                            <Label htmlFor="username" className={`${UserNull ? "block mb-1 text-red-500" : "block mb-1"}`}>User Name</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="Enter your username"

                                className="w-full border border-gray-300 p-2 rounded-md"
                                onChange={(e) => setidentifier(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="password" className={`${PwNull ? "block mb-1 text-red-500" : "block mb-1"}`}
                            >Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type="password"
                                    className="w-full border border-gray-300 p-2 rounded-md"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
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
                        <Button
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-xl disabled:opacity-50"
                            type="submit"
                        >
                            {loading ? "Đang đăng nhập..." : "Login"}
                        </Button>
                    </div>
                    <div className="flex items-center justify-center mt-4 mb-6">
                        <GoogleLogin
                            onSuccess={(credentialResponse) => {
                                const { credential } = credentialResponse;
                                if (!credential) return;

                                // Gửi credential (ID token) về server
                                reqLoginGoogle(credential);
                            }}
                            onError={() => {
                                console.log("Google Login Failed");
                            }}
                        />
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