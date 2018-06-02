import React from 'react';
import { connect } from 'react-redux';
import FormValidator from '../../helpers/FormValidator.js';
import { NavigationBar } from '../common/navigationBar/NavigationBar.js';
import { userActions } from '../../actions';

import "./RegisterPage.css";

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

            this.validator = new FormValidator([
            {
                field: 'name',
                method: 'isEmpty',
                validWhen: false,
                message: 'Imię jest wymagane'
            },
            {
                field: 'name',
                method: 'isAlpha',
                args: ['pl-PL'],
                validWhen: true,
                message: 'Niedozwolone znaki'
            },
            {
                field: 'name',
                method: 'isLength',
                args: [{min: 0, max: 50}],
                validWhen: true,
                message: 'Imię jest za długie'
            },
            {
                field: 'surname',
                method: 'isEmpty',
                validWhen: false,
                message: 'Nazwisko jest wymagane'
            },
            {
                field: 'surname',
                method: 'isAlpha',
                args: ['pl-PL'],
                validWhen: true,
                message: 'Niedozwolone znaki'
            },
            {
                field: 'surname',
                method: 'isLength',
                args: [{min: 0, max: 50}],
                validWhen: true,
                message: 'Nazwisko jest za długie'
            },
            {
                field: 'username',
                method: 'isEmpty',
                validWhen: false,
                message: 'Login jest wymagany'
            },
            {
                field: 'username',
                method: 'isLength',
                args: [{min: 0, max: 50}],
                validWhen: true,
                message: 'Login jest za długi'
            },
            {
                field: 'email',
                method: 'isEmpty',
                validWhen: false,
                message: 'Email jest wymagany'
            },
            {
                field: 'email',
                method: 'isEmail',
                validWhen: true,
                message: 'Nieprawidłowy format adresu email'
            },
            {
                field: 'password',
                method: 'isEmpty',
                validWhen: false,
                message: 'Hasło jest wymagane'
            },
            {
                field: 'password',
                method: 'isLength',
                args: [{min: 6, max: 50}],
                validWhen: true,
                message: 'Nieprawidłowa długość hasła (min 6 - max 50 znaków)'
            },
            {
                field: 'password2',
                method: 'isEmpty',
                validWhen: false,
                message: 'Hasło jest wymagane'
            },
            {
                field: 'password2',
                method: 'isLength',
                args: [{min: 6, max: 50}],
                validWhen: true,
                message: 'Nieprawidłowa długość hasła (min 6 - max 50 znaków)'
            },
            { 
                field: 'password2', 
                method: this.passwordMatch,
                validWhen: true, 
                message: 'Hasła się nie zgadzają'
            },
            { 
                field: 'checkbox', 
                method: this.checkboxValue,
                validWhen: false, 
                message: 'Musisz najpierw zaakceptować regulamin'
            }
        ]);

        this.state = {
            name: '',
            surname: '',
            username: '',
            email: '',
            password: '',
            password2: '',
            checkbox: false,
            validation: this.validator.valid()
        };

        this.submitted = false;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
    }

    passwordMatch = (confirmation, state) => (state.password === confirmation)
    checkboxValue = (checkbox, state) => (state.checkbox === false ? true : false)

    updateInputValue(event){
      this.setState({
        password2: event.target.value
      })
    }

    handleChange(event) {
        event.preventDefault();

        this.setState({
             [event.target.name]: event.target.value,
        });
    }

    handleCheckBoxChange(event) {
        this.setState({
             checkbox: !this.state.checkbox,
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const validation = this.validator.validate(this.state);
        this.setState({ validation });
        this.submitted = true;
        
        if(validation.isValid) {
            var user = {
                name: this.state.name,
                surname: this.state.surname,
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
            }
            const { dispatch } = this.props;
            dispatch(userActions.register(user));
        }
    }

    render() {
        let validation = this.submitted ?
                            this.validator.validate(this.state) :
                            this.state.validation

        const { registering, alert, error } = this.props;

        return (
            <div>
            <NavigationBar />
            <section class="rejestracja">
                <div class="container container-register text-center p-3">
                    <h1 class="display-4 mt-2 header">Rejestracja</h1>
                    <div class="row">
                        <div class="col">
                            <div class="text-center">
                                <form action="#" onSubmit={this.handleSubmit}>
                                    <label for="imie" class="form-control-label">Imię:</label>
                                    <input type="text" id="imie" class="form-control" placeholder="Twoje imię" name="name" onChange={this.handleChange} />
                                    <span style={{color: 'red', display: 'block'}}  className="help-block">{validation.name.message}</span>

                                    <label for="nazwisko" class="form-control-label">Nazwisko:</label>
                                    <input type="text" id="nazwisko" class="form-control" placeholder="Twoje nazwisko" name="surname" onChange={this.handleChange}/>
                                    <span style={{color: 'red', display: 'block'}}  className="help-block">{validation.surname.message}</span>

                                    <label for="login" class="form-control-label">Login:</label>
                                    <input type="text" id="login" class="form-control" placeholder="Twój login" name="username" onChange={this.handleChange}/>
                                    <span style={{color: 'red', display: 'block'}}  className="help-block">{validation.username.message}</span>

                                    <label for="email" class="form-control-label">E-mail:</label>
                                    <input type="email" id="email" class="form-control" placeholder="Twój adres e-mail" name="email" onChange={this.handleChange}/>
                                    <div style={{color: 'red', display: 'block'}} className="help-block">{validation.email.message}</div>

                                    <label for="haslo" class="form-control-label">Hasło:</label>
                                    <input type="text" id="haslo" class="form-control" placeholder="Twoje hasło" name="password" onChange={this.handleChange}/>
                                    <span style={{color: 'red', display: 'block'}} className="help-block">{validation.password.message}</span>

                                    <label for="powtorzHaslo" class="form-control-label">Powtórz hasło:</label>
                                    <input type="text" id="powtorzHaslo" class="form-control" placeholder="Powtórz swoje hasło" name="password2" onChange={this.updateInputValue}/>
                                    <span style={{color: 'red', display: 'block'}}  className="help-block">{validation.password2.message}</span>

                                    <button type="submit" class="form-control btn btn-outline-warning w-25 btn-lg mt-1">Załóż konto</button>   
                                    {registering &&
                                        <img alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                    }
                                    {error && 
                                        <div style={{marginTop: '10px'}} className={`alert alert-danger`}>{error}</div>
                                    } 
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="form-check regulamin">
                            <label class="form-check-label">
                                <input type="checkbox" value="ok" class="form-check-input" name="checkbox" checked={this.state.checkbox} onChange={this.handleCheckBoxChange}/>
                                Akceptuję regulamin.
                            </label>
                            <span style={{color: 'red'}}  className="help-block">{validation.checkbox.message}</span>
                    </div>
                       
                </div>
            </section>
        </div>
        );
    }
}

function mapStateToProps(state) {
    const { registering, error } = state.registration;
    const { alert } = state;

    return {
        registering, alert, error
    };
}


const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };
