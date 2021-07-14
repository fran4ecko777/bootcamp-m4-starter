import React, { Component } from 'react';
import './ListPage.css';
// import { Route } from 'react-router';

const urlAlgoritmika = 'https://acb-api.algoritmika.org/api/movies/list/';
const url1 = 'https://www.omdbapi.com/?';
let idUrl = [];
const apiKey = 'd24afc9b';
let result = [];
let clone = [];

class ListPage extends Component {
    state = {
        movies: [
            { Title: '', Year: '', imdbID: '' }
        ]
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        fetch(`${urlAlgoritmika}${id}`)
            .then((response) => {
            return response.json(); 
        })
        .then((data) => {
            data.movies.map(item => {
                idUrl = item.imdbID
                fetch(`${url1}i=${idUrl}&apikey=${apiKey}`)
                .then(response => response.json())
                .then((data) => {
                    clone = JSON.parse(JSON.stringify(data))
                    result.push(clone)
                    this.setState({
                        movies: result,
                    })
                })
                .catch((err) => {
                    console.log(err);
                });
            });
            
        })
        .catch((err) => {
            console.log(err);
        });
    }
    render() { 
        return (
            <div className="list-page">
                <h1 className="list-page__title">Мой список</h1>
                <ul>
                    {this.state.movies.map((item) => {
                        return (
                            <li key={item.imdbID}>
                                <a href="https://www.imdb.com/title/tt0068646/" target="_blank">{item.Title} ({item.Year})</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default ListPage;