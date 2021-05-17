import React, { useEffect, useState } from "react";

// Material imports
import { Button, ButtonGroup } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";

// Components imports
import RecipeInfo from "./RecipeInfo.component";

export default function Recipe({
	id,
	title,
	cooktime,
	servings,
	steps,
	ingredients,
	images,
	deleteRecipe,
	editRecipeOpen,
	deleteRecipeImage,
}) {
	return (
		<div className="recipe-wrapper">
			<div className="recipe__controls">
				<ButtonGroup size="small">
					<Button
						startIcon={<DeleteIcon />}
						variant="contained"
						color="secondary"
						onClick={() => deleteRecipe(id)}
						className="recipe__delete__button"
					>
						Delete
					</Button>
					<Button
						startIcon={<EditIcon />}
						variant="contained"
						color="primary"
						onClick={() => editRecipeOpen(id)}
					>
						Edit
					</Button>
				</ButtonGroup>
			</div>
			<h2 className="recipe__title">{title}</h2>
			{/* Recipe Info */}
			<RecipeInfo
				id={id}
				deleteRecipeImage={deleteRecipeImage}
				cooktime={cooktime}
				servings={servings}
				steps={steps}
				ingredients={ingredients}
				images={images}
			/>
		</div>
	);
}
