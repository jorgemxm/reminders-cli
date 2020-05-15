'use strict';

require('babel-polyfill');

var _meow = require('meow');

var _meow2 = _interopRequireDefault(_meow);

var _commands = require('./commands');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cli = (0, _meow2.default)(`
  Usage
    $ remind <input>
    $ reminders

  Options
    --list      - List all reminders (will trigger if no option is provided).
    --complete  - List all reminders and enable a selector to be completed

  Examples
    $ remind me to feed the cats tomorrow at 13:00
    $ remind me at 6pm to buy milk
    $ remind me Go home in 2 hours
    $ reminders --list
`);

const run = () => {
  if (!cli.input.length && !Object.keys(cli.flags).length || cli.flags.list) {
    return (0, _commands.list)();
  }

  if (cli.flags.complete) {
    return (0, _commands.complete)(typeof cli.flags.complete !== 'boolean' && cli.flags.complete);
  }

  const phrase = cli.input.join(' ');

  const parsedPhrase = _utils.date.parsePhrase(phrase);

  if (!parsedPhrase) {
    return (0, _commands.add)();
  }

  return (0, _commands.add)({
    name: parsedPhrase.name,
    date: parsedPhrase.startDate,
    time: parsedPhrase.startTime
  });
};

(0, _utils.updateNotifier)();
run();