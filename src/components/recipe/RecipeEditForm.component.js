import React, { useEffect, useRef } from 'react'

import BetterScroll from 'better-scroll'

// Components Imports
import IngredientEdit from './IngredientEdit.component';

// Material-ui imports
import { Button, TextField, Grid } from '@material-ui/core'
import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';

// FilePond Imports
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginFileEncode, FilePondPluginImageCrop);

const mimiTypes = ["image/png", "image/jpeg", "image/gif"];
export default function RecipeEditForm({ changeRecipe, closeEdit, deleteIngredient, addIngredient, addRecipeImage, removeRecipeImage, recipe }) {

    const filePondRef = useRef();

    function getImageSrc(img) {
        const encodedImage = img.getFileEncodeBase64String();
        const imageType = img.fileType;
        if (encodedImage != null && mimiTypes.includes(imageType)) {
            const imageBuffer = new Buffer.from(encodedImage, "base64");
            const finalRes = `data:${imageType};charset=utf-8;base64,${imageBuffer.toString("base64")}`;
            addRecipeImage(finalRes, recipe.imgs.length);
            filePondRef.current.removeFiles();
        }
    }

    const { title, cooktime, servings, steps, ingredients } = recipe;

    return (
        <form className="recipe__edit__form">
            <HighlightOffOutlinedIcon className="recipe__close__button" onClick={() => closeEdit()} color="error" />
            <Grid container spacing={2} style={{ marginBottom: "10px" }}>
                <Grid item xs={12} md={6}>
                    <TextField
                        type="text" label="Title"
                        variant="outlined" size="small"
                        fullWidth={true} onChange={(e) => changeRecipe(e, "title")} value={title} />
                </Grid>
                <Grid item xs md={3}>
                    <TextField
                        type="text" label="Cooktime"
                        variant="outlined" size="small"
                        onChange={(e) => changeRecipe(e, "cooktime")} value={cooktime} />
                </Grid>
                <Grid item xs md={2}>
                    <TextField
                        type="number" inputProps={{ min: 1 }} label="Servings"
                        variant="outlined" size="small"
                        onChange={(e) => changeRecipe(e, "servings")} value={servings} />
                </Grid>
            </Grid>
            <Grid container spacing={5} className="edit__section">
                <Grid item xs={6}>
                    <TextField
                        multiline value={steps.join("\n")} fullWidth={true}
                        onChange={(e) => changeRecipe(e, "steps")} placeholder="Steps"
                        rows={5} className='recipe__textarea' id="recipe__textarea" />
                </Grid>
                <Grid item xs={6}>
                    <label className='recipe__image-title'>Upload Image</label>
                    <FilePond
                        ref={filePondRef} allowFileEncode={true}
                        allowMultiple={false} onaddfile={(err, file) => getImageSrc(file)}
                    />
                </Grid>
            </Grid>

            <label className='recipe__ingredients-title'>Ingredients</label>
            <div className="recipe__ingredients__editing">
                {
                    ingredients.map(({ name, amount }, index) =>
                        <IngredientEdit
                            name={name}
                            amount={amount}
                            index={index}
                            changeRecipe={changeRecipe}
                            deleteIngredient={deleteIngredient}
                        />)}

                {/* Add ingredient button */}
                <Button endIcon={<AddCircleSharpIcon />}
                    className="ingredient__add"
                    variant="contained"
                    color="primary"
                    onClick={() => addIngredient()}>
                    Add Ingredient
                </Button>
            </div>
        </form>
    )
}
