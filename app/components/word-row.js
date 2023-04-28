import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  inputWordProxy: null,
  inputWord: null,
  isSavedRow: false,
  isGameFinished: null,
  notEnoughLetters: null,

  init() {
    this._super(...arguments);

    let self = this;
    addEventListener('keydown', function() {
      self.didKeyPress(event);
    });

    this.set('inputWord', '');
  },

  typedLettersArray: computed('inputWord', function() {
    if (!this.isSavedRow) {
      return [
        this.inputWord[0],
        this.inputWord[1],
        this.inputWord[2],
        this.inputWord[3],
        this.inputWord[4]];
    }
    return [
      this.inputWordProxy[0],
      this.inputWordProxy[1],
      this.inputWordProxy[2],
      this.inputWordProxy[3],
      this.inputWordProxy[4]];
  }),

  didKeyPress(event) {
    if (!this.isGameFinished) {
      const key = event.key;

      if (key === 'Enter' && !this.isSavedRow && !this.notEnoughLetters) {
          this.set('inputWordProxy', this.inputWord);
          this.set('isSavedRow', true);

          removeEventListener('keydown', function() {
            self.didKeyPress(event);
          });
      }
    }
  },


});
