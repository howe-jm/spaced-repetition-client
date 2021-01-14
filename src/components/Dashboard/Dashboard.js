import React, { Component } from 'react';
import config from '../../config';
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext';
import './Dashboard.css';

class Dashboard extends Component {
  static contextType = UserContext;

  state = { language: '', totalScore: '', words: [] };

  fetchLanguage = () => {
    const { API_ENDPOINT } = config;
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: { authorization: `Bearer ${TokenService.getAuthToken()}` },
    };

    fetch(`${API_ENDPOINT}/language`, requestOptions)
      .then((response) => response.json())
      .then((result) =>
        this.setState({ language: result.language.name, words: result.words, totalScore: result.language.total_score })
      )
      .catch((error) => console.log('error', error));
  };

  componentDidMount() {
    this.fetchLanguage();
  }

  wordCard = (card) => {
    return (
      <div className='word-card' key={card.id}>
        <h3 className='original-word'>{card.original}</h3>
        <p className='card-counter'>Times Attempted: {card.correct_count + card.incorrect_count}</p>
        <p className='card-counter'>Correct Guesses: {card.correct_count}</p>
        <p className='card-counter'>Incorrect Guesses: {card.incorrect_count}</p>
      </div>
    );
  };

  handleSubmit = (event) => {
    event.preventDefault();
    window.location.href = '/learn';
  };

  render() {
    return (
      <div className='dashboard-container'>
        <h2 className='dashboard-language-name'>{this.state.language}</h2>
        <p>Total correct answers: {this.state.totalScore}</p>
        <form className='start-form' onSubmit={(e) => this.handleSubmit(e)}>
          <button className='start-button'>Begin Spaced Repetition</button>
        </form>
        {this.state.words.map((word) => this.wordCard(word))}
      </div>
    );
  }
}

export default Dashboard;
