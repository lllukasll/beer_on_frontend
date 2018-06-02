import React from 'react';
import { connect } from 'react-redux';
import { config } from '../../../helpers';
import { beerActions } from '../../../actions';

import AddComment from './AddComment.js';
import CommentsList from './CommentsList.js';
import Rating from './Rating.js';
import AddRating from './AddRating.js';
import SideBar from '../../common/sidebar/SideBar.js';
import { NavigationBar } from '../../common/navigationBar/NavigationBar.js';
import "./BeerPage.css";

class BeerPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading : true,
            admin: false
        }
    }

    componentDidMount(){
        this.setState({isLoading: true})
        this.props.dispatch(beerActions.getOne(this.props.id))
        this.setState({isLoading: false})
    }

    render() {
        const { beer, loggedUser } = this.props;

        if(this.state.isLoading) {
            return (
                <img alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            );
        }

        if(loggedUser && loggedUser.userIsAdmin && this.state.admin == false)
        {
            this.setState({admin: loggedUser.userIsAdmin})
        }

        return (
            <div>
            <NavigationBar />
            <div class="container-fluid mt-3">
            <div class="row">
                <SideBar />
                <div class="content col-md-10 mx-auto text-center">
                    {!beer || beer.loadingBeer ? 
                    (<div>
                        <img alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    </div>) 
                    : (<div class="container-fluid karta" href="#slider">
                        <div class="row">
                            <div class="col-md-3 mt-5 text-left">
                                <img src={config.apiUrl + "/api/photo/" + beer.beer.avatarUrl} class="beer" />
                                <div class="info mt-4">
                                    <label>Dodano przez:</label>
                                    <label class="ml-3">Jan Kowalski</label>
                                    <br />
                                    <label>Data dodania:</label>
                                    <label class="ml-3">01.01.2018</label>
                                    <br />
                                    <a href=""><button class="btn btn-outline-warning mt-3">Sprawdź dostępność</button></a>
                                    <div>{this.state.admin && <button class="btn btn-outline-warning mt-3">Edytuj grupę</button>}</div>
                                </div>  
                            </div>
                            <div class="col-md-6 mt-5 text-left">
                                <h1 class="mb-3 display-4 header">{beer.beer.name}</h1>
                                <button type="button" class="btn btn-light" aria-label="Left Align">
                                        <span class="glyphicon glyphicon-align-left" aria-hidden="true">{beer.beer.brewery && beer.beer.brewery.name}</span>
                                </button>
                                <button type="button" class="btn btn-light mx-2" aria-label="Left Align">
                                        <span class="glyphicon glyphicon-align-left" aria-hidden="true">{beer.beer.beerType && beer.beer.beerType.name}</span>
                                </button>
                                <button type="button" class="btn btn-light" aria-label="Left Align">
                                        <span class="glyphicon glyphicon-align-left" aria-hidden="true">{beer.beer.percentage}</span>
                                </button>
                                <p class="mt-4 opis">{beer.beer.description}</p>
                                
                                <AddComment beerId={this.props.id}/>
                                <CommentsList beerId={this.props.id}/>
                            </div>
                            <div class="col-md-3 mt-5">
                                <Rating beerId={this.props.id}/>
                                <AddRating beerId={this.props.id}/>
                            </div>

                        </div>
                    </div>)}
                        
                </div>
            </div>
        </div>
        </div>
        );
    }
}


function mapStateToProps(state, ownProps) {
    const { beer, loggedUser } = state;
    return {
        beer,
        loggedUser,
        id: ownProps.match.params.id
    };
}

export default connect(mapStateToProps)(BeerPage);