import React, { useState } from "react";
import { Switch, Route} from "react-router-dom";

function SignForm(props){
    const [values, setValues] = useState({})

    function handleChange(evt) {
       const{name, value} = evt.target
       setValues({...values, [name]: value})
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onSubmit ({email: values.email, password: values.password})
    }
    return (
        <div className="registration">
            <h2 className="registration__title">{props.title}</h2>
            <form className="registration__form" name={`${props.name}`} onSubmit={handleSubmit}>
                <input 
                    name="email"
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="registration__input" 
                    required
                    minLength="2"
                    maxLength="40"
                    onChange={handleChange} 
                    value={values.email}/>
                <input 
                    name="password"
                    type="password"
                    id="password"
                    placeholder="Пароль"
                    className="registration__input" 
                    required
                    minLength="2"
                    maxLength="40"
                    onChange={handleChange} 
                    value={values.password}/>

                    <button type="submit"
                    className="registration__button">{props.buttonText}
                    </button>
                    <Switch>
                <Route exact path="/signup">
                    <p className="registration__notes">Уже зарегистрированы? Войти</p>
           
                </Route>
            </Switch>
            </form>
           
        </div>
    )

    }


export default SignForm