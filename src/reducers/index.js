import { combineReducers } from 'redux';
import { users } from './users.reducer';
import { user, loggedUser, changePassword } from './user.reducer';
import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { beerTypes } from './beer_type.reducer';
import { beer } from './beer.reducer';
import { breweries } from './brewery.reducer';
import { comments } from './comment.reducer';
import { beerRating } from './beer_rating.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
    users,
    user,
    alert,
    authentication,
    registration,
    breweries,
    beerTypes,
    comments,
    beerRating,
    loggedUser,
    changePassword,
    beer
});

export default rootReducer;
