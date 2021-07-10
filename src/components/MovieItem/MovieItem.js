import React, { Component } from 'react';
import './MovieItem.css';
import store from '../redux/store';
import {add} from '../actions/MovieAction'; 

class MovieItem extends Component {

    addProductToMovie = (imdbID) => {

        store.dispatch({
            type: add,
            productIdToAddMovie: imdbID,
        });
    }

    render() {
        const { Title, Year, Poster, imdbID } = this.props;
        return (
            <article className="movie-item">
                <img className="movie-item__poster" src={Poster} alt={Title} />
                <div className="movie-item__info">
                    <h3 className="movie-item__title">{Title}&nbsp;({Year})</h3>
                    <button type="button" className="movie-item__add-button" onClick={() => this.addProductToMovie(imdbID)}>Добавить в список</button>
                </div>
            </article>
        );
    }
}
 
export default MovieItem;