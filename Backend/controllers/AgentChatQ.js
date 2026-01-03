import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const chat = async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: message }]
            }
          ]
        })
      }
    );

    const data = await response.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error calling Gemini API");
  }
};

export default { chat };
