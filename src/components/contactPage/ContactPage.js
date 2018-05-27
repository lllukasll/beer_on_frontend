import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './ContactPage.css';
import SideBar from '../common/sidebar/SideBar.js';

class ContactPage extends React.Component {
    constructor(props){
        super(props);
    }
    
    render() {
        return (
            <div class="container-fluid mt-3">
                <div class="row">
                    <SideBar />
                    <div class="content col-md-10 mx-auto text-center">  
                        <h1 class="display-2 mt-3 header">Napisz wiadomość</h1>
                        <div class="container">
                            <div class="row">
                                <div class="col">
                                    <div class="formularz-kontakt mt-5">
                                        <form action="#">
                                            <div class="form-group row">
                                                <label for="imie" class="col-sm-2 col-form-label">Imię:</label>
                                                    <div class="col-sm-10">
                                                        <input type="text" class="form-control ml-4" id="imie" placeholder="Twoje imię" />
                                                    </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="email" class="col-sm-2 col-form-label">E-mail:</label>
                                                    <div class="col-sm-10">
                                                        <input type="email" class="form-control ml-4" id="email" placeholder="Twój adres e-mail" />
                                                    </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="imie" class="col-sm-2 col-form-label">Wiadomość:</label>
                                                    <div class="col-sm-10">
                                                        <textarea type="text" class="form-control ml-4" id="wiadomosc" placeholder="Napisz wiadomość..."></textarea>
                                                    </div>
                                            </div>                          
                                        </form>  
                                        <button type="button" class="btn btn-outline-warning w-25 mt-5 align-self-center wyslijButton-kontakt" data-toggle="modal" data-target="#wiadomoscButton">Wyślij wiadomość</button>

                                        <div class="modal fade" id="wiadomoscButton" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                    
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <h3>Dziekujemy za wiadomość!</h3>
                                                    </div>
                                                    <div class="modal-footer d-flex justify-content-center">
                                                    <Link to="/" class="btn btn-outline-warning" data-dismiss="modal" >Ok</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
    return {
    };
}

export default connect(mapStateToProps)(ContactPage);