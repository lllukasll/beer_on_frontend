import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './NavigationBar.css';
import {LoggedInContent} from './loggedInContent/LoggedInContent';
import GuestContent from './guestContent/GuestContent';

class NavigationBar extends React.Component {

  render() {
    const { loggedIn } = this.props;

    return(
      <div>
        <nav class="navbar navbar-expand-md">
                { loggedIn ? <LoggedInContent /> : <GuestContent />}
        </nav>
      </div>
    );
  }
}


function mapStateToProps(state) {
    const { loggedIn} = state.authentication;
    return {
        loggedIn,
    };
}

const connectedNavigationBar = connect(mapStateToProps)(NavigationBar);
export { connectedNavigationBar as NavigationBar };
