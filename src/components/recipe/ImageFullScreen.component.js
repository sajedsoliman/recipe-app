import React, { useEffect } from "react";

export default function ImageFullScreen({ image, closeFullScreen }) {
	return (
		<div className="recipe__image__fullscreen-container">
			<div className="recipe__image__fullscreen" style={{ backgroundImage: `url(${image})` }}></div>
			<button className="recipe__image__fullscreen-close" onClick={() => closeFullScreen()}>
				x
			</button>
		</div>
	);
}
