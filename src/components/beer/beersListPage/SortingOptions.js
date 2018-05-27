import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './BeersListPage.css';

class SortingOptions extends React.Component {
  render() {
    return(
        <div class="row p-4 d-flex justify-content-center">
            <label for="browar">Browar:</label>
            <div class="col-md-2">
                <form >
                    <div class="form-group">
                        <select class="form-control " id="browar">
                        <option></option>
                        <option>Warka</option>
                        <option>Łomża</option>
                        <option>Tyskie</option>
                        <option>Kormoran</option>
                        </select>
                    </div> 
                </form>    
            </div>
            <label for="browar">Typ:</label>
            <div class="col-md-2">
                <form >
                    <div class="form-group">
                        <select class="form-control " id="typ">
                        <option></option>
                        <option>Pszeniczne</option>
                        <option>Miodowe</option>
                        <option>Niepasteryzowane</option>
                        <option>Radler</option>
                        </select>
                    </div> 
                </form>    
            </div>
            <label for="browar">%Alk:</label>
            <div class="col-md-2">
                <form >
                    <div class="form-group">
                        <select class="form-control " id="%alk">
                        <option></option>
                        <option>2,0%</option>
                        <option>3,2%</option>
                        <option>5,0%</option>
                        <option>5,2%</option>
                        </select>
                    </div> 
                </form>    
            </div>
            <label for="browar">Lokalizacja:</label>
            <div class="col-md-2">
                <form >
                    <div class="form-group">
                        <select class="form-control " id="lokalizacja">
                        <option></option>
                        <option>Olsztyn</option>
                        <option>Gdańsk</option>
                        <option>Warszawa</option>
                        <option>Kraków</option>
                        </select>
                    </div> 
                </form>    
            </div>
        </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
    return {
    };
}

export default connect(mapStateToProps)(SortingOptions);
