<p align="center">
<img align="center" src="media/logo.gif" alt="reminders-cli" title="reminders-cli" />
</p>

<h1 align="center">reminders-cli</h1>
<p align="center">
  Command-line interface that uses natural language processing to parse phrases and interact with Reminders.app.
</p>

## Getting started

> TLDR, **Run:**

```shell
npm i -g https://github.com/jorgemxm/reminders-cli.git
remind --help
```

### Usage

```console
$ remind --help, -h

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
```

### Create

```console
$ remind me in two hours to study
```

![Add command](media/add_command.gif 'Add command')

> You can see some examples in the [date parsing test file](https://github.com/jorgemxm/reminders-cli/blob/master/src/utils/__tests__date.spec.js#5).

### List

```console
$ remind --list
$ remind -l
```

![List command](media/list_command.gif 'List command')

### Complete

```console
$ remind --complete
$ remind -c
```

![Complete command](media/complete_command.gif 'Complete command')

> 🔥 It's also possible to provide a name (or part of) to `complete` command:

![Complete command](media/complete_with_arg_command.gif 'Complete command')

### Installation

This package requires NodeJS to be installed.

Go to [https://nodejs.org/en/download/](https://nodejs.org/en/download/) and install the latest LTS version.

### Installing the package

```console
npm i -g https://github.com/jorgemxm/reminders-cli.git
```

### Installing DEVELOPMENT Version:

```console
npm i -g https://github.com/jorgemxm/reminders-cli.git#develop
```

### Uninstalling the package

```console
npm rm -g reminders-cli
```

## Development

1. Install

```console
npm install
```

2. Run build with auto-reloading

```console
npm run watch
```

3. Try commands

```console
node ./dist/index.js --list # To list reminders
node ./dist/index.js --add "My reminder" 11/11/2017 10:30
node ./dist/index.js --add "My reminder"
npx babel-node ./src/index.js --add "My reminder"
```

4. Tests

```console
npm test
```
