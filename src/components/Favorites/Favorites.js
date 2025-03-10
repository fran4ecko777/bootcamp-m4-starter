import React, { Component } from 'react';
import './Favorites.css';
import store from '../redux/store';
import {remove} from '../actions/MovieAction'
import { Link} from 'react-router-dom';

const url = 'https://acb-api.algoritmika.org/api/movies/list';

class Favorites extends Component {
    state = {
        title: '',
        movies: [],
        showList: false,
        id:'',
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
            removeToMovie: id
        });
    }

    searchLineChangeHandler = (e) => {
        this.setState({ title: e.target.value });
    }

    searchBoxSubmitHandler = (e) => {
        fetch( url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(response => response.json())
        .then((data) => {
            this.setState({
                title: '',
                showList: true,
                movies: [],
                id: data.id
            })
        })
        .catch((error) => {
            console.log(error);
        })  
        e.preventDefault();
    }

    render() { 

        const { title } = this.state;

        return (
                <div className="favorites" >
                    <input 
                        value={title} 
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
                        ? <Link to={"/list/" + this.state.id} type="submit" className="favorites__save" >Перейти к списку</Link>
                        : <button disabled={!title} type="submit" className="favorites__save" onClick={this.searchBoxSubmitHandler}>Сохранить список</button>
                    }
                </div>

        );
    }
}

export default Favorites;