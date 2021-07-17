import React, { Component } from 'react';
import './SearchBox.css';
import store from '../redux/store';
import {requestMovie} from '../actions/MovieAction'; 


const apiKey = 'd24afc9b';
const url = 'https://www.omdbapi.com/?';


class SearchBox extends Component {
    state = {
        searchLine: '',
        isValid:false,
        Error: "",
    }
    
    searchLineChangeHandler = (e) => {
        this.setState({ searchLine: e.target.value });
        let nameMovies = e.target.name;
        
        if ( nameMovies === 'requestMovie') {
            let regMovie = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u;
            let result = requestMovie.match(regMovie);
            
            if (result !== null) {
                this.setState({
                    isValid: true,
                    Error: ""
                });   
            } else {
                this.setState({
                    isValid: false,
                    Error: "Поиск происходит на Латинском Языке"
                });
            }
        }
    }
    
    searchBoxSubmitHandler = (e) => {
        let data = new FormData(e.target);
        let nameToMovie = data.get('requestMovie');
        fetch(`${url}s=${nameToMovie}&apikey=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                store.dispatch({
                    type:requestMovie,
                    addToNewFilm: data.Search,
                })
            })
            .catch(error => {
                console.log(error)
            })
        e.preventDefault();
    }

    render() {
        const { searchLine } = this.state;

        return (
            <div className="search-box">
                <form className="search-box__form" onSubmit={this.searchBoxSubmitHandler}>
                    <label className="search-box__form-label">
                        Искать фильм по названию:
                        <input
                            value={searchLine}
                            type="text"
                            className="search-box__form-input"
                            placeholder="Например, Shawshank Redemption"
                            onChange={this.searchLineChangeHandler}
                            name="requestMovie"
                        />
                    </label> 
                    <button
                        type="submit"
                        className="search-box__form-submit"
                        disabled={!searchLine}
                    >
                        Искать
                    </button>
                </form>
            <div className="error">{this.state.Error}</div>
            </div>
        );
    }
}

export default SearchBox;