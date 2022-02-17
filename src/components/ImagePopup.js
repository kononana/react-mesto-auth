import React from "react";
function ImagePopup(props){
    return(
    <div className={`popup popup_show_image" ${props.card.link ? "popup_opened": ""}`}>
        <figure className="popup__container popup__show-container">
        <button type="button" className="popup__close" aria-label="сlose" onClick={props.onClose}></button>
        <img className="popup__image" src={props.card.link} alt={props.card.name}/> 
         <h3 className="popup__image-title">{props.card.name}</h3>
    </figure>
    </div>
    )
}

export default ImagePopup