import React, { useState } from 'react'
import Recipe from './Recipe.component'

// Material-ui imports
import { Pagination } from '@material-ui/lab'

export default function RcipesSection({ recipes, deleteRecipe, editRecipeOpen, deleteRecipeImage, page, limit, pageChange }) {

    return (
        <div className="recipes__all">
            {recipes.slice(limit * page - limit, limit * page).map((recipe) => {
                const { id, title, servings, cooktime, steps, ingredients, imgs } = recipe
                return <Recipe
                    key={id}
                    id={id}
                    title={title}
                    servings={servings}
                    cooktime={cooktime}
                    steps={steps}
                    ingredients={ingredients}
                    images={imgs}
                    deleteRecipe={deleteRecipe}
                    editRecipeOpen={editRecipeOpen}
                    deleteRecipeImage={deleteRecipeImage}
                />
            })}
            {recipes.length != 0 ? <Pagination
                page={page} count={Math.ceil(recipes.length / limit)}
                color="primary" className="recipe__pagination"
                onChange={(e, v) => pageChange(e, v)} /> : null}
        </div>
    )
}
