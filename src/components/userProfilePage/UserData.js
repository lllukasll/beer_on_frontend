import React from 'react';
import { connect } from 'react-redux';
import SideBar from '../common/sidebar/SideBar.js';
import './UserProfilePage.css';
import FormValidator from '../../helpers/FormValidator.js';
import { userActions } from '../../actions';

class ChangePassword extends React.Component {
    constructor(props){
        super(props);

        this.validator = new FormValidator([
            {
                field: 'name',
                method: 'isEmpty',
                validWhen: false,
                message: 'Imię jest wymagane'
            },
            {
                field: 'surname',
                method: 'isEmpty',
                validWhen: false,
                message: 'Nazwisko jest wymagane'
            },
            {
                field: 'username',
                method: 'isEmpty',
                validWhen: false,
                message: 'Login jest wymagany'
            }
        ]);

        this.state = {
            name: '',
            surname: '',
            username: '',

            validation: this.validator.valid()
        };

        this.submitted = false;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        event.preventDefault();

        this.setState({
             [event.target.name]: event.target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const validation = this.validator.validate(this.state);
        this.setState({ validation });
        this.submitted = true;
        
        if(validation.isValid) {
            var password = {
                oldPassword: this.state.oldPassword,
                newPassword: this.state.newPassword,
                newPassword2: this.state.newPassword2,
            }
            const { dispatch } = this.props;
            //dispatch(userActions.changePassword(password));
        }
    }

    render() {
        let validation = this.submitted ?
                            this.validator.validate(this.state) :
                            this.state.validation

        const { changePassword } = this.props;
        return (
            <div>
                <div class="formularz d-flex justify-content-center text-center">
                    <form onSubmit={this.handleSubmit}>
                        <div class="form-group row">
                            <label for="imie" class="col-sm-2 col-form-label my-auto">Imię:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control ml-4" id="imie" name="name" onChange={this.onChange} placeholder="Twoje imię" />
                                    <span style={{color: 'red', margin: 'auto'}}  className="help-block">{validation.name.message}</span>
                                </div>
                        </div>
                        <div class="form-group row">
                            <label for="nazwisko" class="col-sm-2 col-form-label my-auto">Nazwisko:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control ml-4" id="nazwisko" name="surname" onChange={this.onChange} placeholder="Twoje nazwisko" />
                                    <span style={{color: 'red', margin: 'auto'}}  className="help-block">{validation.surname.message}</span>
                                </div>
                        </div>
                        <div class="form-group row">
                            <label for="imie" class="col-sm-2 col-form-label my-auto">Login:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control ml-4" id="imie" name="username" onChange={this.onChange} placeholder="Twoje imię" />
                                    <span style={{color: 'red', margin: 'auto'}}  className="help-block">{validation.username.message}</span>
                                </div>
                        </div>   
                            <button type="submit" style={{width: '300px'}} class="btn btn-outline-warning">Zapisz</button>     
                            <button type="button" style={{marginTop: '10px',width: '300px'}} class="btn btn-outline-warning" data-toggle="modal" data-target="#zmianaHasla">Zmień hasło</button>                  
                    </form>  
                </div>
                
            </div>
        );
    }
}


function mapStateToProps(state, ownProps) {
    const { changePassword } = state;
    return {
        changePassword
    };
}

export default connect(mapStateToProps)(ChangePassword);