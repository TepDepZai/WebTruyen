"use client";

import { useEffect, useRef, useState } from "react";
import { AIChatBot } from "@/services/AIService";
import { Button } from "@/components/ui/button";
import { MessageCircle, Send, X, Bot } from "lucide-react";
import { Input } from "@/components/ui/input";
const TypingIndicator = () => (
    <div className="flex items-center space-x-1 p-2 self-start">
        <span className="text-gray-500">AI đang trả lời</span>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
    </div>
);

export default function AIChatBotBox() {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<
        { role: "user" | "assistant"; content: string }[]
    >([]);
    const chatRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages, loading]);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        if (!input.trim() || loading) return;

        const userMessage = { role: "user" as const, content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const response = await AIChatBot(input);
            const answer = response?.answer || "Không nhận được phản hồi.";
            const aiMessage = { role: "assistant" as const, content: answer };
            setMessages((prev) => [...prev, aiMessage]);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "⚠️ Lỗi khi gọi API. Vui lòng thử lại." },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                className={`fixed bottom-10 right-10 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl shadow-lg hover:bg-blue-700 transition-all transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300
          ${open ? "scale-0 opacity-0" : "scale-100 opacity-100"}`}
                aria-label="Mở hộp thoại chat"
            >
                <MessageCircle size={32} />
            </Button>
            <div
                className={`fixed bottom-10 right-10 w-96 h-120 bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ease-in-out
          ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
            >
                <div className="flex items-center justify-between p-3 border-b bg-blue-600 text-white">
                    <div className="flex items-center gap-2">
                        <Bot size={24} />
                        <h3 className="font-bold text-lg">AI Assistant</h3>
                    </div>
                    <Button
                        onClick={() => setOpen(false)}
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-blue-700 hover:text-white"
                        aria-label="Đóng hộp thoại chat"
                    >
                        <X size={20} />
                    </Button>
                </div>
                <div
                    ref={chatRef}
                    className="flex-1 p-4 h-30 overflow-y-auto bg-gray-50 flex flex-col space-y-3 scrollbar-thin
                                scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                >
                    {messages.length === 0 && (
                        <p className="text-gray-400 text-center text-sm my-auto">
                            Gõ gì đó để bắt đầu cuộc trò chuyện nhé!
                        </p>
                    )}
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`p-3 rounded-2xl text-sm max-w-[85%] whitespace-pre-wrap ${msg.role === "user"
                                ? "bg-blue-500 text-white self-end rounded-br-none"
                                : "bg-gray-200 text-gray-800 self-start rounded-bl-none"
                                }`}
                        >
                            {msg.content}
                        </div>
                    ))}
                    {loading && <TypingIndicator />}
                </div>
                <div className="p-3 border-t bg-white">
                    <form onSubmit={handleSubmit} className="flex items-center gap-2">
                        <Input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Nhập tin nhắn..."
                            className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
                            disabled={loading}
                        />
                        <Button
                            type="submit"
                            className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
                            disabled={loading || !input.trim()}
                            aria-label="Gửi tin nhắn"
                        >
                            <Send size={20} />
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
}