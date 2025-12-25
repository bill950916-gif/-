
import { GoogleGenAI } from "@google/genai";
import { Question } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getQuestionExplanation = async (question: Question, chapterTitle: string): Promise<string> => {
  try {
    const prompt = `
      你是一位國文老師。請針對以下經典古文題目提供「深度詳解」。
      篇章：${chapterTitle}
      題目：${question.text}
      選項：
      A. ${question.options.A}
      B. ${question.options.B}
      C. ${question.options.C}
      D. ${question.options.D}
      正確答案是：${question.answer}

      請先簡短解釋題目背景，然後逐一分析為什麼正確選項是對的，而其他選項不正確。最後總結本題測驗的核心觀念。
      語氣請專業且親切。
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return response.text || "無法生成詳解。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("獲取詳解失敗，請稍後再試。");
  }
};
