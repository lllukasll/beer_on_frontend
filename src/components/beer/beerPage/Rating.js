import React from 'react';
import { connect } from 'react-redux';
import StarRatingComponent from 'react-star-rating-component';

import { beerRatingActions } from '../../../actions';
import "./BeerPage.css";
class Rating extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: true
        }
    }

    componentDidMount(){
        this.setState({isLoading: true})
        this.props.dispatch(beerRatingActions.getBeerRating(this.props.beerId));
        this.setState({isLoading: false})
    }

    render() {
        const { beerRating } = this.props;

        if(this.state.isLoading)
        {
            return (
                <img alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            );
        }

        return (
            <div>
                {!beerRating || beerRating.loadingRating || beerRating.addingRating ? 
                (<div>
                    <img alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                </div>) 
                : (<div>
                    <div class="d-flex">
                        <h2 class="my-auto display-4">Ocena:</h2>
                        <h1 class="ml-3 display-4"><b>{beerRating.beerRating.average}/10</b></h1>
                         {beerRating.beerRating.numberOfRaitings === 1 ? (<div style={{fontSize: '25'}}>Oceniono {beerRating.beerRating.numberOfRaitings} raz</div>) : (<div>Oceniono {beerRating.beerRating.numberOfRaitings} razy</div>)}
                    </div>
                    <div class="ocena">
                        <div>
                            <div>
                                Smak:
                                <StarRatingComponent 
                                    name="flavour" 
                                    starCount={10}
                                    value={beerRating.beerRating.flavor}
                                    editing={false}
                                />
                            </div>
                            <div>
                                <label>Zapach:</label>
                                <StarRatingComponent 
                                    name="smell" 
                                    starCount={10}
                                    value={beerRating.beerRating.smell}
                                    editing={false}
                                />
                            </div>
                            <div>
                                <label>Wygląd:</label>
                                <StarRatingComponent 
                                    name="appearance" 
                                    starCount={10}
                                    value={beerRating.beerRating.appearance}
                                    editing={false}
                                />
                            </div> 
                        </div>
                    </div>
                </div>)}
                
            </div>
        );
    }
}


function mapStateToProps(state, ownProps) {
    const { beerRating } = state;
    return {
        beerRating
    };
}

export default connect(mapStateToProps)(Rating);
