import React from "react"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"
import Note from "./Note"
// import{ getRecipeFromChefClaude }from "./ai"

function Form(){
   const [ingredients, setIngredients] = React.useState(['pasta', 'tomato', 'cheese', 'basil'])
   
   const [loading, setLoading] = React.useState(false)
   
   const [recipeText, setRecipeText] = React.useState("")

    // async function newtoggleRecipeShown() {
    //     const recipe = await getRecipeFromChefClaude( ingredients )
    //     setrecipeText(recipe)
    // }


    
async function newToggleRecipeShown() {
    setLoading(true)
    try {
        const response = await fetch("/api/recipe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ingredients
            })
        })
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data.error || "Something went wrong")
        }
        setRecipeText(data.recipe)
    } catch (error) {
        console.error(error)
        setRecipeText("Sorry, I couldn't generate a recipe.")
    } finally {
        setLoading(false)
    }

}

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }
    return(
        <main>
            <Note />

            <form action={addIngredient} className="add-ingredient-form">
                <input 
                    type="text" 
                    placeholder="e.g Tomato"
                    aria-label="Add ingredient"
                    name="ingredient"
                    required
                />
                <button className="btn">Add Ingredient</button>
            </form>


            {ingredients.length > 0 &&
                <IngredientsList
                    ingredients={ingredients}
                    toggleRecipeShown={newToggleRecipeShown}
                />
            }


        {loading && (
            <div className="loading">
            <div className="spinner"></div>
            <p>👨‍🍳 Claude is cooking up your recipe...</p>
            </div>
        )}

            {recipeText && <ClaudeRecipe show={recipeText} />}
        </main>
    )
}
export default Form