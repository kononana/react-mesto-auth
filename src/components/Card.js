import React from "react";
import currentUserContext from "../contexts/CurrentUserContext";

function Card(props){
    const currentUser = React.useContext(currentUserContext)


    //delete //

    const isOwn = props.card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = isOwn ?
     'element__delete-button element__delete-button_visible'
     : 'element__delete-button element__delete-button_hidden'; 

    //like//
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = `element__like-button ${isLiked ? "element__like-button_active" : "element__like-button"}`; 

    function handleCardClick(){
        props.onCardClick(props.card)
    }

    function handleLikeClick() {
        props.onCardLike(props.card)
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card)
    }

    return (
        <li className="element">
        <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
        <img src={props.card.link} className="element__image" alt={props.card.name} onClick={handleCardClick}/>
        <div className="element__description">
            <h2 className="element__title">{props.card.name}</h2>
            <div className="element__like-section">
                <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                <span className="element__like-counter">{props.card.likes.length}</span>
            </div>
        </div>
    </li>
    )
}

export default Card;
