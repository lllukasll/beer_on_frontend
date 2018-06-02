import React from 'react';
import { connect } from 'react-redux';

import { beerTypeActions, breweryActions, beerActions } from '../../../actions'
import FormValidator from '../../../helpers/FormValidator.js';

import UploadPhoto from './UploadPhoto.js';
import BeerTypes from './BeerTypes.js';
import Breweries from './Breweries.js';
import SideBar from '../../common/sidebar/SideBar.js';
import { NavigationBar } from '../../common/navigationBar/NavigationBar.js';

class CreateBeerPage extends React.Component {
    constructor(props){
        super(props);

        this.validator = new FormValidator([
            {
                field: 'name',
                method: 'isEmpty',
                validWhen: false,
                message: 'Nazwa jest wymagana'
            },
            {
                field: 'name',
                method: 'isLength',
                args: [{min: 0, max: 50}],
                validWhen: true,
                message: 'Nazwa jest za długia (max 50 znaków)'
            },
            {
                field: 'description',
                method: 'isEmpty',
                validWhen: false,
                message: 'Opis jest wymagany'
            },
            {
                field: 'description',
                method: 'isLength',
                args: [{min: 0, max: 250}],
                validWhen: true,
                message: 'Opis jest za długi (max 250 znaków)'
            },
            {
                field: 'percentage',
                method: 'isEmpty',
                validWhen: false,
                message: 'Procent alkoholu jest wymagany'
            },
        ]);

        this.state={
            name: '',
            description: '',
            beerTypeId: null,
            showBeerTypeInput: false,
            beerTypeInput: '',
            breweryId: null,
            showBreweryInput: false,
            breweryInput: '',
            percentage: '',
            //photo
            file: '',
            imagePreviewUrl: '',
            fileChoosen: false,

            validation: this.validator.valid()
        }

        this.submitted = false;

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBeerTypeChange = this.handleBeerTypeChange.bind(this);
        this.handleBreweryChange = this.handleBreweryChange.bind(this);
        this.addBrewery = this.addBrewery.bind(this);
        this.addBeerType = this.addBeerType.bind(this);
    }

    checkIfBeerTypeChoosen = (beerTypeId, state) => (state.beerTypeId === null ? true : false)
    checkIfBreweryChoosen = (beerTypeId, state) => (state.beerTypeId === null ? true : false)

    componentDidMount(){
        this.props.dispatch(beerTypeActions.getAll());
        this.props.dispatch(breweryActions.getAll());
    }

    addBrewery(event){
        event.preventDefault();
        //this.props.dispatch()
        console.log('Dodaj browar : ' + this.state.breweryInput);
        var brewery = {
            name: this.state.breweryInput
        }    
        this.props.dispatch(breweryActions.addBrewery(brewery)).then(
            brewery => this.props.dispatch(breweryActions.getAll()))
        
        this.setState({
            showBreweryInput: false
        })
    }

    addBeerType(event){
        event.preventDefault();
        console.log('Dodaj typ piwa : ' + this.state.beerTypeInput);  
        var beerType = {
            name: this.state.beerTypeInput
        }    
        this.props.dispatch(beerTypeActions.addBeerType(beerType)).then(
            beerType => this.props.dispatch(beerTypeActions.getAll()));
        
        this.setState({
            showBeerTypeInput: false
        })
    }

    handleInputChange(event) {
      event.preventDefault();

      this.setState({
            [event.target.name]: event.target.value,
      });
    }

    handleImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        if(file && file.type.match('image.*'))
        {
            reader.onloadend = () => {
            this.setState({
            file: file,
            imagePreviewUrl: reader.result,
            fileChoosen: true
        });
        }
        reader.readAsDataURL(file)
        }else{
        this.setState({
            file: '',
            imagePreviewUrl: '',
            fileChoosen: false,
        })
        }
    }

    handleBeerTypeChange(event){
        var option = event.target.value;
        if(option === 'inny')
        {
            this.setState({
                showBeerTypeInput: true
            })
        }else{
            this.setState({
                showBeerTypeInput: false,
                beerTypeId: option
            })
        }
    }

    handleBreweryChange(event){
        var option = event.target.value;
        if(option === 'inny')
        {
            this.setState({
                showBreweryInput: true
            })
        }else{
            this.setState({
                showBreweryInput: false,
                breweryId: option
            })
        }
    }

    handleSubmit(event) {
      event.preventDefault();

      const validation = this.validator.validate(this.state);
      this.setState({ validation });
      this.submitted = true;

      if(validation.isValid) {
        var beer = {
          name: this.state.name,
          description: this.state.description,
          beerTypeId: this.state.beerTypeId,
          breweryId: this.state.breweryId,
          percentage: this.state.percentage
        }

        const { dispatch } = this.props;
        dispatch(beerActions.addBeer(beer)).then(beer => dispatch(beerActions.uploadPhoto(this.state.file, beer.id)));
      }
    }

    render(){
        let validation = this.submitted ?
                            this.validator.validate(this.state) :
                            this.state.validation

        const {beerTypes, breweries} = this.props;
        const {showBeerTypeInput, showBreweryInput} = this.state;

        return(
            <div>
            <NavigationBar />
            <div class="container-fluid mt-3">
            <div class="row">
                <SideBar />
                <div class="content col-md-10 mx-auto">     
                    <div class="row">
                        <div class="col-md-6 d-flex flex-column">
                            <h1 class="display-3 header">Dodaj piwo</h1> 
                            <UploadPhoto 
                                handleImageChange={(e) => this.handleImageChange(e)} 
                                imagePreviewUrl={this.state.imagePreviewUrl} />          
                        </div>
                        <div class="col-md-3">
                            <div class="formularz d-flex justify-content-center text-center">
                                <form onSubmit={this.handleSubmit}>
                                    <div class="form-group row">
                                        <label for="imie" class="col-sm-2 col-form-label my-auto">Nazwa:</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control ml-4"  name="name" onChange={this.handleInputChange} placeholder="Nazwa piwa" />
                                                <span style={{color: 'red'}}  className="help-block">{validation.name.message}</span>
                                            </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="nazwisko" class="col-sm-2 col-form-label my-auto">Browar:</label>
                                            <div class="col-sm-10">
                                                <Breweries breweries={breweries.breweries} handleBreweryChange={this.handleBreweryChange}/>
                                                {showBreweryInput ? 
                                                (<div>
                                                    <input type="text" class="form-control ml-4" id="nazwisko" placeholder="Browar" name="breweryInput" onChange={this.handleInputChange}/>
                                                    <button type='button' onClick={this.addBrewery}>Dodaj</button>
                                                </div>) : (<div></div>)}
                                            </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="imie" class="col-sm-2 col-form-label my-auto">Typ:</label>
                                            <div class="col-sm-10">
                                                <BeerTypes beerTypes={beerTypes.beerTypes} handleBeerTypeChange={this.handleBeerTypeChange}/>
                                                {showBeerTypeInput ? 
                                                (<div>
                                                    <input type="text" class="form-control ml-4" id="imie" placeholder="Typ piwa" name="beerTypeInput" onChange={this.handleInputChange}/>
                                                    <button type='button' onClick={this.addBeerType}>Dodaj</button>
                                                </div>) : (<div></div>)}
                                            </div>
                                    </div>  
                                    <div class="form-group row">
                                        <label for="imie" class="col-sm-2 col-form-label my-auto">%Alk:</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control ml-4" name="percentage" onChange={this.handleInputChange} placeholder="%Alkoholu" />
                                                <span style={{color: 'red'}}  className="help-block">{validation.percentage.message}</span>
                                            </div>
                                    </div> 
                                    <div class="form-group row">
                                        <label for="imie" class="col-sm-2 col-form-label my-auto">Opis:</label>
                                            <div class="col-sm-10">
                                                <textarea type="text" class="form-control ml-4 opis" name="description" onChange={this.handleInputChange} placeholder="Opisz dodawane przez Ciebie piwo"></textarea>
                                                <span style={{color: 'red'}}  className="help-block">{validation.description.message}</span>
                                            </div>
                                    </div>
                                    <button type="submit" class="btn btn-outline-warning buttonDodaj w-50">Dodaj piwo</button>                    
                                </form>  
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

function mapStateToProps(state) {
    const { beerTypes, breweries } = state
    return {
        beerTypes,
        breweries
    };
}

export default connect(mapStateToProps)(CreateBeerPage);