import React from "react";
import PopupWithForm from "./PopupWithForm";
import currentUserContext from "../contexts/CurrentUserContext";


function AddPlacePopup(props){
    const[cardName, setCardName] = React.useState("");
    const[cardLink, setCardLink] = React.useState("");

    React.useEffect(()=> {
        setCardName("");
        setCardLink("");
    },[props.isOpen])

    function handleCardName(e){
        setCardName(e.target.value)
    }

    function handleCardLink(e){
        setCardLink(e.target.value)
    }

    function handleSubmit(event) {
        // Запрещаем браузеру переходить по адресу формы (перезагружать страницу)
        event.preventDefault();
      
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onAddPlace({
          name: cardName,
          link: cardLink,
        });
      }

    return(   
    <PopupWithForm
        name="add-card"
        title="Новое место"
        butonText="Создать"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
        >
           <input 
           name="title" 
           id="cardName-input" 
           type="text" 
           placeholder="Название" 
           className="popup__input popup__input_field_card-name" 
           required minLength="2" 
           maxLength="30"
           value={`${cardName}`}
           onChange={handleCardName}
           />
           <span className="popup__error" id="cardName-input-error"></span>
           <input 
           name="link" 
           type="url" 
           id="cardLink-input" 
           placeholder="Ссылка на картинку" 
           className="popup__input popup__input_field_card-link" 
           required
           value={`${cardLink}`}
           onChange={handleCardLink}
           />
           <span className="popup__error" id="cardLink-input-error"></span>
       </PopupWithForm>)
}


export default AddPlacePopup