import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import Anthropic from "@anthropic-ai/sdk"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
})
app.post("/api/recipe", async (req, res) => {
    try {
        const { ingredients } = req.body

        const ingredientsString = ingredients.join(", ")

        const msg = await anthropic.messages.create({
            model: "claude-haiku-4-5",
            max_tokens: 1024,
            system: `
                You are an assistant that receives a list of ingredients
                and suggests a recipe the user could make with some or
                all of those ingredients.

                Format your response in markdown.
            `,
            messages: [
                {
                    role: "user",
                    content: `I have ${ingredientsString}. Please give me a recipe I'd recommend making!`
                }
            ]
        })

        res.json({
            recipe: msg.content[0].text
        })

    } catch (error) {
        console.error(error)

        res.status(500).json({
            error: "Failed to generate recipe"
        })
    }
})

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000")
})