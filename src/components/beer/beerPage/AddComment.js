import React from 'react';
import { connect } from 'react-redux';
import FormValidator from '../../../helpers/FormValidator.js';
import { commentActions } from '../../../actions';
import "./BeerPage.css";

class AddComment extends React.Component {
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
            var comment = {
                content: this.state.commentContent
            }
            const { dispatch } = this.props;
            dispatch(commentActions.addComment(comment, this.props.beerId)).then(comment => dispatch(commentActions.getAll(this.props.beerId)));
        }
    }

    render() {
        let validation = this.submitted ?
                            this.validator.validate(this.state) :
                            this.state.validation

        return(
            <div class="komentarz">
                    <form onSubmit={this.handleSubmit}>
                        <label class="col-form-label">Dodaj komentarz:</label>
                        <textarea type="text" class="form-control" id="komentarz" name="commentContent" onChange={this.handleChange} placeholder="Napisz komentarz..."></textarea>
                        <span className="help-block">{validation.commentContent.message}</span>
                        <button type="submit" class="btn btn-outline-warning mt-2 w-25">Dodaj</button>
                    </form>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
    };
}

export default connect(mapStateToProps)(AddComment);