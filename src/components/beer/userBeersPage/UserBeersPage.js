import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { config } from '../../../helpers';
import { beerActions } from '../../../actions';

import SideBar from '../../common/sidebar/SideBar.js';
import './UserBeersPage.css';

class BeersListPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true
        }
    }

    componentDidMount(){
        this.setState({isLoading : true})
        this.props.dispatch(beerActions.getBeersAddedByUser());
        this.setState({isLoading : false})
    }

    render() {
        const { beer } = this.props;

        if(this.state.isLoading) {
            return (
                <img alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            );
        }

        return (
            <div class="container-fluid mt-3">
                <div class="row">
                    <SideBar />
                    <div class="content col-md-10 mx-auto text-center">  
                        <h1 class="display-3 mt-3 header">Dodane piwa</h1>
                        <hr class="line-user-beer" />

                        <div class="dodane-user-beer text-left">
                            <h3 class="ml-4 subheader display-4">Dodane</h3>
                                {!beer || beer.loadingUserBeers ? 
                                (<div>
                                    <img alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                </div>) 
                                :(<div class="row">
                                    {beer.userBeers.map((userBeer, index) => 
                                    <div class="col col-md-3">
                                        <div class="card">
                                            <img src={config.apiUrl + "/api/photo/" + userBeer.avatarUrl} class="card-img-top" />
                                            <div class="card-body d-flex flex-column">
                                                <button type="button" class="btn btn-dark " aria-label="Left Align">
                                                    <span class="glyphicon glyphicon-align-left" aria-hidden="true">Nazwa: {userBeer.name}</span>
                                                </button>
                                                <button type="button" class="btn btn-dark " aria-label="Left Align">
                                                    <span class="glyphicon glyphicon-align-left" aria-hidden="true">Browar: {userBeer.brewery.name}</span>
                                                </button>
                                                <button type="button" class="btn btn-dark " aria-label="Left Align">
                                                    <span class="glyphicon glyphicon-align-left" aria-hidden="true">Data dodania: 01.12.2015</span>
                                                </button>
                                                <Link to={"/beer/" + userBeer.id} class="btn btn-outline-warning w-50">Pokaż więcej</Link>
                                                </div>
                                        </div>
                                    </div>
                                    )}
                                </div>)}
                        </div>
                        <hr class="line" />
                        <div class="oczekujace text-left">
                            <h3 class="ml-4 subheader display-4">Oczekujace na akceptację</h3>
                            <div class="row">

                            </div>
                        </div>
                        <hr class="line" />
                        <div class="odrzucone text-left">
                            <h3 class="ml-4 subheader display-4">Odrzucone</h3>
                            <div class="row">

                            </div>
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

export default connect(mapStateToProps)(BeersListPage);