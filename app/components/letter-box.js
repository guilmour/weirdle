import Component from '@ember/component';

export default Component.extend({
  letter: null,
  dayWord: null,
  index: null,

  init() {
    this._super(...arguments);
  },

  get isLetterContained() {
      return !this.isLetterOnRightPlace && this.dayWord?.includes(this.letter);
  },

  get isLetterOnRightPlace() {
      return this.dayWord ? this.dayWord[this.index] === this.letter : null;
  },

  get boxColor() {
    if (this.isLetterOnRightPlace) { return 'green'; }
    else if (this.isLetterContained) { return 'orange'; }
    return 'blue';
  }

});
