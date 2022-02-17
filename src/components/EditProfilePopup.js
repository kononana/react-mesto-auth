import React, { useState, useEffect }  from "react";
import PopupWithForm from "./PopupWithForm";
import currentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    const currentUser = React.useContext(currentUserContext)
    // После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
   
    useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]); 

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleChangeName(e) {
      setName(e.target.value)
  }
  
  function handleDescription(e) {
      setDescription(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

return ( 
<PopupWithForm
    name="edit-profile"
    title="Редактировать профиль"
    butonText="Сохранить"
    isOpen={props.isOpen}
    onClose={props.onClose}
    onSubmit={handleSubmit}
    >
        <input 
        name="name" 
        type="text" 
        id="name-input" 
        placeholder="Имя" 
        className="popup__input popup__input_field_name" 
        required minLength="2" 
        maxLength="40"
        value={`${name}`} 
        onChange={handleChangeName}
        />
        <span className="popup__error" id="name-input-error"></span>
        <input 
        name="about" 
        type="text" 
        id="job-input" 
        placeholder="род деятельности" 
        className="popup__input popup__input_field_job" 
        required minLength="2" 
        maxLength="200"
        value={`${description}`} 
        onChange={handleDescription}
        />
        <span className="popup__error" id="job-input-error"></span>
  </PopupWithForm>)
}

export default EditProfilePopup