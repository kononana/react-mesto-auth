import React from "react";
import successLogin from '../images/union.svg'
import failLogin from '../images/fail.svg'

function InfoTooltip(props) {
    return (
        <div className={`popup popup_type_tooltip ${props.isOpen ? "popup_opened": ""}`}>
            <div className="popup__container">
            <button type="button" className="popup__close" aria-label="сlose" onClick={props.onClose}></button>
            <img className="popup__image_tooltip"
            src ={props.success ? successLogin : failLogin} 
            alt ={props.success ?'успех': 'провал'}/>
            <h2 className="popup__title_tooltip">{props.success ? "Вы успешно зарегистрировались!": "Что-то пошло не так! Попробуйте ещё раз."}</h2>
            
            </div>
    </div>

    )

}

export default InfoTooltip