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
        <input id="guess" type="text" value={this.state.value} onChange={this.handleChange} />
        <input type="submit" value="Guess" />
      </form>
    );
  }
}

class NewGame extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.props.startNewGame();
    event.preventDefault();
  }

  render() {
    return (
      <form id="newgame" onSubmit={this.startNewGame}>
        <input type="submit" value="New Game" />
      </form>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requestFailed: false
    }
  }

  componentDidMount() {
    fetch("http://setgetgo.com/randomword/get.php")
    .then(response => {
      if (!response.ok) {
        console.log("will throw an Error")
        throw Error("Network request failed")
      }
      return response
    })
    .then(response => {
      let word = response.text()
      console.log("word:"+word)
      return word
    })
    .then(d => {
      let word = d
      console.log("word:"+word)
      this.game = new HangpersonGame(word)
      this.handleGuess = this.handleGuess.bind(this)
      this.setState({
        word: word,
        status: this.game.check_win_or_lose(),
        wrong_guesses: this.game.wrong_guesses,
        word_with_guesses: this.game.word_with_guesses()
      })
    }, () => {
      this.setState({
        requestFailed: true
      })
    })
  }

  startNewGame() {
    this.game = new HangpersonGame('garply');
    this.setState({
      status: this.game.check_win_or_lose(),
      wrong_guesses: this.game.wrong_guesses,
      word_with_guesses: this.game.word_with_guesses(),
    });
  }

  handleGuess(letter) {
    if (this.state.status !== 'play'){
      // do nothing is the game is over
      return;
    }
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
      this.setState(
        {
          status: error.message
        });
    }
  }

  render() {
    if (this.state.requestFailed) return <p>Failed</p>
    if (!this.state.word) return <p>Loading...</p>
    let message = "";
    if (this.state.status === "play"){
      message = "Keep playing!";
    }else if (this.state.status === "win"){
      message = "You won!";
    }else if (this.state.status === "lose"){
      message = "You lost!";
    }else {
      message = this.state.status;
    }

    return (
    <div id="game">
      <h1>Hangperson Game</h1>
      <h2 id="word_with_guesses">{this.state.word_with_guesses}</h2>
      Wrong guesses: {this.state.wrong_guesses}<br/>
      <br/>
      {message}
      <Guess handleGuess={this.handleGuess}/>
      <NewGame startNewGame={this.startNewGame}/>
    </div>)
  }
}

export default App;