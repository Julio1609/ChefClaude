import ReactMarkdown from "react-markdown"

export default function ClaudeRecipe(props) {
    return (
        <section className="suggested-recipe-container" aria-live="polite">
            <h2 ref={props.recipeRef}>Chef ClaudeCooks Recommends:</h2>
            <ReactMarkdown>{props.show}</ReactMarkdown>
        </section>
    )
}