import React, { Component } from 'react';
import './Favorites.css';
import store from '../redux/store';
import {remove} from '../actions/MovieAction'

const url = 'https://acb-api.algoritmika.org/api/movies/list';

class Favorites extends Component {
    state = {
        title: '',
        movies: [],
        showList: false
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

    searchLineChangeHandler = (e) => {
        this.setState({ title: e.target.value });
    }

    searchBoxSubmitHandler = (e) => {
        console.log(this.state);
        fetch( url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state)
        });
        e.preventDefault();
    }

    render() { 

        const { title } = this.state;

        return (
            <div className="favorites" >
                <input 
                    value={ title } 
                    placeholder="Введите названия списка" 
                    className="favorites__name" 
                    onChange={this.searchLineChangeHandler}
                    name="saveMovie"
                /> 
                <ul className="favorites__list">
                    {this.state.movies.map((item) => {
                        return (
                            <li key={item.imdbID}>
                                {item.Title}
                                ({item.Year})
                                <button type="button" onClick={() => this.removeMovie(item.imdbID)}>-</button>
                            </li>
                        )
                    })}
                </ul>
                { this.state.showList
                    ? <button type="submit" className="favorites__save" >Перейти к списку</button>
                    : <button type="submit" className="favorites__save" onClick={this.searchBoxSubmitHandler}>Сохранить список</button>
                }
            </div>
        );
    }
}

export default Favorites;