import React, { useState, useEffect } from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import currentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import {Route, Switch, useHistory, Redirect} from "react-router-dom";
import Login from "./Login.js";
import Register from "./Register.js";
import ProtectedRoute from "./ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip.js";
import { login, register, tokenCheck } from '../utils/auth';

function App() {
    const[isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
    const[isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const[isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const[selectedCard, setSelectedCard] = useState({name:'', link:''})
    const [currentUser, setCurrentUSer] = useState({});
    const [cards, setCards] = useState([])
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false)
    const [email, setEmail] = useState('');
    const history = useHistory();
    const [success, setSuccess] = useState(false);
  

  useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setCurrentUSer(data)
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`)
    })
    api.getInitialCards()
        .then((cards) => {
                setCards(cards);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
  
  function handleEditProfileClick(){
    setIsEditProfilePopupOpen(true)
  }
  function handleAddPlaceClick(){
    setIsAddPlacePopupOpen(true)
  }
  function handleEditAvatarClick(){
    setIsEditAvatarPopupOpen(true)
  }
  function closeAllPopups(){
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsInfoTooltipOpen(false);
    setSelectedCard({name:'', link:''})
  }
  
  function handleCardClick(card){
    setSelectedCard(card)
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      const newCards = cards.filter((e) => e._id !== card._id)
      setCards(newCards);
    })
    .catch((err) => {
      console.log(err);
  })
  }

  function handleUpdateUser(user){
    api.changeUserInfo(user)
    .then((user) => {
      setCurrentUSer(user);
      closeAllPopups()
    })
    .catch((error) => {
      console.log(error)
    })
  }

  function handleUpdateAvatar(data) {
    api.changeUserAvatar(data)
      .then((data) => {
        setCurrentUSer(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }
  function handleAddPlaceSubmit(newCard) {
    api.addCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }


  function handleCardLike(card) {
    // проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
}

// Вход в систему  
const handleLogin = _ => {
  setLoggedIn(true);
  history.push("/cards");
}

// Выход из системы  
const handleSignOut = () => {
  localStorage.removeItem('token');
  setEmail('');
  setLoggedIn(false);
}

// проверка  токена
useEffect(()=>{
  checkToken();
},[]);


const infoToolTipOpen = (type) => {
  setSuccess(type);
  setIsInfoTooltipOpen(true);
}

// запрос на авторизацию
const onLogin = (email, password) => {
  login(email, password)   
      .then((data) => {
          if (data.token) {
              localStorage.setItem('token', data.token);
              handleLogin();
              setEmail(email);
          }
      })  
      .catch(err => {
          console.log(err);
          infoToolTipOpen(false);
      });
};

// Запрос на регистрацию
const onRegister = (email, password) => {
  register(email, password)
  .then((res) => {
      if (res.data._id) {
          infoToolTipOpen(true);
          history.push('/signin');
      }                   
  })
  .catch((err) => {
      console.log(err)
      infoToolTipOpen(false);
  });
};

// Проверка токена  
const checkToken = () => {
  if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      tokenCheck(token)
      .then(res => {
          if (res.data.email) {
              setEmail(res.data.email);
              handleLogin();
          }
      })
      .catch(err => console.log(err));
  }    
}

    return (
      <currentUserContext.Provider value={currentUser}>
      <div className="page">
      <Header
       email={email} 
       loggedIn={loggedIn}
       handleSignOut={handleSignOut}/>
      <Switch>
        <ProtectedRoute 
                        path="/cards" 
                        loggedIn={loggedIn}  
                        component={Main} 
                        onEditProfile={handleEditProfileClick}
                        onEditAvatar={handleEditAvatarClick}
                        onAddPlace={handleAddPlaceClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                        cards={cards}
                    />
                      
                    <Route path="/signup">
                        <Register                             
                            onRegister={onRegister}
                        />

                    </Route>

                    <Route path="/signin">
                        <Login
                            onLogin={onLogin}
                        />
                    </Route>

                    <Route path="/">
                        {loggedIn ? <Redirect to="/cards" /> : <Redirect to="/signin" />}
                    </Route>
                </Switch> 
      <Footer/>
  
      <EditProfilePopup 
      isOpen={isEditProfilePopupOpen} 
      onClose={closeAllPopups} 
      onUpdateUser={handleUpdateUser}/> 
  
      <EditAvatarPopup 
        isOpen={isEditAvatarPopupOpen} 
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar} 
        /> 
  
      <AddPlacePopup
       isOpen={isAddPlacePopupOpen}
       onClose={closeAllPopups}
       onAddPlace={handleAddPlaceSubmit}
       />
  
      <PopupWithForm
       name="type_delete"
       title="Вы уверены?"
       butonText="Да">
       </PopupWithForm>
  
       <InfoTooltip
                  success={success}
                  isOpen={isInfoTooltipOpen}
                  onClose={closeAllPopups}
              />

       <ImagePopup
       card={selectedCard}
       onClose={closeAllPopups}
       >
       </ImagePopup>
  
      </div>
      </currentUserContext.Provider>
  );
}

export default App;
