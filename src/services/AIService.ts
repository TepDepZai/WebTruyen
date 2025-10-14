import api from "@/middleware/api"
import AIAPI from "../../env/AIAPI";


export const AIChatBot = async (prompt: string) => {
    try {
        const res = await api.post(`${AIAPI.generateStory}`, { prompt });
        return res.data;
    } catch (error) {
        return error;
    }
}
export const AISmooth = async (content: string, language: string, title: string) => {
    try {
        const res = await api.post(`${AIAPI.AISmooth}`, { content, language, title });
        return res.data;
    } catch (error) {
        return error;
    }
}