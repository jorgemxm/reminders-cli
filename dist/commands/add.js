"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _applescriptPromise = _interopRequireDefault(require("applescript-promise"));

var _moment = _interopRequireDefault(require("moment"));

var _chalk = _interopRequireDefault(require("chalk"));

var _ora = _interopRequireDefault(require("ora"));

var _inquirer = _interopRequireDefault(require("inquirer"));

var _os = _interopRequireDefault(require("os"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const tic = _chalk.default.green('✓');

const tac = _chalk.default.red('✗');

const spinner = (0, _ora.default)();
const scriptPath = `${__dirname}/../scripts/add_reminder.applescript`;

const version = _os.default.release();

const osVersion = version.split('.').shift();
const isCatalina = osVersion >= 19;

const addReminder = async (providedArgs = {}) => {
  let info = providedArgs;
  const questions = [];
  let reminderDate = null;

  if (!providedArgs.name) {
    questions.push({
      type: 'input',
      name: 'name',
      message: "What's the name of the reminder?"
    });
  } else {
    console.log(`${tic} Creating ${info.name}...`);
  }

  if (!providedArgs.date) {
    const dateRange = new _utils.DateRange();
    const choices = dateRange.getDateChoices();
    questions.push({
      type: 'list',
      name: 'date',
      message: "What's the due date of the reminder?",
      choices,
      filter: date => dateRange.getDateValueBasedOnLabel(date).value
    }, {
      type: 'input',
      name: 'date',
      message: "What's the due date of the reminder?",
      when: ({
        date
      }) => dateRange.checkIsCustomDate(date)
    });
  }

  if (!providedArgs.time) {
    questions.push({
      type: 'input',
      name: 'time',
      message: "What's the time of the reminder?"
    });
  }

  if (questions.length) {
    const response = await _inquirer.default.prompt(questions);
    info = { ...info,
      ...response
    };
  }

  spinner.start();
  spinner.text = 'Creating the new reminder...';

  try {
    info.name = `${info.name[0].toUpperCase()}${info.name.slice(1)}`; // moment('12/25/2018-14:30', "MM/DD/YYYY-HH:mm");

    reminderDate = (0, _moment.default)(`${info.date}-${info.time}`, 'DD/MM/YYYY-HH:mm');

    if (isCatalina) {
      // Date Format for AppleScript: "Friday, 5 June 2020, 3:00:00 PM"
      info.appleDate = reminderDate.format('dddd, DD MMM gggg, hh:mm:ss A');
    } else {
      // Date Format for AppleScript NOT Catalina: "Tuesday, Dec 25, 2018 at 02:30:00 PM"
      info.appleDate = reminderDate.format('dddd, MMM DD, gggg [at] hh:mm:ss A');
    }

    await _applescriptPromise.default.execFile(scriptPath, Object.values(info));
    spinner.stop();
    console.log(`${tic} Reminder created successfully!`);
    console.log(`${tic} ${info.name} on ${info.appleDate}.`);
  } catch (err) {
    spinner.stop();
    console.log(`${tac} There was an error while trying to add the reminder. 😕`);
  }
};

var _default = addReminder;
exports.default = _default;