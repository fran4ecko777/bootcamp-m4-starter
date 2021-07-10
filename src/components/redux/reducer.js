import {add, remove, requestMovie} from '../actions/MovieAction'; 


let newinitialState = {
    cartMovies: [],
    movies: [
        {
            imdbID: 'tt3896198',
            title: "Guardians of the Galaxy Vol. 2",
            year: 2017,
            poster: "https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg"

        },
        {
            imdbID: '',
            title: "",
            year: 1972,
            poster: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"

        }
    ]
}
//state = initialState  - это установка значений глобального state по умолчанию.
function reducer(state = newinitialState, action) {

    if (action.type === add) {
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
        let newFilm = action.addToNewFilm
        console.log(newFilm)
    }
    return state;
}

export default reducer;