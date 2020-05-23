'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _applescriptPromise = require('applescript-promise');

var _applescriptPromise2 = _interopRequireDefault(_applescriptPromise);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const tic = _chalk2.default.green('✓');
const tac = _chalk2.default.red('✗');

const spinner = (0, _ora2.default)();

const scriptPath = `${__dirname}/../scripts/add_reminder.applescript`;

const version = _os2.default.release();
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
      message: 'What\'s the name of the reminder?'
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
      message: 'What\'s the due date of the reminder?',
      choices,
      filter: date => dateRange.getDateValueBasedOnLabel(date).value
    }, {
      type: 'input',
      name: 'date',
      message: 'What\'s the due date of the reminder?',
      when: ({ date }) => dateRange.checkIsCustomDate(date)
    });
  }

  if (!providedArgs.time) {
    questions.push({
      type: 'input',
      name: 'time',
      message: 'What\'s the time of the reminder?'
    });
  }

  if (questions.length) {
    const response = await _inquirer2.default.prompt(questions);

    info = _extends({}, info, response);
  }

  spinner.start();

  spinner.text = 'Creating the new reminder...';

  try {
    info.name = `${info.name[0].toUpperCase()}${info.name.slice(1)}`;

    // moment('12/25/2018-14:30', "MM/DD/YYYY-HH:mm");
    reminderDate = (0, _moment2.default)(`${info.date}-${info.time}`, 'DD/MM/YYYY-HH:mm');

    if (isCatalina) {
      // Date Format for AppleScript: "Friday, 5 June 2020, 3:00:00 PM"
      info.appleDate = reminderDate.format('dddd, DD MMM gggg, hh:mm:ss A');
    } else {
      // Date Format for AppleScript NOT Catalina: "Tuesday, Dec 25, 2018 at 02:30:00 PM"
      info.appleDate = reminderDate.format('dddd, MMM DD, gggg [at] hh:mm:ss A');
    }

    await _applescriptPromise2.default.execFile(scriptPath, Object.values(info));

    spinner.stop();

    console.log(`${tic} Reminder created successfully!`);
    console.log(`${tic} ${info.name} on ${info.appleDate}.`);
  } catch (err) {
    spinner.stop();

    console.log(`${tac} There was an error while trying to add the reminder. 😕`);
  }
};

exports.default = addReminder;