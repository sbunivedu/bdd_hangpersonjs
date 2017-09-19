function UserException(message) {
   this.message = message;
   this.name = 'UserException';
}

export default class HangpersonGame {
  constructor(word) {
    this.word = word;
    this.letters_in_word = word.split('');
    this.correct_guesses = '';
    this.wrong_guesses = '';
  }

  guess(letter) {
    if (letter == null){
      throw new UserException('Argument Error');
    }
    if (letter.length === 0){
      throw new UserException('Argument Error');
    }
    if (letter.length === 1 && !letter.match(/[a-z]/i)){
      throw new UserException('Argument Error');
    }
    letter = letter.toLowerCase();
    if (this.correct_guesses.includes(letter)){
      return false;
    }
    if (this.wrong_guesses.includes(letter)){
      return false;
    }
    if (this.word.includes(letter)){
      this.correct_guesses = this.correct_guesses.concat(letter);
      return true;
    }else{
      this.wrong_guesses = this.wrong_guesses.concat(letter);
      return true;
    }
  }

  word_with_guesses() {
    var correct_guesses = this.correct_guesses;
    var result = '';
    this.letters_in_word.forEach(function(letter){
      if (correct_guesses.includes(letter)){
        result += letter;
      }else{
        result += '-';
      }
    });
    return result;
  }

  check_win_or_lose() {
    if (this.word.length === this.correct_guesses.length){
      return 'win';
    }else if(this.wrong_guesses.length >= 7){
      return 'lose';
    }else{
      return 'play';
    }
  }
}
