import React from 'react'

export default function RecipeIngredient({ name, amount }) {
    return (
        <div className="recipe__ingredient__box">
            <span>{name}</span>
            <span>{amount}</span>
        </div>
    )
}
