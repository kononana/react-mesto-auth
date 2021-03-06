import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = ({onRegister}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

   

    const handleEmail= (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const handleSubmit = (e) =>  {
        e.preventDefault();
       onRegister(email, password);
    }
   

    return (
        <form name="login" className="registration" onSubmit={handleSubmit}>
            <h2 className="registration__title">Регистрация</h2>
            <input name="email" id="email" type="email" value={email} onChange={handleEmail} className='registration__input' placeholder="Email" required />
            <input name="password" id="password" type="password" minLength="5" value={password} onChange={handlePassword} className='registration__input' placeholder="Пароль" required />
            <button type='submit' className='registration__button'>Зарегистрироваться</button>
            <p className="registration__notes">Уже зарегистрированы? <Link to={"/sign-in"} className="registration__notes">Войти</Link></p>
        </form>
    );
}

export default Register;