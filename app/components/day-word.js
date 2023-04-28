import Component from '@ember/component';

export default Component.extend({
  dayWord: "Hi",


  init() {
    this._super(...arguments);
    this.getWords();
  },

  async getWords() {
    let randomNumber = Math.floor(Math.random() * 340);

    const response = await fetch('https://challenge.trio.dev/api/v1/wordle-words');
    let words = await response.json();

    this.set('dayWord', words[randomNumber]);
  }
});
