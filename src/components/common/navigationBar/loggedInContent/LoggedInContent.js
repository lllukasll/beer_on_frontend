import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { userActions } from '../../../../actions';

class LoggedInContent extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true
    };

  }

  componentDidMount() {
    this.setState({isLoading: true});
    this.props.dispatch(userActions.getLoggedUser());
    this.setState({isLoading:false});
  }


  render() {
    const { loggedUser } = this.props;

    if(this.state.isLoading)
    {
      return(
        <img alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
      );
    }

    return (

      <div class="container-fluid">
        <Link to="/" class="navbar-brand">LOGO</Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent">
                <span class="navbar-toggler-icon"></span>
        </button>
            <Link to="/createBeer" class="btn btn-outline-warning ml-5 dodaj">Dodaj piwo</Link>        
        <form action="#" class="form-inline mx-auto">
                <input type="text" class="form-control mr-3" placeholder="Wyszukaj..." />
                <button type="button" class="btn btn-outline-warning">Szukaj</button>
        </form> 

        
        <div>
            <div class="dropdown mt-2 ml-4">
                <button type="button" class="btn btn-outline-warning dropdown-toggle" data-toggle="dropdown">Moje konto</button>
                <div class="dropdown-menu">
                    {!loggedUser || loggedUser.loading || !loggedUser.loadedUser ? (<div></div>) : (<Link to={"/user/" + loggedUser.loggedUserData.id} class="dropdown-item">Edytuj profil</Link>)}
                    <Link to="/userBeers" class="dropdown-item">Dodane piwa</Link>
                    <Link to="/login" class="dropdown-item">Wyloguj</Link>
                </div>
            </div>
            {!loggedUser || loggedUser.loading || !loggedUser.loadedUser ? (<div></div>) : (<label class="mt-2 textWitaj">Witaj, {loggedUser.loggedUserData.name}</label>)}
            
        </div>
        <img src="images/logo.jpg" class="img-thumbnail rounded avatar ml-3" />
        
      </div>
    );
  }
}

function mapStateToProps(state) {
    const { loggedUser } = state;
    return {
        loggedUser,
    };
}

const connectedLoggedInContent = connect(mapStateToProps)(LoggedInContent);
export { connectedLoggedInContent as LoggedInContent };
