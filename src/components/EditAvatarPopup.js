import React from "react";

import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const avRef = React.useRef();
    React.useEffect(() => {
        avRef.current.value = ""
      }, [props.isOpen])
    
      function handleSubmit(e) {
        
        e.preventDefault();
    
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateAvatar({
          avatar: avRef.current.value // вызываем нужный метод на поле current объекта
        })
      }

      return(   
      <PopupWithForm
        name="type-avatar"
        title="Обновить аватар"
        butonText="Сохранить"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
       >
           <input 
           type="url" 
           id="avatar-link" 
           name="avatar" 
           placeholder="Ссылка на аватар" 
           className="popup__input" 
           required
           ref = {avRef} // для получение доступа к DOM-элементу
           />
           <span id="avatar-link-error" className="popup__error"></span>
        </PopupWithForm>)
}

export default EditAvatarPopup

