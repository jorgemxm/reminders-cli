import moment from 'moment';
import { parsePhrase } from '../date';

it('should parse phrases correctly', () => {
  const phrases = [
    {
      phrase: 'remind me to feed the tigers tomorrow at 6 am',
      parsedPhrase: 'feed the tigers',
      date: moment().add(1, 'day').format('DD/MM/YYYY'),
      time: '06:00',
    },
    {
      phrase: 'remind me in two hours to take a break',
      parsedPhrase: 'take a break',
      date: moment().format('DD/MM/YYYY'),
      time: moment().add(2, 'hours').format('HH:mm'),
    },
    {
      phrase: 'remind me to do some deep breathing in 10 minutes',
      parsedPhrase: 'do some deep breathing',
      date: moment().format('DD/MM/YYYY'),
      time: moment().add(10, 'minutes').format('HH:mm'),
    },
    {
      phrase: 'remind me at 3pm to wash the dishes',
      parsedPhrase: 'wash the dishes',
      date: moment().format('DD/MM/YYYY'),
      time: '15:00',
    },
    {
      phrase: 'remind me to wash the dishes at 4:00 pm tomorrow',
      parsedPhrase: 'wash the dishes',
      date: moment().add(1, 'day').format('DD/MM/YYYY'),
      time: '16:00',
    },
    {
      phrase: 'remind me on friday at 9pm to go party',
      parsedPhrase: 'go party',
      date: moment().startOf('week').add(5, 'days').format('DD/MM/YYYY'),
      time: '21:00',
    },
    {
      phrase: 'remind me to feed the doggies tomorrow at 12',
      parsedPhrase: 'feed the doggies',
      date: moment().add(1, 'day').format('DD/MM/YYYY'),
      time: '12:00',
    },
  ];

  phrases.forEach(({ phrase, parsedPhrase, date, time }) => {
    const { name, startDate, startTime } = parsePhrase(phrase.replace(/remind/i, ''));

    expect(name).toBe(parsedPhrase);
    expect(startDate).toBe(date);
    expect(startTime).toBe(time);
  });
});
