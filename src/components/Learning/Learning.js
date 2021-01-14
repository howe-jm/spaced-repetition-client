import React, { Component } from 'react';
import config from '../../config';
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext';
import './Learning.css';

class Dashboard extends Component {
  static contextType = UserContext;

  state = { word: {}, guess: '', guessResult: { correct: null } };

  fetchNextWord = () => {
    const { API_ENDPOINT } = config;
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: { authorization: `Bearer ${TokenService.getAuthToken()}` },
    };

    fetch(`${API_ENDPOINT}/language/head`, requestOptions)
      .then((response) => response.json())
      .then((result) => this.setState({ word: result }))
      .catch((error) => console.log('error', error));
  };

  submitGuess = () => {
    const { API_ENDPOINT } = config;
    const raw = JSON.stringify({ guess: this.state.guess });

    var requestOptions = {
      method: 'POST',
      redirect: 'follow',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${TokenService.getAuthToken()}` },
      body: raw,
    };

    fetch(`${API_ENDPOINT}/language/guess`, requestOptions)
      .then((response) => response.json())
      .then((result) => this.setState({ guessResult: result }))
      .catch((error) => console.log('error', error));
  };

  componentDidMount() {
    this.fetchNextWord();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.submitGuess();
  };

  renderAnswer = () => {
    const { isCorrect } = this.state.guessResult;

    if (isCorrect === true) {
      return (
        <div className='answer-container'>
          <div className='answer-word'>
            <h2> Correct! </h2>
            <h3>{this.state.word.nextWord}</h3> translates to: <h3>{this.state.guessResult.answer}</h3>
          </div>
          <form className='card-form'>
            <button className='submit-card' onClick={(e) => this.nextWord(e)}>
              Next Word
            </button>
            <button className='submit-card' onClick={(e) => this.handleDashboardClick(e)}>
              Back to Dashboard
            </button>
          </form>
        </div>
      );
    } else if (isCorrect === false) {
      return (
        <div className='answer-container'>
          <div className='answer-word'>
            <h2> Incorrect! </h2>
            <h3>{this.state.word.nextWord}</h3> translates to: <h3>{this.state.guessResult.answer}</h3>
          </div>
          <form className='card-form'>
            <button className='submit-card' onClick={(e) => this.nextWord(e)}>
              Next Word
            </button>
            <button className='submit-card' onClick={(e) => this.handleDashboardClick(e)}>
              Back to Dashboard
            </button>
          </form>
        </div>
      );
    } else {
      return <div>NOTHING</div>;
    }
  };

  nextWord = (e) => {
    e.preventDefault();
    this.fetchNextWord();

    this.setState({ guessResult: { isCorrect: null } });
  };

  renderTest = () => {
    const { isCorrect } = this.state.guessResult;
    if (isCorrect == null) {
      return this.testCard();
    }
    return this.renderAnswer();
  };

  testCard = () => {
    return (
      <div className='test-card-container'>
        <h3>Total Score: {this.state.word.totalScore}</h3>
        <div className='this-word'>
          <h3>{this.state.word.nextWord}</h3>
          <p>Correct Guesses: {this.state.word.wordCorrectCount}</p>
          <p>Incorrect Guesses: {this.state.word.wordIncorrectCount}</p>
        </div>
        <form className='card-form' onSubmit={(e) => this.handleSubmit(e)}>
          <input
            type='text'
            className='guess-input'
            onChange={(event) => this.setState({ guess: event.target.value })}
            required
          />
          <button className='submit-card'>Submit Guess</button>
        </form>
        <form onSubmit={(e) => this.handleDashboardClick(e)}>
          <button className='to-dashboard'>Back to Dashboard</button>
        </form>
      </div>
    );
  };

  handleDashboardClick = (e) => {
    e.preventDefault();
    window.location.href = '/';
  };

  render() {
    return <div className='learning-container'>{this.renderTest()}</div>;
  }
}

export default Dashboard;
