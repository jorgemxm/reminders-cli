import meow from 'meow';
import { add, complete, list } from './commands';
import { date, updateNotify } from './utils';

const cli = meow(
  `
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
`,
  {
    flags: {
      help: {
        type: 'boolean',
        alias: 'h',
      },
      complete: {
        type: 'boolean',
        alias: 'c',
      },
      list: {
        type: 'boolean',
        alias: 'l',
      },
    },
  }
);

const run = () => {
  if ((!cli.input.length && !Object.keys(cli.flags).length) || cli.flags.list) {
    return list();
  }

  if (cli.flags.complete) {
    return complete(typeof cli.flags.complete !== 'boolean' && cli.flags.complete);
  }

  const phrase = cli.input.join(' ');
  const parsedPhrase = date.parsePhrase(phrase);

  if (!parsedPhrase) {
    return add();
  }

  const data = {
    name: parsedPhrase.name,
    date: parsedPhrase.startDate,
    time: parsedPhrase.startTime,
  };

  return add(data);
};

updateNotify();
run();
