import React, { useEffect, useState } from 'react'
import RcipesSection from './RcipesSection.component'
import RecipeEditForm from './RecipeEditForm.component'

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Material-ui imports
import { Button, Fab, Tooltip, makeStyles, withStyles } from '@material-ui/core'
import Add from '@material-ui/icons/Add';
import { ThemeProvider } from '@material-ui/core/styles'

// Other imports
import theme from './materialTheme'


// Custimized tooltip
const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 15,
    },
}))(Tooltip);

export default function RecipeApp() {
    const [isEditRecipeOpen, setEditRecipeOpen] = useState(false);
    const [recipes, setRecipe] = useState([]);
    const [openedRecipe, setOpenedRecipe] = useState(null);
    const [page, setPage] = useState(1)
    const limit = 2;

    useEffect(() => {
        const LocallyRecipes = JSON.parse(localStorage.getItem("recipes"));
        setRecipe(LocallyRecipes);
    }, [])

    useEffect(() => {
        const jsonRecipes = JSON.stringify(recipes);
        localStorage.setItem("recipes", jsonRecipes)
    }, [recipes])

    function addNewRecipeHandler() {
        const id = new Date().getTime();
        const newRecipe = {
            id,
            title: "",
            cooktime: "",
            servings: "",
            steps: [],
            ingredients: [],
            imgs: []
        }

        setRecipe([...recipes, newRecipe]);
        setEditRecipeOpen(true)
        setOpenedRecipe(id)
        console.log(Math.floor(recipes.length / limit) + 1)
        setPage(Math.floor(recipes.length / limit) + 1)
    }

    function deleteRecipeHandler(recipeId) {
        const recipesToUpdate = [...recipes];
        const updatedRecipes = recipesToUpdate.filter(recipe => recipe.id != recipeId);

        setRecipe(updatedRecipes);
        setEditRecipeOpen(false);
    }

    function editRecipeOpenHandler(id) {
        if (!isEditRecipeOpen) {
            setOpenedRecipe(id);
        } else {
            setOpenedRecipe(id);
            if (openedRecipe != id) setEditRecipeOpen(false);

        }

        setEditRecipeOpen(prev => !prev)
    }

    function changeRecipeHandler(e, prop, index) {
        let text = e.target.value;
        const recipesToChange = [...recipes];
        const needToUpdateRecipe = recipesToChange.find(recipe => recipe.id == openedRecipe);

        switch (prop) {
            case "title":
                needToUpdateRecipe.title = text;
                break;
            case "cooktime":
                if (text.length < 15) {
                    if (parseFloat(text) < 0) {
                        text = text * -1
                    }
                    needToUpdateRecipe.cooktime = text;
                }
                break;
            case "servings":
                if (text < 1) text = 1;
                needToUpdateRecipe.servings = text;
                break;
            case "steps":
                needToUpdateRecipe.steps = text != "" ? text.split(/\n/) : [];
                break;
            case "ingredients":
                if (e.target.getAttribute("id") == "ingredient-name") {
                    if (text.length < 20) needToUpdateRecipe.ingredients[index].name = text;
                } else {
                    if (text.length < 12) needToUpdateRecipe.ingredients[index].amount = text;
                }
                break;
        }

        setRecipe(recipesToChange)
    }

    const closeRecipeEditHandler = () => {
        setEditRecipeOpen(false)
    }

    const deleteIngredientHandler = (index) => {
        const recipesToUpdate = [...recipes];
        const recipeToUpdate = recipesToUpdate.find(recipe => recipe.id == openedRecipe);

        recipeToUpdate.ingredients = recipeToUpdate.ingredients.filter((ingredient, indx) => {
            return indx != index;
        })

        setRecipe(recipesToUpdate)
    }

    const addIngredientHandler = () => {
        const recipesToUpdate = [...recipes];
        const recipeToUpdate = recipesToUpdate.find(recipe => recipe.id == openedRecipe);

        recipeToUpdate.ingredients = [...recipeToUpdate.ingredients, { name: "", amount: "" }]

        setRecipe(recipesToUpdate)
    }

    const addRecipeImageHanlder = (src, index) => {
        const recipesToUpdate = [...recipes];
        const recipeToUpdate = recipesToUpdate.find(recipe => recipe.id == openedRecipe);

        recipeToUpdate.imgs = [...recipeToUpdate.imgs, { src, index }];

        setRecipe(recipesToUpdate);
    }

    const removeRecipeImageHandler = (index, recipeId) => {
        const recipesToUpdate = [...recipes];
        const recipeToUpdate = recipesToUpdate.find(recipe => recipe.id == recipeId);

        recipeToUpdate.imgs = recipeToUpdate.imgs.filter(img => img.index != index);

        setRecipe(recipesToUpdate);
    }

    const handlePageChange = (e, v) => {
        setPage(v);
    }

    return (
        <ThemeProvider theme={theme}>
            <div className="app-wrapper">
                <RcipesSection
                    recipes={recipes}
                    limit={limit}
                    page={page}
                    pageChange={handlePageChange}
                    deleteRecipe={deleteRecipeHandler}
                    editRecipeOpen={editRecipeOpenHandler}
                    deleteRecipeImage={removeRecipeImageHandler}
                />
                {isEditRecipeOpen ?
                    <RecipeEditForm
                        recipe={recipes.find(recipe => recipe.id == openedRecipe)}
                        changeRecipe={changeRecipeHandler}
                        closeEdit={closeRecipeEditHandler}
                        deleteIngredient={deleteIngredientHandler}
                        addIngredient={addIngredientHandler}
                        addRecipeImage={addRecipeImageHanlder}
                        removeRecipeImage={removeRecipeImageHandler}
                    /> : null /* Because of grid columns */}

                {/* Add Recipe Button */}
                <LightTooltip title="Add Recipe" placement="right">
                    <Fab
                        onClick={addNewRecipeHandler} className="recipe__add__button"
                        disabled={isEditRecipeOpen ? true : false} color="primary">
                        <Add />
                    </Fab>
                </LightTooltip>
            </div>
        </ThemeProvider>
    )
}