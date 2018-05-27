import React from 'react';
import { connect } from 'react-redux';

import SideBar from '../common/sidebar/SideBar.js';
import CarouselItem from './CarouselItem.js';

import { beerActions } from '../../actions';

import './HomePage.css';

class HomePage extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      isLoading: true,
      active: 'active'
    }

    this.setActiveToEmpty = this.setActiveToEmpty.bind(this);

  }

  componentDidMount(){
    this.setState({isLoading: true});
    this.props.dispatch(beerActions.getBest());
    this.setState({isLoading: false});
  }

  setActiveToEmpty()
  {
    var tmp = this.state.active;

    if(this.state.active === 'active')
    {
      this.setState({
        active: ''
      })
    }

    return tmp;

  }

  render() {
    const { beer } = this.props;

    if(this.state.isLoading)
    {
      return (
        <div>
          <img alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
        </div>
      );
    }

       return (
        <div class="container-fluid mt-3">
          <div class="row">
            <SideBar />
              <div class="content col-md-10 mx-auto text-center">
                <h1 class="display-4 my-4">Najlepiej oceniane</h1>
                <div id="slider" class="carousel slide mt-5" data-ride="carousel">
                  <div class="carousel-inner">
                    {!beer || beer.loadingBestBeers ? 
                    (<div>
                      <img alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    </div>) : 
                    (<div>
                      {beer.bestBeers.map((beer, index) => { 
                        if(index === 0 )
                        {
                          return <CarouselItem beer={beer} active={'active'} />
                        }else{
                          return <CarouselItem beer={beer} active={''} />
                        }
                      })}
                    </div>)}
                  </div>
                  <a href="#slider" class="carousel-control-prev" role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon"></span>
                            <span class="sr-only">Poprzedni</span>
                        </a>
                  <a href="#slider" class="carousel-control-next" role="button" data-slide="next">
                      <span class="carousel-control-next-icon"></span>
                      <span class="sr-only">Nastpęny</span>
                  </a>
                </div>
              </div>
          </div>
        </div>
     );
   }
}

function mapStateToProps(state) {
  const { beer } = state;
    return {
      beer
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
