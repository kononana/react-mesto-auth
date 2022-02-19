import React, { useState } from 'react';

const Login = ({ onLogin }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const handleSubmit = (e) =>  {
        e.preventDefault();
        onLogin(email, password);
        
    } 

    return (
        <form name="login" className="registration" onSubmit={handleSubmit}>
            <h2 className="registration__title">Вход</h2>
            <input name="email" id="email" type="email" value={email} onChange={handleEmail} className='registration__input' placeholder="Email" required />
            <input name="password" id="password" type="password" minLength="5" value={password} onChange={handlePassword} className='registration__input' placeholder="Пароль" required />
            <button type='submit' className='registration__button'>Войти</button>
        </form>
    );
}

export default Login;