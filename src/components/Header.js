import logo from '../logo.svg'; 
import React from 'react';
import {Switch, Route, Link} from "react-router-dom"
function Header(props) {
    return(
    <header className="header">
    <img src={logo} alt="логотип в шапке" className="header__logo"/>
    <nav className='header__nav'>
    <Switch>
    <Route exact path="/">
        <p className='header__link_email'>{props.email}</p>
        <Link to="sign-up" className='header__link' onClick={props.handleSignOut} >Выйти</Link>
    </Route>
    <Route exact path="/sign-in">
        <Link to="sign-up" className='header__link'>Регистрация</Link>
    </Route>
    <Route exact path="/sign-up">
        <Link to="sign-in" className='header__link'>Войти</Link>
    </Route>
    </Switch>

    </nav>
    </header>
    )
}

export default Header

