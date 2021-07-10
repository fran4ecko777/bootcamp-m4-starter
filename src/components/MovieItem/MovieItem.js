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
        const { title, year, poster, imdbID } = this.props;
        return (
            <article className="movie-item">
                <img className="movie-item__poster" src={poster} alt={title} />
                <div className="movie-item__info">
                    <h3 className="movie-item__title">{title}&nbsp;({year})</h3>
                    <button type="button" className="movie-item__add-button" onClick={() => this.addProductToMovie(imdbID)}>Добавить в список</button>
                </div>
            </article>
        );
    }
}
 
export default MovieItem;