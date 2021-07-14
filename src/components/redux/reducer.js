import {add, remove, requestMovie} from '../actions/MovieAction'; 


let newinitialState = {
    cartMovies: [],
    movies: []
}
//state = initialState  - это установка значений глобального state по умолчанию.
function reducer(state = newinitialState, action) {

    if (action.type === add) {
        if (state.cartMovies.find(item => item.imdbID === action.productIdToAddMovie)) {
            return state;
        }
        // 1 Найти нужный фильм в массиве товаров по переданому imdbID
        let productMovie = state.movies.find(item => item.imdbID === action.productIdToAddMovie);
        // 2 Добавить нужный фильм в корзину к уже имеющимся в корзине фильмам
        let cartMovies = [...state.cartMovies, productMovie]
        return {...state,cartMovies}
    } else if (action.type === remove) {
        const newData = state.cartMovies.filter(item => {
            return item.imdbID !== action.removeToMovie
        });
        state.cartMovies = newData;
    } else if (action.type === requestMovie) {
        let newFilm = action.addToNewFilm;
        let clone = {...state};
        clone.movies = newFilm;
        return clone;
    }
    return state;
}

export default reducer;