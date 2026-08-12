# ClaudeCooks 🍳

A recipe generator that suggests dishes you can make based on the ingredients you already have. Add your ingredients, and ClaudeCooks — powered by Anthropic's Claude API — recommends a recipe using some or all of them.

**Live site:** [claudecooks.com](https://www.claudecooks.com)

## How it works

1. Type in ingredients you have on hand and add them to your list
2. Once you've added a few, click **"Get a recipe"**
3. The app sends your ingredient list to a Claude-powered backend, which returns a formatted recipe suggestion

## Tech stack

- **Frontend:** React + Vite
- **Backend:** Vercel Serverless Functions (Node.js)
- **AI:** [Anthropic API](https://docs.claude.com) (`@anthropic-ai/sdk`), using the Claude Haiku model
- **Markdown rendering:** `react-markdown`
- **Hosting:** Vercel

## Project structure

```
├── api/
│   └── recipe.js        # Serverless function — calls the Anthropic API
├── src/
│   ├── Form.jsx          # Ingredient input + recipe request logic
│   ├── IngredientsList.jsx
│   ├── ClaudeRecipe.jsx  # Renders the returned recipe
│   └── ...
├── index.html
├── vite.config.js
└── package.json
```

## Running locally

This project uses Vercel's serverless functions, so use the Vercel CLI to run frontend and backend together (rather than plain `vite dev`, which won't know how to route `/api` requests):

```bash
npm install
npx vercel dev
```

### Environment variables

Create a `.env.local` file in the project root (not committed to git):

```
ANTHROPIC_API_KEY=your_api_key_here
```

You'll also need this same key set in your Vercel project's dashboard under **Settings → Environment Variables** for production deployments.

## Deployment

This project deploys to Vercel. Pushing to the connected Git branch triggers an automatic deployment. To deploy manually:

```bash
npx vercel --prod
```

Make sure `ANTHROPIC_API_KEY` is set for the **Production** environment in the Vercel dashboard — env var changes require a redeploy to take effect.

## Notes

- Ingredients are stored in local component state — nothing is persisted between sessions.
- The API route lives at `api/recipe.js` and is deployed as an individual serverless function, following Vercel's file-based routing convention (`api/recipe.js` → `/api/recipe`).
