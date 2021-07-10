import React, { Component } from 'react';
import './Favorites.css';
import store from '../redux/store';
import {remove} from '../actions/MovieAction'

class Favorites extends Component {
    state = {
        title: 'Новый список',
        movies: []
    }

    componentDidMount() {
        store.subscribe(() => {
            const globalState = store.getState();
            this.setState({
                movies: globalState.cartMovies
            });
        });
    }

    removeMovie = (id) => {
        store.dispatch({
            type: remove,
            removeToMovie: id,
        });
    }

    render() { 
        return (
            <div className="favorites">
                <input   className="favorites__name" /> 
                {/* value="Новый список" */}
                <ul className="favorites__list">
                    {this.state.movies.map((item) => {
                        return <li key={item.imdbID}>
                                    {item.title}
                                    ({item.year})
                                    <button type="button" onClick={() => this.removeMovie(item.imdbID)}>-</button>
                                </li>;
                    })}
                </ul>
                <button type="button" className="favorites__save">Сохранить список</button>
            </div>
        );
    }
}

export default Favorites;