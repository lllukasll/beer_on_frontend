import React from 'react';
import { Link } from 'react-router-dom';

class GuestContent extends React.Component {
  render() {
    return (
        <div class="container-fluid">
            <Link to="/" class="navbar-brand">LOGO</Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent">
                    <span class="navbar-toggler-icon"></span>
            </button>
            {/*
                <button type="button" class="btn btn-outline-warning ml-5 dodaj">Dodaj piwo</button>   
            */} 
            <form action="#" class="form-inline mx-auto">
                    <input type="text" class="form-control mr-3" placeholder="Wyszukaj..." />
                    <button type="button" class="btn btn-outline-warning">Szukaj</button>
            </form> 

            {/*
                <div>
                    <div class="dropdown mt-2 ml-4">
                        <button type="button" class="btn btn-outline-warning dropdown-toggle" data-toggle="dropdown">Moje konto</button>
                        <div class="dropdown-menu">
                            <a href="edycjaProfilu.html" class="dropdown-item">Edytuj profil</a>
                            <a href="#" class="dropdown-item">Dodane piwa</a>
                            <a href="index.html" class="dropdown-item">Wyloguj</a>
                        </div>
                    </div>
                    <label class="mt-2 textWitaj">Witaj, Leonardo!</label>
                </div>
                <img src="images/logo.jpg" class="img-thumbnail rounded avatar ml-3" />
            */}
            <Link to="/login" class="btn btn-outline-warning">Zaloguj</Link>
            <Link to="/register" class="btn btn-outline-warning">Zarejestruj</Link>
        </div>
    );
  }
}

export default GuestContent;
