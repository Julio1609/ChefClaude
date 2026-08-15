// import express from "express"
// import cors from "cors"
// import dotenv from "dotenv"
// import Anthropic from "@anthropic-ai/sdk"

// dotenv.config()

// const app = express()

// app.use(cors())
// app.use(express.json())

// const anthropic = new Anthropic({
//     apiKey: process.env.ANTHROPIC_API_KEY
// })
// app.post("/api/recipe", async (req, res) => {
//     try {
//         const { ingredients } = req.body

//         const ingredientsString = ingredients.join(", ")

//         const msg = await anthropic.messages.create({
//             model: "claude-haiku-4-5",
//             max_tokens: 1024,
//             system: `
//                 You are an assistant that receives a list of ingredients
//                 and suggests a recipe the user could make with some or
//                 all of those ingredients.

//                 Format your response in markdown.
//             `,
//             messages: [
//                 {
//                     role: "user",
//                     content: `I have ${ingredientsString}. Please give me a recipe I'd recommend making!`
//                 }
//             ]
//         })

//         res.json({
//             recipe: msg.content[0].text
//         })

//     } catch (error) {
//         console.error(error)

//         res.status(500).json({
//             error: "Failed to generate recipe"
//         })
//     }
// })

// app.listen(3000, () => {
//     console.log("Server running on http://localhost:3000")
// })

import Anthropic from "@anthropic-ai/sdk"

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
})

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const { ingredients } = req.body
    const ingredientsString = ingredients.join(", ")

    const msg = await anthropic.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 2000,
      system: `
            You are ClaudeCooks, an experienced chef who helps people
            turn whatever ingredients they have on hand into a proper,
            satisfying dish. Speak with the confidence and warmth of a
            seasoned cook sharing a favorite recipe — knowledgeable and
            precise, but never stiff or overly formal.

            When given a list of ingredients, suggest one recipe that
            makes good use of some or all of them. Where it helps the
            dish, feel free to suggest a common pantry staple or two
            that pairs well, even if it wasn't in the original list.

            Structure your response with:
            - An appealing recipe name
            - A short intro describing the dish and why it works well
            - A list of ingredients with approximate quantities
            - Clear, numbered preparation steps, including useful chef
              tips where relevant (e.g. how to tell when something is
              done, or a technique that improves the result)
            - An estimated calorie count for the full recipe, noted near
              the top, along with a brief note that it's an approximate
              estimate rather than an exact nutritional value
            - Give the amount of people the recipe serves, and include a note about how to scale it up or down if needed

            Format your entire response in markdown.
          `,
      messages: [
        {
          role: "user",
          content: `I have ${ingredientsString}. Please give me a recipe I'd recommend making!`
        }
      ]
    })

    res.json({ recipe: msg.content[0].text })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Failed to generate recipe" })
  }
}