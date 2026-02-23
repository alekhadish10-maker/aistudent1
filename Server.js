import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const openai = new OpenAI({
 apiKey: process.env.OPENAI_API_KEY
});
app.post("/ask", async (req, res) => {
 try {
   const { question } = req.body;
   const response = await openai.chat.completions.create({
     model: "gpt-4o-mini",
     messages: [
       {
         role: "system",
         content: "Du är AI Student. Hjälp elever med läxor. Förklara enkelt och ge fakta."
       },
       {
         role: "user",
         content: question
       }
     ],
   });
   res.json({ answer: response.choices[0].message.content });
 } catch (error) {
   console.error(error);
   res.status(500).json({ error: "Något gick fel" });
 }
});
app.listen(3000, () => {
 console.log("Server kör på http://localhost:3000");
});