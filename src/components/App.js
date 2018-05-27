import React from 'react';

import { HomePage } from '../components/homePage/HomePage.js';
import { LoginPage } from '../components/loginPage/LoginPage.js';
import { RegisterPage } from '../components/registerPage/RegisterPage.js';
import { NavigationBar } from '../components/common/navigationBar/NavigationBar.js';
import BeersListPage from '../components/beer/beersListPage/BeersListPage.js';
import BeerPage from '../components/beer/beerPage/BeerPage.js';
import ConfirmEmailPage from '../components/confirmEmailPage/ConfirmEmail.js';
import CreateBeerPage from '../components/beer/createBeerPage/CreateBeerPage.js';
import AboutUsPage from '../components/aboutUsPage/AboutUsPage.js';
import ContactPage from '../components/contactPage/ContactPage.js';
import UserBeersPage from '../components/beer/userBeersPage/UserBeersPage.js';
import UserProfilePage from '../components/userProfilePage/UserProfilePage.js';

import {history} from '../helpers'
import {Router, Route} from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div>
          <Router history={history}>
            <div>
                <NavigationBar />
                <div>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <Route path="/confirmEmail" component={ConfirmEmailPage} />
                    <Route path="/createBeer" component={CreateBeerPage} />
                    <Route path="/beers" component={BeersListPage} />
                    <Route path="/beer/:id" component={BeerPage} />
                    <Route path="/contact" component={ContactPage} />
                    <Route path="/about" component={AboutUsPage} />
                    <Route path="/user/:id" component={UserProfilePage} />
                    <Route path="/userBeers" component={UserBeersPage} />
                </div>
            </div>
          </Router>
      </div>
    );
  }
}

export default App;
