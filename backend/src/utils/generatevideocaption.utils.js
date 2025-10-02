import dotenv from "dotenv";
dotenv.config();
import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;


 async function  generatevideocaption(videoUrls) {
    try {

        const ai = new GoogleGenAI(GEMINI_API_KEY);

        

        
        

    } catch (error) {
        console.error("❌ ERROR:", error.message);

        if (error.message.includes("Unable to process input video")) {
            console.error("🔧 The Instagram URLs might be expired or blocked");

        }
    }
}

export default generatevideocaption;
