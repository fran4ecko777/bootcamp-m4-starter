import React, { Component } from 'react';
import './SearchBox.css';
import store from '../redux/store';
import {requestMovie} from '../actions/MovieAction'; 


const apiKey = 'd24afc9b';
const url = 'https://www.omdbapi.com/?';


class SearchBox extends Component {
    state = {
        searchLine: '',
        isValid: false,
        NameError: "",
    }
    
    searchLineChangeHandler = (e) => {
        this.setState({ searchLine: e.target.value });
        let regMovie = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u;
        let result = requestMovie.match(regMovie);
        
        
        
        if (result !== null) {
            this.setState({
                isValid: true,
                NameError: ""
            });   
        } else {
            this.setState({
                isValid: false,
                NameError: "Поиск происходит на Латинском Языке"
            });
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
                    <div className="error">{this.state.fullNameError}</div>
                    <button
                        type="submit"
                        className="search-box__form-submit"
                        disabled={!searchLine}
                    >
                        Искать
                    </button>
                </form>
            </div>
        );
    }
}

export default SearchBox;