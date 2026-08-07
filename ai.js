import Anthropic from "@anthropic-ai/sdk"

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
})

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        })
    }

    try {
        const { ingredients } = req.body

        if (!ingredients || !Array.isArray(ingredients)) {
            return res.status(400).json({
                error: "Ingredients are required"
            })
        }

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
                    content: `I have ${ingredientsString}. Please give me a recipe I would recommend making!`
                }
            ]
        })

        return res.status(200).json({
            recipe: msg.content[0].text
        })

    } catch (error) {
        console.error("Anthropic API error:", error)

        return res.status(500).json({
            error: "Failed to generate recipe"
        })
    }
}