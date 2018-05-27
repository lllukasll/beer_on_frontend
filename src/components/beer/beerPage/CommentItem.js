import React from 'react';
import FormValidator from '../../../helpers/FormValidator.js';
import { commentActions } from '../../../actions';
import { connect } from 'react-redux';

class CommentItem extends React.Component {
    constructor(props) {
        super(props);

        this.validator = new FormValidator([
        {
            field: 'commentContent',
            method: 'isEmpty',
            validWhen: false,
            message: 'Treść jest wymagana'
        },
        {
            field: 'commentContent',
            method: 'isLength',
            args: [{min: 10, max: 250}],
            validWhen: true,
            message: 'Zły format (minimum 10 znaków max 250)'
        }
        ]);

        this.state = {
            commentContent: '',
            editComment: false,
            validation: this.validator.valid()
        };

        this.submitted = false;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.editCommentClick = this.editCommentClick.bind(this);
        this.deleteCommentClick = this.deleteCommentClick.bind(this);
    }

    componentDidMount() {
        this.setState({
            commentContent: this.props.comment.content
        });
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
            var comment = {
                content: this.state.commentContent
            }
            this.setState({
                editComment: false
            })
            const { dispatch } = this.props;
            dispatch(commentActions.updateComment(comment, this.props.beerId, this.props.comment.id)).then(comment => dispatch(commentActions.getAll(this.props.beerId)));
        }
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

    editCommentClick(event, content){
        event.preventDefault();

        this.setState({
            editComment: !this.state.editComment
        })
    }

    deleteCommentClick(){
        this.props.dispatch(commentActions.deleteComment(this.props.beerId, this.props.comment.id)).then(comment => this.props.dispatch(commentActions.getAll(this.props.beerId)));
    }

    render() {
        let validation = this.submitted ?
                            this.validator.validate(this.state) :
                            this.state.validation

        const { loggedUser } = this.props;
        const { editComment } = this.state;

        return(
            <div>
                {editComment ? 
                (<div class="komUzytkownika p-2">
                    {this.isUserAuthor(this.props.comment.user.id, loggedUser && loggedUser.loggedUserData.id) ? 
                    (<div>
                        <div style={{float: 'right', display: 'inline-block', cursor: 'pointer'}} id="dropdownMenuButtonComment" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Zakończ
                            </div>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButtonComment">
                                <div className="dropdown-item">Anulować edycję ?</div>
                                <div style={{float: 'right', display: 'inline-block'}} ><button style={{cursor: 'pointer'}} className="dropdown-item">Nie</button></div>
                                {this.isUserAuthor(this.props.comment.user.id, loggedUser.loggedUserData.id) ? (<div style={{float: 'left', display: 'inline-block'}}><button onClick={this.editCommentClick} style={{cursor: 'pointer'}} className="dropdown-item">Tak</button></div>) : (<div></div>)}
                            </div>
                    </div>) : (<div></div>)}
                    
                    <label for="nazwaUzytkownika">{this.props.comment.user.name} {this.props.comment.user.surname}</label>
                    <form onSubmit={this.handleSubmit}>
                        <div className="tresc p-4">
                            <textarea className="form-control" name="commentContent" id="commentContentInput" onChange={this.handleChange} defaultValue={this.props.comment.content} rows="2"></textarea>
                            <button type="submit" className="btn btn-secondary" id="submitPost">Aktualizuj </button>
                            <span className="help-block">{validation.commentContent.message}</span>
                        </div>
                    </form>
                </div>) 
                :(<div class="komUzytkownika p-2">
                    {this.isUserAuthor(this.props.comment.user.id, loggedUser && loggedUser.loggedUserData.id) ? 
                    (<div>
                        <div style={{float: 'right', display: 'inline-block', cursor: 'pointer'}} id="dropdownMenuButtonComment" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-cog"></i>
                        </div>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButtonComment">
                            {this.isUserAuthor(this.props.comment.user.id, loggedUser.loggedUserData.id) ? (<div style={{float: 'right', display: 'inline-block', cursor: 'pointer'}} ><button onClick={this.editCommentClick} className="dropdown-item">Edytuj</button></div>) : (<div></div>)}
                            {this.isUserAuthor(this.props.comment.user.id, loggedUser.loggedUserData.id) ? (<div style={{ display: 'inline-block', cursor: 'pointer'}} ><button onClick={this.deleteCommentClick} className="dropdown-item">Usuń</button></div>) : (<div></div>)}
                        </div>
                    </div>) : (<div></div>)}
                    
                    <label for="nazwaUzytkownika">{this.props.comment.user.name} {this.props.comment.user.surname}</label>
                    <div class="tresc p-4">
                        {this.props.comment.content}
                    </div>
                </div>)}
                
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const { loggedUser } = state
    return {
        loggedUser
    };
}

export default connect(mapStateToProps)(CommentItem);