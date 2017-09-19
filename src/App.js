import React from 'react';
import './App.css';
import HangpersonGame from './HangpersonGame.js';

class Guess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.props.handleGuess(this.state.value);
    console.log("guess: "+this.state.value);
    this.setState({value: ''});
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <input type="submit" value="Guess" />
      </form>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.game = new HangpersonGame('hello');
    this.handleGuess = this.handleGuess.bind(this);
    this.state = {
      status: this.game.check_win_or_lose(),
      wrong_guesses: this.game.wrong_guesses,
      word_with_guesses: this.game.word_with_guesses()
    };
  }

  handleGuess(letter) {
    try{
      var ok = this.game.guess(letter);
      console.log("ok? "+ok);
      console.log(this.game);
      this.setState(
        {
          status: this.game.check_win_or_lose(),
          wrong_guesses: this.game.wrong_guesses,
          word_with_guesses: this.game.word_with_guesses()
        });
    }catch (error){
      alert("error: "+error.message);
    }
  }

  render() {
    return (
    <div>
      <h1>Guess a letter</h1>
      Wrong guesses: {this.state.wrong_guesses}<br/>
      Word so far: {this.state.word_with_guesses}
      <Guess handleGuess={this.handleGuess}/>
    </div>)
  }
}

export default App;