import React from 'react';
import { connect } from 'react-redux';

import CommentItem from './CommentItem.js';

import { commentActions } from '../../../actions';
import "./BeerPage.css";

class CommentsList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.dispatch(commentActions.getAll(this.props.beerId));
    }

    isUserAuthor(commentAuthorId, userId){
        if(commentAuthorId === userId)
        {
            return true;
        } else
        {
            return false;
        }
    }

    render() {
        const { comments, loggedUser } = this.props;

        return(
            <div>
                <label class="komentHeader">Komentarze:</label>
                <div class="pozostaleKomentarze">
                        <div class="komentarze">
                            {!comments || comments.loadingComments || comments.addingComment ? 
                            (<div>
                                <img alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                            </div>) 
                            : (<div>
                                {comments.comments.map((comment,index) => 
                                    <CommentItem beerId={this.props.beerId} comment={comment} />
                                )}
                            </div>)}
                        </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const { comments, loggedUser } = state
    return {
        comments,
        loggedUser
    };
}

export default connect(mapStateToProps)(CommentsList);