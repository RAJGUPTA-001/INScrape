import dotenv from "dotenv";
dotenv.config();
import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const generateimagecaption = async function (imageUrls) {
    try {

        const ai = new GoogleGenAI(GEMINI_API_KEY);



        const imageDataPromises = imageUrls.map(async (url, index) => {
            console.log(`Downloading image ${index + 1}...`);


            const response = await fetch(url)
            //  {
            //     headers: {
            //       'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            //     }
            //   });

            if (!response.ok) {
                throw new Error(`Failed to fetch image ${index + 1}: ${response.statusText}`);
            }

            const arrayBuffer = await response.arrayBuffer();
            const base64Data = Buffer.from(arrayBuffer).toString('base64');

            return {
                inlineData: {
                    mimeType: 'image/jpeg',
                    data: base64Data,
                },
            };
        });

        const imageData = await Promise.all(imageDataPromises);
        console.log(`✅ Downloaded ${imageData.length} images`);


        const result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
                {
                    parts: [
                        ...imageData,
                        {
                            text: `[
                                    You are an expert image analyst specializing in social media content analysis.Analyze the provided image(s) and return a comprehensive analysis in strict JSON format.

                                    ** ANALYSIS REQUIREMENTS:**

                                        1. ** Keywords / Tags **: Generate 8 - 12 relevant keywords that describe the main subjects, objects, activities, and themes in the image
                                    2. ** Vibe / Ambience **: Classify the overall mood and atmosphere of the post
                                    3. ** Quality Indicators **: Assess technical and aesthetic quality aspects
                                    4. ** Image Caption **: Caption this Instagram image
                                    ** RETURN FORMAT **: Strict JSON only, no additional text or explanations.

                                    ** JSON SCHEMA:**                                   

                                        {
                                            "analysis": {
                                                "keywords": ["#keyword1", "#keyword2", "#keyword3", ...],
                                                "vibe": {
                                                    "primary": ["main_vibe_category","otherr",""...],
                                                    "energy_level": "medium"
                                                },
                                                "quality": {
                                                    "lighting": "well-lit with soft natural light" ,
                                                    "visual_appeal":  "excellent",
                                                    "consistency":"consistent",
                                                    "technical": {
                                                        "sharpness": 0.8,
                                                        "exposure": "perfect",
                                                        "overall_quality": "good"
                                                    }
                                                },
                                                "content_category": "lifestyle",

                                            }
                                        }                                   


                                        ** VIBE CATEGORIES ** (choose primary):
                                    - aesthetic: Visually pleasing, Instagram - worthy, curated
                                    - casual: Relaxed, everyday, natural, unposed
                                    - luxury: High - end, expensive, premium, sophisticated
                                    - energetic: Dynamic, active, vibrant, exciting
                                    - minimalist: Clean, simple, uncluttered, elegant
                                    - cozy: Warm, comfortable, intimate, homey
                                    - professional: Business - like, formal, polished
                                    - artistic: Creative, expressive, unique
                                    - nostalgic: Vintage, retro, throwback
                                    - playful: Fun, whimsical, lighthearted                                 



                                    Analyze the image thoroughly and provide ONLY the JSON response. 
                                    
                                ]`
                        }
                    ]
                }
            ],
        });
        // console.log(typeof(result.text));
        const cleanedresult = result.text.replace(/^\s*```json\s*/i, '').replace(/\s*```\s*$/i, '');

        // console.log(cleanedresult);
        let parsedResult;
        try {
            parsedResult = JSON.parse(cleanedresult);
        } catch (e) {
            parsedResult = { error: true, message: "Invalid JSON from Gemini" };
        }

        return parsedResult;

    } catch (error) {
        console.error("❌ ERROR:", error.message);

        if (error.message.includes("Unable to process input image")) {
            console.error("🔧 The Instagram URLs might be expired or blocked");

        }
        return false
    }
}

export default generateimagecaption;
// generateimagecaption(["https://instagram.fbom12-1.fna.fbcdn.net/v/t51.2885-15/556516035_18483389494079639_3487800880394391182_n.jpg?stp=dst-jpg_e35_p1080x1080_sh0.08_tt6&_nc_ht=instagram.fbom12-1.fna.fbcdn.net&_nc_cat=111&_nc_oc=Q6cZ2QH3HAOd4LMdkHZ6hTxAwmu1DrfGA3JNg2VEqLzCo7NKy7nWL-Nj0Yb_LIT-YD8ZoSE&_nc_ohc=U50ryJI6MVsQ7kNvwGcsOYF&_nc_gid=cJNrEi_SmNuZynuZUp9Gyw&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfZczpOdpBK7CI3YVbsXNIQYMY7pmzxjHMI1oLcpNOmHbg&oe=68E1E5DD&_nc_sid=8b3546", "https://instagram.fbom12-1.fna.fbcdn.net/v/t51.2885-15/557011252_18483389503079639_4482581488279408984_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=instagram.fbom12-1.fna.fbcdn.net&_nc_cat=111&_nc_oc=Q6cZ2QH3HAOd4LMdkHZ6hTxAwmu1DrfGA3JNg2VEqLzCo7NKy7nWL-Nj0Yb_LIT-YD8ZoSE&_nc_ohc=DzeLj7Zg_jsQ7kNvwH76Ebe&_nc_gid=cJNrEi_SmNuZynuZUp9Gyw&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfYNIlbe5uZw5o8HeNU9MImItJrKizj3i30vDS0ncfUjAg&oe=68E1E4DD&_nc_sid=8b3546","https://instagram.fbom12-1.fna.fbcdn.net/v/t51.2885-15/554232101_18427843273110094_7824439189448283030_n.jpg?stp=dst-jpg_e35_p1080x1080_sh0.08_tt6&_nc_ht=instagram.fbom12-1.fna.fbcdn.net&_nc_cat=1&_nc_oc=Q6cZ2QH3HAOd4LMdkHZ6hTxAwmu1DrfGA3JNg2VEqLzCo7NKy7nWL-Nj0Yb_LIT-YD8ZoSE&_nc_ohc=6tw45DWCoHIQ7kNvwHuEQ0R&_nc_gid=cJNrEi_SmNuZynuZUp9Gyw&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfbeAeTl5SWJeg4srY9DzhdmSRQmj4n0MLPzo_rFEY2A0A&oe=68E1D23E&_nc_sid=8b3546",])