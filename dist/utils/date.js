"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parsePhrase = void 0;

var _chronoNode = _interopRequireDefault(require("chrono-node"));

var _moment = _interopRequireDefault(require("moment"));

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
}; // eslint-disable-next-line import/prefer-default-export


const parsePhrase = phrase => {
  const localTimezone = new Date();

  const [parsedPhrase] = _chronoNode.default.parse(phrase, (0, _moment.default)().utcOffset(localTimezone.toISOString()));

  if (!parsedPhrase) {
    return null;
  }

  const eventName = phrase.replace(parsedPhrase.text, '');
  const startDate = parsedPhrase.start && (0, _moment.default)(parsedPhrase.start.date()).format('DD/MM/YYYY-HH:mm').split('-');
  const endDate = parsedPhrase.end && (0, _moment.default)(parsedPhrase.end.date()).format('DD/MM/YYYY-HH:mm').split('-');
  return {
    name: clearPhrase(eventName),
    startDate: startDate && startDate[0],
    startTime: startDate && startDate[1],
    endDate: endDate && endDate[0],
    endTime: endDate && endDate[1]
  };
};

exports.parsePhrase = parsePhrase;