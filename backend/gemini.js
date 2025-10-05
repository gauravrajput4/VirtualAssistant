import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const geminiResponse = async (command, assistantName , userName) => {
    try {
        const userInputLower = command.toLowerCase();

        if (userInputLower.includes("who created you") || userInputLower.includes("who made you")) {
            return {
                type: "general",
                userInput: command,
                response: "I was created by Tecker Team."
            };
        }

        const apiUrl = process.env.GEMINI_API_URL;

        const prompt = `
You are a voice assistant named "${assistantName}". You are not google. You will behave like voice-enabled assistant. Your task is to understand the user's natural language input and Respond ONLY in JSON format:

{
  "type": "general" | "google_search" | "youtube_search" | "youtube_play" | "get_time" | "get_date" | "get_day" | "get_month" | "calculator_open" | "instagram_open" | "facebook_open" | "weather_show",
  "userInput": "original user input without your name"{only remove your name from userInput if exists} and agar kisi ne google ya youtube par kuchh search karne ki bola hai to userInput me only vo search baala test jaaye,
  "response": "a short voice-friendly reply to read out loud"
}

Instructions:
- "type": determine the intent of the user.
- "userInput": the sentence the user spoke (remove your assistant name if present).
- "response": short voice-friendly reply.

Type meanings:
- "general": If it is a factual or information question If you know the answer then you response it.
- "google_search": If user want to search something on google.
- "youtube_search": If user want to search something on google.
- "youtube_play" : If user want to play something on google.
- "calculator_open" : If user want to calculator open something on google.
- "instagram_open" : If user want to open instagram .
- "facebook_open" : If user want to open facebook .
- "weather_show" : If user want to know weather.
- "get_time" : If user want to get the time .
- "get_date" : If user want to get the date .
- "get_day" : If user want to get the day .

Important:
- Use Tacker Team agar koi poochhe tumko kisne banaya.
- Only respond with the json object, nothing else.
"userInput": "${command}"
`;

        const response = await axios.post(
            apiUrl,
            { contents: [{ parts: [{ text: prompt }] }] },
            { headers: { "Content-Type": "application/json", "x-goog-api-key": process.env.GEMINI_API_KEY } }
        );

        // console.log("Raw Gemini API response:", JSON.stringify(response.data, null, 2));

        // FIX 1: Correctly and safely extract the text content.
        // The path is .content.parts[0].text, not .content[0]...
        const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
            console.warn("Gemini returned empty or malformed text. Returning fallback.");
            return {
                type: "general",
                userInput: command,
                response: "Sorry, I couldn't understand that."
            };
        }

        // FIX 2: Clean the markdown fences before trying to parse.
        const cleanedText = text.replace(/^```json\s*|```\s*$/g, "").trim();

        let parsed;
        try {
            // Now parse the cleaned string directly.
            parsed = JSON.parse(cleanedText);
            if (parsed.userInput) {
                parsed.userInput = parsed.userInput.replace(/^"(.*)"$/, "$1");
            }
        } catch (e) {
            // console.error("Failed to parse JSON from Gemini response. Cleaned text:", cleanedText);
            return {
                type: "general",
                userInput: command,
                response: "Sorry, I couldn't understand that."
            };
        }

        return parsed;

    } catch (err) {
        // console.error("Gemini API request failed:", err);
        return {
            type: "general",
            userInput: command,
            response: "Sorry, something went wrong."
        };
    }
};

export default geminiResponse;