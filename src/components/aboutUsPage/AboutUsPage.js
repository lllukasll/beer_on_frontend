import React from 'react';
import { connect } from 'react-redux';
import SideBar from '../common/sidebar/SideBar.js';

class AboutUsPage extends React.Component {
    constructor(props){
        super(props);
    }
    
    render() {
        return (
            <div class="container-fluid mt-3">
                <div class="row">
                    <SideBar />     
                    <div class="content col-md-10 mx-auto text-center">  
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

export default connect(mapStateToProps)(AboutUsPage);