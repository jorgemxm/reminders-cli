import chrono from 'chrono-node';
import moment from 'moment';

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
export const parsePhrase = phrase => {
  const localTimezone = new Date();
  const [parsedPhrase] = chrono.parse(phrase, moment().utcOffset(localTimezone.toISOString()));

  if (!parsedPhrase) {
    return null;
  }

  const eventName = phrase.replace(parsedPhrase.text, '');

  const startDate =
    parsedPhrase.start && moment(parsedPhrase.start.date()).format('DD/MM/YYYY-HH:mm').split('-');

  const endDate =
    parsedPhrase.end && moment(parsedPhrase.end.date()).format('DD/MM/YYYY-HH:mm').split('-');

  return {
    name: clearPhrase(eventName),
    startDate: startDate && startDate[0],
    startTime: startDate && startDate[1],
    endDate: endDate && endDate[0],
    endTime: endDate && endDate[1],
  };
};
