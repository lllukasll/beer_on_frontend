import React from 'react';
import { Link } from 'react-router-dom';

class SideBar extends React.Component {
  render() {
    return(
      <div class="sidebar text-center ">
            <Link to='/beers'style={{display: 'block'}} class="btn btn-outline-warning sidebar-content">Katalog piw</Link>
            <Link to='/about'style={{display: 'block'}} class="btn btn-outline-warning sidebar-content">O nas</Link>
            <Link to='/contact'style={{display: 'block'}} class="btn btn-outline-warning sidebar-content">Kontakt</Link>
    </div>
    );
  }
}

export default SideBar;
