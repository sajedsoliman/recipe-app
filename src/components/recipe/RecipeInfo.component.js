import React, { useState } from 'react'

// Components imports
import RecipeIngredient from './RecipeIngredient.component'
import ImageFullScreen from './ImageFullScreen.component'
import RecipeImage from './RecipeImage.component'

// Materia-ui Imports
import { Fade, Slide, Typography, Zoom } from '@material-ui/core'

export default function RecipeInfo({ id, cooktime, servings, steps, ingredients, images, deleteRecipeImage }) {
    const [isImageFullScreen, setImageFullScreen] = useState(false);
    const [openedImage, setOpenedImage] = useState("");
    const [checked, setChecked] = useState(false)

    // Image Full Screen Handling
    function imageFullScreenHanlder(imgSrc) {
        setChecked(!checked);
        setOpenedImage(imgSrc);
    }
    function closeImageFullScreenHanlder() {
        setChecked(false);
    }

    return (
        <ul className="recipe__info">
            <li>Cooktime: <span>{cooktime}</span></li>
            <li>Servings: <span>{servings}</span></li>
            <li>Steps:
                    <ol className="steps">
                    {steps.map((step, index) => <li key={index}>{step}</li>)}
                </ol>
            </li>
            <li>Ingredients:
                <ol className="ingredients">
                    {ingredients.map(ingredient =>
                        <RecipeIngredient key={ingredient.name} name={ingredient.name} amount={ingredient.amount} />)}
                </ol>
            </li>
            <li>Images:
                    <ul className="recipe__images">
                    {images.map(image =>
                        <RecipeImage key={`${image.index}-${id}`} image={image} id={id} imageFullScreenHanlder={imageFullScreenHanlder} deleteRecipeImage={deleteRecipeImage} />)}

                    <Fade in={checked} timeout={{ appear: 100, enter: 400, exit: 500 }} >
                        <div className="recipe__image__fullscreen-container">
                            <Typography color="primary" variant="button" className="warn">CLick Again To Exit</Typography>
                            <div className="recipe__image__fullscreen" style={{ backgroundImage: `url(${openedImage})` }} onClick={() => closeImageFullScreenHanlder()} ></div>
                        </div>
                    </Fade>
                </ul>
            </li>
        </ul>
    )
}
