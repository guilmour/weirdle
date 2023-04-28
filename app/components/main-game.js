import Component from '@ember/component';
import {computed} from '@ember/object';
import {later} from '@ember/runloop';
import { htmlSafe } from '@ember/template';

export default Component.extend({
  dayWord: null,
  shortcutKey: null,
  inputWord: '',
  triesCount: [],
  saveRow: false,
  MAX_ATTEMPTS: 6,
  isGameFinished: false,
  notificationMessage: "",

  init() {
    this._super(...arguments);
    this.getWords();
    let self = this;
    addEventListener('keydown', function() {
      self.didKeyPress(event);
    });

    this.showNotification(htmlSafe('Write with your keyboard and use Enter to submit. <br> <br> 🟢 Green is right letter on the right place. <br> 🟠 Orange is for a present letter but on the wrong position.'), 5);

    this.triesCount.push(1);
  },


  isGameFinishedRight: computed('inputWord', function() {
    return this.inputWord === this.dayWord;
  }),

  isGameFinishedWrong: computed('triesCount.length', function() {
    return this.triesCount.length > this.MAX_ATTEMPTS;
  }),

  notEnoughLetters: computed('inputWord.length', function() {
    return this.inputWord.length <= 4;
  }),

  didKeyPress(event) {
    if (this.isGameFinishedRight || this.isGameFinishedWrong) {
      this.set('isGameFinished', true);
    }

    if (!this.isGameFinished) {
      const key = event.key;
      const typedChar = String.fromCharCode(event.keyCode);

      // https://stackoverflow.com/questions/9906885/detect-backspace-and-del-on-input-event
      if (key === 'Backspace' || key === 'Delete') {
        this.set('inputWord', this.inputWord.slice(0, -1));
      }

      if (key === 'Enter' && this.triesCount.length <= this.MAX_ATTEMPTS) {

        if (this.notEnoughLetters) {
          this.showNotification('Not enough letters ❌', 1.5);
        } else {
            this.triesCount.pushObject(1);

            later(this, function() {
              this.set('inputWord', '');
            }, 500);
        }

      } else if (this.notEnoughLetters && this.isLetter(typedChar)) {
        this.set('inputWord', this.inputWord + typedChar);
      }
    }
  },

  isLetter(str) {
    // https://stackoverflow.com/questions/9862761/how-to-check-if-character-is-a-letter-in-javascript
    return str.length === 1 && str.match(/[a-z]/i);
  },

  async getWords() {
    let randomNumber = Math.floor(Math.random() * 340);

    const response = await fetch(
      'https://challenge.trio.dev/api/v1/wordle-words');
    let words = await response.json();

    this.set('dayWord', words[randomNumber]);
    console.log('the correct word is: ' + words[randomNumber]);
  },

  showNotification(message, seconds) {
    this.set('notificationMessage', message);

    later(this, function() {
      this.set('notificationMessage', '');
    }, seconds * 1000);
  },

});
