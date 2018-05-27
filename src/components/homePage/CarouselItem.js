import React from 'react';
import { Link } from 'react-router-dom';
import { config } from '../../helpers';

const CarouselItem = props => (
    <div class={"carousel-item " + props.active}>
        <div class="container karta-home" href="#slider">
        <div class="row">
            <div class="col mt-5">
                <img src={config.apiUrl + "/api/photo/" + props.beer.avatarUrl} class="beer-home" />
            </div>
            <div class="col mt-5 text-left">
                <h1 class="mb-3 display-4">{props.beer.name}</h1>
                <button type="button" class="btn btn-light" aria-label="Left Align">
                        <span class="glyphicon glyphicon-align-left" aria-hidden="true">{props.beer.brewery.name}</span>
                </button>
                <button type="button" class="btn btn-light mx-2" aria-label="Left Align">
                        <span class="glyphicon glyphicon-align-left" aria-hidden="true">{props.beer.beerType.name}</span>
                </button>
                <button type="button" class="btn btn-light" aria-label="Left Align">
                        <span class="glyphicon glyphicon-align-left" aria-hidden="true">{props.beer.percentage}</span>
                </button>
                <p class="mt-4 opis-home">{props.beer.description}</p>
                <span>Dodano przez: Jan Kowalski</span>
                <br />
                <span>Data dodania: 21.05.2018</span>
            </div>
            <div class="col mt-5">
                <h2 class="display-4">Ocena:</h2>
                <h1 class="display-3"><b>{props.beer.averageRating}/10</b></h1>
            </div>
        </div>
        <Link to={"/beer/" + props.beer.id} class="btn btn-outline-warning w-25 mt-3">Pokaż więcej</Link>
        </div>
    </div>
);

export default CarouselItem;