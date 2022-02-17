import React from "react";
import Card from './Card.js'
import currentUserContext from "../contexts/CurrentUserContext.js";

function Main(props) {
    const currentUser = React.useContext(currentUserContext);
    

    return(
        <main className="main">
        <section className="profile">
            <div className="profile__image">
            <img src={currentUser.avatar} alt="Фотография в профиле" className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }}/>
            <button className='profile__edit-avatar' type="button" onClick={props.onEditAvatar}></button>
        </div>
            <div className="profile__info">
                <h1 className="profile__info-name">{currentUser.name}</h1>
                <button className="button profile__edit-button" type="button" onClick={props.onEditProfile}></button>
                <p className="profile__info-occupation">{currentUser.about}</p>
            </div>
            <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
        </section>
        <section className="elements">
            <ul className="elements__list">
                {props.cards.map((card) => (
                    <Card
                    key={card._id}
                    card={card}
                    link={card.link}
                    name={card.name}
                    onCardClick={props.onCardClick}
                    onCardDelete={props.onCardDelete}
                    onCardLike={props.onCardLike}
                    />
                ))}
            </ul>
        </section>
    </main>
    )
}

export default Main;