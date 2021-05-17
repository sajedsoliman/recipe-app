import React from 'react'

// Material-ui imports
import { Button, IconButton, TextField, Grid } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

export default function IngredientEdit({ name, amount, index, changeRecipe, deleteIngredient }) {
    return (
        <Grid container spacing={3} className="ingredients__container">
            <Grid item xs={5}>
                <TextField
                    type='text' value={name} className="ingredient__input" fullWidth={true}
                    onChange={(e) => changeRecipe(e, "ingredients", index)}
                    id="ingredient-name" placeholder="Name" />
            </Grid>
            <Grid item xs={5}>
                <TextField
                    type='text' value={amount} className="ingredient__input" fullWidth={true}
                    onChange={(e) => changeRecipe(e, "ingredients", index)}
                    id="ingredient-amount" placeholder="Amount" />
            </Grid>
            <IconButton className="ingredient__icon" color="secondary" aria-label="delete" onClick={() => deleteIngredient(index)}>
                <DeleteIcon />
            </IconButton>
        </Grid>
    )
}
