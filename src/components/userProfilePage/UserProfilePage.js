import React from 'react';
import { connect } from 'react-redux';

import SideBar from '../common/sidebar/SideBar.js';
import ChangePassword from './ChangePassword.js';
import UserData from './UserData.js';
import './UserProfilePage.css';

class UserProfilePage extends React.Component {
    constructor(props){
        super(props);
    }
    
    render() {
        return (
            <div class="container-fluid mt-3">
                <div class="row">
                    <SideBar />
                        <div class="content content-profile col-md-10 mx-auto">     
                            <div class="row">
                                <div class="col-md-6 d-flex flex-column">
                                    <form method="#">
                                        <h1 class="display-3 header-profile">Edytuj profil</h1> 
                                        <img src="/images/avatar.jpg" class="img-thumbnail rounded editAvatar-profile" />
                                        <label for="zdjecie" class="pictureLabel-profile">Wybierz plik, aby zmienic zdjęcie</label>
                                        <button class="btn btn-outline-warning w-25 pictureButton-profile" type="button" data-toggle="modal" data-target="#wyborZdjecia">Wybierz zdjęcie</button> 
                                        <div class="modal fade" id="wyborZdjecia" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                <h5 class="modal-title-profile" id="exampleModalLabel">Wybierz swoje zdjęcie</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                                </div>
                                                <div class="modal-body">
                                                <div class="file-loading">
                                                    <input id="input-b9" name="input-b9[]" multiple type="file" />
                                                </div>
                                                </div>
                                                <div class="modal-footer d-flex justify-content-center">
                                                <a href="edycjaProfilu.html"><button type="button" class="btn btn-outline-warning">Zapisz zmiany</button></a>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                <div class="col-md-6">
                                    <UserData />
                                    <ChangePassword />
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

export default connect(mapStateToProps)(UserProfilePage);