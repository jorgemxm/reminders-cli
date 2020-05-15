'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parsePhrase = undefined;

var _chronoNode = require('chrono-node');

var _chronoNode2 = _interopRequireDefault(_chronoNode);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DATE_PHRASE_SPECIAL_WORDS = ['me', 'to', 'on'];

const clearPhrase = phrase => {
  const wordsToRemove = [...DATE_PHRASE_SPECIAL_WORDS];

  return phrase.split(' ').reduce((words, word) => {
    if (wordsToRemove.includes(word)) {
      wordsToRemove.splice(wordsToRemove.indexOf(word), 1);

      return `${words}`;
    }

    return `${words} ${word}`.trim();
  }, '');
};

// eslint-disable-next-line import/prefer-default-export
const parsePhrase = exports.parsePhrase = phrase => {
  const [parsedPhrase] = _chronoNode2.default.parse(phrase);

  if (!parsedPhrase) {
    return null;
  }

  const eventName = phrase.replace(parsedPhrase.text, '');

  const startDate = parsedPhrase.start && (0, _moment2.default)(parsedPhrase.start.date()).format('DD/MM/YYYY-HH:mm').split('-');
  const endDate = parsedPhrase.end && (0, _moment2.default)(parsedPhrase.end.date()).format('DD/MM/YYYY-HH:mm').split('-');

  return {
    name: clearPhrase(eventName),
    startDate: startDate && startDate[0],
    startTime: startDate && startDate[1],
    endDate: endDate && endDate[0],
    endTime: endDate && endDate[1]
  };
};