import React from "react"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"
import Note from "./Note"
// import{ getRecipeFromChefClaude }from "./ai"

function Form(){
   const [ingredients, setIngredients] = React.useState([])
   const [loading, setLoading] = React.useState(false)
   
   const [recipeText, setRecipeText] = React.useState("")
   const recipeRef = React.useRef(null)

    // async function newtoggleRecipeShown() {
    //     const recipe = await getRecipeFromChefClaude( ingredients )
    //     setrecipeText(recipe)
    // }

function deleteIngredient(index) {
  setLimitMessage("")
  setIngredients(prevIngredients => [...prevIngredients.slice(0, index), ...prevIngredients.slice(index + 1)])
}
    
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
// scrolling effect for the recipe text when it appears
React.useEffect(() => {
    if (recipeText && recipeRef.current) {
        const targetPosition = recipeRef.current.getBoundingClientRect().top + window.scrollY
        const startPosition = window.scrollY
        const distance = targetPosition - startPosition
        const duration = 1500 // Duration in milliseconds (1.5 seconds)
        let startTime = null

        function animateScroll(currentTime) {
            if (startTime === null) startTime = currentTime

            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)

            // Smooth easing effect
            const ease = progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2

            window.scrollTo(0, startPosition + distance * ease)

            if (progress < 1) {
                requestAnimationFrame(animateScroll)
            }
        }

        requestAnimationFrame(animateScroll)
    }
}, [recipeText])

const [limitMessage, setLimitMessage] = React.useState("")
    function addIngredient(formData) {
    const newIngredient = formData.get("ingredient")
        if (ingredients.length >= 10) {
            setLimitMessage("You've reached the maximum of 10 ingredients.")
            return
        }

        if (ingredients.some(item => item.toLowerCase() === newIngredient.toLowerCase())) {
            setLimitMessage("That ingredient is already on your list.")
            return
        }

        setLimitMessage("") 

        
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
            
            {limitMessage && (
                <div className="limit-alert">
                    <span className="limit-alert__icon">⚠️</span>
                    <p>{limitMessage}</p>
                </div>
                )}

            {ingredients.length > 0 &&
                <IngredientsList
                    ingredients={ingredients}
                    toggleRecipeShown={newToggleRecipeShown}
                    deleteIngredient={deleteIngredient}
                />
            }


            {loading && (
                <div className="loading-overlay">
                    <div className="loading">
                        <div className="spinner"></div>
                        <p>👨‍🍳 Claudecooks is cooking up your recipe...</p>
                    </div>
                </div>
            )}

            

            {recipeText && (
                <div ref={recipeRef}>
                    <ClaudeRecipe show={recipeText} />
                </div>
            )}

        </main>
    )
}
export default Form