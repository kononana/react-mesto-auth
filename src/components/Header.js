import logo from '../logo.svg'; 
import React from 'react';
import {Switch, Route, Link} from "react-router-dom"
function Header(props) {
    return(
    <header className="header">
    <img src={logo} alt="логотип в шапке" className="header__logo"/>
    <nav className='header__nav'>
    <Switch>
    <Route exact path="/cards">
        <p className='header__link_email'>{props.email}</p>
        <Link to="signin" className='header__link' onClick={props.handleSignOut} >Выйти</Link>
    </Route>
    <Route exact path="/signin">
        <p>{props.email}</p>
        <Link to="signup" className='header__link'>Регистрация</Link>
    </Route>
    <Route exact path="/signup">
        <p>{props.email}</p>
        <Link to="signin" className='header__link'>Войти</Link>
    </Route>
    </Switch>

    </nav>
    </header>
    )
}

export default Header