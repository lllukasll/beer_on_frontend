import React from 'react';
import { connect } from 'react-redux';
import StarRatingComponent from 'react-star-rating-component';
import Modal from 'react-responsive-modal';
import { beerRatingActions } from '../../../actions';
import "./BeerPage.css";
class AddRating extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            flavour: 1,
            smell: 1,
            look: 1,
            toUpdate: false,
            updated: false,
            added: false,
            idToUpdate: null,

            modalOpen: true

        }

        this.addRating = this.addRating.bind(this);
        this.updateRating = this.updateRating.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    openModal(){
        this.setState({modalOpen: true})
    }

    closeModal(){
        this.setState({modalOpen: false})
    }

    onStarClick(nextValue, prevValue, name) {
        const { flavour, smell, look, average } = this.state;

        this.setState({[name]: nextValue});
    }

    addRating(event){
        event.preventDefault();

        var rating = {
            flavor: this.state.flavour,
            smell: this.state.smell,
            appearance: this.state.look,
            average: Math.round((this.state.flavour + this.state.smell + this.state.look)/3)
        }
        this.props.dispatch(beerRatingActions.addBeerRating(rating, this.props.beerId)).then(
            beerRating => {
                this.props.dispatch(beerRatingActions.getBeerRating(this.props.beerId))
                this.setState({updated: true, toUpdate: true, idToUpdate: beerRating.id})
            },
            error => {
                this.props.dispatch(beerRatingActions.getBeerRating(this.props.beerId));
                this.props.dispatch(beerRatingActions.getBeerRatingForUser(this.props.beerId)).then(
                    beerRating => this.setState({
                        toUpdate: true,
                        idToUpdate: beerRating.id,
                        flavour: beerRating.flavor,
                        smell: beerRating.smell,
                        look: beerRating.appearance
                    }));
            });
    }

    updateRating(event){
        event.preventDefault();

        var rating = {
            flavor: this.state.flavour,
            smell: this.state.smell,
            appearance: this.state.look,
            average: Math.round((this.state.flavour + this.state.smell + this.state.look)/3)
        }
        this.props.dispatch(beerRatingActions.updateBeerRating(rating, this.state.idToUpdate)).then(
            beerRating => {
                this.props.dispatch(beerRatingActions.getBeerRating(this.props.beerId))
                this.setState({updated: true})
            });
    }

    render() {
        const { flavour, smell, look, average, toUpdate, modalOpen, updated, added } = this.state;
        const { beerRating } = this.props;

        var tmp = Math.round((flavour + smell + look)/3);

        return (
            <div>
                <div class="dodajOcene text-left p-3">
                 {!toUpdate ? (<h2 class="display-4">Dodaj ocenę:</h2>) : (<h2 class="display-4">Twoja ocena:</h2>)}
                <div class="smak text-center">
                    <label class="">Smak:</label>
                    <StarRatingComponent 
                            name="flavour" 
                            starCount={10}
                            value={flavour}
                            onStarClick={this.onStarClick.bind(this)}
                        />
                </div>
                <div class="zapach text-center"> 
                    <label>Zapach:</label>
                    <StarRatingComponent 
                            name="smell" 
                            starCount={10}
                            value={smell}
                            onStarClick={this.onStarClick.bind(this)}
                        />
                </div>
                <div class="wyglad text-center">
                    <label>Wygląd:</label>
                    <StarRatingComponent 
                            name="look" 
                            starCount={10}
                            value={look}
                            onStarClick={this.onStarClick.bind(this)}
                        />
                </div> 
                <div class="srednia text-center">
                        <label>Średnia:</label>
                        <br />
                        <label id="sredniaOcena">{tmp}/10</label>
                        <StarRatingComponent 
                            name="look" 
                            starCount={10}
                            value={tmp}
                            editing={false}
                        />
                </div> 
                <div class="text-center">
                    
                        {!toUpdate ? 
                        (<div>
                            <form onSubmit={this.addRating}>
                                <button class="btn btn-outline-warning w-50">Dodaj</button>
                            </form>
                        </div>) 
                        : (<div>
                            <form onSubmit={this.updateRating}>
                                <button class="btn btn-outline-warning w-50">Aktualizuj</button>
                                {!updated ? (<div style={{marginTop: '10px'}} className={`alert alert-danger`}>Już dodałeś ocenę</div>) : (<div style={{marginTop: '10px'}} className={`alert alert-success`}>Zapisano ocene</div>)}
                            </form>
                        </div>)}
                        
                    
                </div>
            </div>
            </div>
            
        );
    }
}


function mapStateToProps(state, ownProps) {
    const {beerRating} = state;
    return {
        beerRating
    };
}

export default connect(mapStateToProps)(AddRating);
