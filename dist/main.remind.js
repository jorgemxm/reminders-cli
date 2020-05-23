"use strict";

var _meow = _interopRequireDefault(require("meow"));

var _commands = require("./commands");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cli = (0, _meow.default)(`
  Usage:
    $ remind <input>     (Emojis are supported)
    $ reminders

  Options:
    --list, -l          - List all reminders (will trigger if no option is provided).
    --complete, -c      - List all reminders and enable a selector to be completed

  Examples:
    $ remind me to feed the 🦊 tomorrow at 13:00
    $ remind me tomorrow at 13 to feed the 🦊
    $ remind me at 6pm to buy Apples
    $ remind me Go home in 2 hours
    $ remind me next sunday at 16 to watch a movie
    $ remind me July 24 at 3pm Prepare Party 🎉
    $ remind -c
`, {
  flags: {
    help: {
      type: 'boolean',
      alias: 'h'
    },
    complete: {
      type: 'boolean',
      alias: 'c'
    },
    list: {
      type: 'boolean',
      alias: 'l'
    }
  }
});

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

  const data = {
    name: parsedPhrase.name,
    date: parsedPhrase.startDate,
    time: parsedPhrase.startTime
  };
  return (0, _commands.add)(data);
};

(0, _utils.updateNotify)();
run();