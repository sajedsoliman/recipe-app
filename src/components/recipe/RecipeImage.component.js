import React from 'react'

import { Box, IconButton, Zoom } from '@material-ui/core'
import { Delete, Fullscreen } from '@material-ui/icons'

export default function RecipeImage({ image, imageFullScreenHanlder, id, deleteRecipeImage }) {

    const { src, index } = image;

    return (
        <div className="recipe__image">
            <div className="overlay">
                <Box component="div" margin="0px" padding="0px">
                    <IconButton className="recipe__remove-image" onClick={() => deleteRecipeImage(index, id)}>
                        <Delete />
                    </IconButton>
                    <IconButton className="recipe__remove-image" onClick={() => imageFullScreenHanlder(src)}>
                        <Fullscreen />
                    </IconButton>
                </Box>
            </div>
            <img src={src} style={{ backgroundImage: `url(${src})` }} />
        </div >
    )
}
