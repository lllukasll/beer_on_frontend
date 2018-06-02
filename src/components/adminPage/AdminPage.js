import React from 'react';
import { connect } from 'react-redux';
import SideBar from '../common/sidebar/SideBar.js';

class AdminPage extends React.Component {
    constructor(props){
        super(props);
    }
    
    render() {
        return (
            <div>Admin</div>
        );
    }
}


function mapStateToProps(state, ownProps) {
    return {
    };
}

export default connect(mapStateToProps)(AdminPage);