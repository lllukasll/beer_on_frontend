import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import "./LoginPage.css";

import { userActions } from '../../actions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({[name]: value});
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if(username && password) {
            dispatch(userActions.login(username, password));
        }
    }

    render() {
        const { alert } = this.props;
        const { loggingIn, error } = this.props;
        const { username, password, submitted } = this.state;

        return (
        <div class="container container-login d-flex justify-content-center p-4">
            <div class="mt-3 text-center">
                <h1 class="display-4 mb-3">Witaj na stronie Beer-On</h1>      
                <form class="mt-5" onSubmit={this.handleSubmit}>
                    <div class="form-group d-flex justify-content-center">
                        <label for="login">Login:</label>
                        <input class="form-control ml-3" type="text" id="login" placeholder="Twój login" name="username" value={username} onChange={this.handleChange}/>
                    </div>
                    <div class="form-group d-flex justify-content-center">
                        <label for="login">Hasło:</label>
                        <input class="form-control ml-3" type="text" id="password" placeholder="Twoje hasło" name="password" value={password} onChange={this.handleChange}/>
                    </div>
                        <label>
                            Nie pamiętam hasła.
                        </label> 

                <button type="submit" class="btn btn-outline-warning w-25 btn-lg mt-3 mb-5">Zaloguj</button>
                {loggingIn &&
                    <img alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                }

                {error &&
                    <div style={{marginTop: '10px'}} className={`alert alert-danger`}>{error}</div>
                }
                <h2>Nie masz jeszcze konta?</h2>
                <Link to="/register" class="btn btn-outline-warning w-25 btn-lg mt-3">Załóż konto</Link>
                </form>
            </div>    
        </div>
        
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn, error } = state.authentication;
    const { alert } = state;

    return {
        loggingIn, error ,
        alert
    };
}


const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };
