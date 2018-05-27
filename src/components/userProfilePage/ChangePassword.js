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
                field: 'oldPassword',
                method: 'isEmpty',
                validWhen: false,
                message: 'Imię jest wymagane'
            },
            {
                field: 'newPassword',
                method: 'isEmpty',
                validWhen: false,
                message: 'Nazwisko jest wymagane'
            },
            {
                field: 'newPassword2',
                method: 'isEmpty',
                validWhen: false,
                message: 'Email jest wymagany'
            }
        ]);

        this.state = {
            oldPassword: '',
            newPassword: '',
            newPassword2: '',

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
            dispatch(userActions.changePassword(password));
        }
    }

    render() {
        let validation = this.submitted ?
                            this.validator.validate(this.state) :
                            this.state.validation

        const { changePassword } = this.props;
        return (
            

            <div>
                <div class="modal fade" id="zmianaHasla" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Zmiana hasła</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            </div>
                                <div class="modal-body">
                                    <div class="popup d-flex justify-content-center text-center">
                                         <form class="form" onSubmit={this.handleSubmit}>
                                            <div class="form-group row">
                                                <label for="stareHaslo" class="col-sm-2 col-form-label my-auto label">Stare hasło:</label>
                                                <div class="col-sm-10">
                                                    <input type="text" class="form-control ml-2" id="stareHaslo" name="oldPassword" onChange={this.handleChange} placeholder="Twoje stare hasło" />
                                                    <span style={{color: 'red', margin: 'auto'}}  className="help-block">{validation.oldPassword.message}</span>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="noweHaslo" class="col-sm-2 col-form-label my-auto">Nowe hasło:</label>
                                                <div class="col-sm-10">
                                                    <input type="text" class="form-control ml-2" id="noweHaslo" name="newPassword" onChange={this.handleChange} placeholder="Twoje nowe hasło" />
                                                    <span style={{color: 'red'}}  className="help-block">{validation.newPassword.message}</span>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="powtorzHaslo" class="col-sm-2 col-form-label my-auto">Powtórz hasło:</label>
                                                <div class="col-sm-10">
                                                    <input type="text" class="form-control ml-2" id="powtorzHaslo" name="newPassword2" onChange={this.handleChange} placeholder="Powtórz swoje nowe hasło" />
                                                    <span style={{color: 'red'}}  className="help-block">{validation.newPassword2.message}</span>
                                                </div>
                                            </div> 
                                            <div class="modal-footer d-flex justify-content-center">
                                                <button type="submit" class="btn btn-outline-warning w-25">Zapisz zmiany</button>
                                                <div>
                                                {changePassword && changePassword.loadingChangePassword &&
                                                    <img alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                                }
                                                {changePassword && changePassword.message &&
                                                    <div  className={`alert alert-success`}>{changePassword.message}</div>
                                                }
                                                {changePassword && changePassword.error &&
                                                    <div className={`alert alert-danger`}>{changePassword.error}</div>
                                                }</div>
                                            </div>
                                        </form>                           
                                    </div>
                                </div> 
                        </div>
                    </div>
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