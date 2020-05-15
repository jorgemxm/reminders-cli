'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateReminder = exports.getReminderDate = exports.getReminders = undefined;

var _applescriptPromise = require('applescript-promise');

var _applescriptPromise2 = _interopRequireDefault(_applescriptPromise);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getRemindersPath = `${__dirname}/../scripts/get_reminders.applescript`;
const updateReminderPath = `${__dirname}/../scripts/update_reminder.applescript`;
const getReminderPath = `${__dirname}/../scripts/get_reminder.applescript`;

const spinner = (0, _ora2.default)();

const getReminders = exports.getReminders = () => _applescriptPromise2.default.execFile(getRemindersPath);
const getReminderDate = exports.getReminderDate = async ({ name }) => {
  const date = await _applescriptPromise2.default.execFile(getReminderPath, [name]);
  // console.log('[DEBUG:getDate]', date);
  return (0, _moment2.default)(date, 'dddd, MMM DD, YYYY H:mm:ss').format('DD/MM/YYYY-HH:mm').split('-');
};

const showReminderList = async () => {
  spinner.start();

  spinner.text = 'Loading reminders';

  const reminders = await getReminders();

  spinner.stop();

  const reminderList = [{
    type: 'list',
    name: 'name',
    message: 'Reminders',
    choices: reminders
  }];

  const chosenReminder = await _inquirer2.default.prompt(reminderList);

  spinner.start();

  spinner.text = 'Loading reminder information';

  const reminderDate = await getReminderDate(chosenReminder);

  spinner.stop();

  const dateRange = new _utils.DateRange(reminderDate[0]);
  const choices = dateRange.getDateChoices();

  const questions = [{
    type: 'input',
    name: 'name',
    message: 'What\'s the name of the reminder?',
    default: chosenReminder.name
  }, {
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
  }, {
    type: 'input',
    name: 'time',
    message: 'What\'s the time of the reminder?',
    default: reminderDate[1]
  }];

  const response = await _inquirer2.default.prompt(questions);

  updateReminder(chosenReminder.name, response);
};

const updateReminder = exports.updateReminder = async (reminderName, { name, date, time }) => {
  spinner.start();
  spinner.text = 'Updating reminder';

  const datetime = (0, _moment2.default)(`${date} ${time}`, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm');
  const args = [reminderName, name, datetime];

  try {
    await _applescriptPromise2.default.execFile(updateReminderPath, args);

    spinner.stop();

    console.log(`${_chalk2.default.green('✓')} Reminder ${name} updated!`);
  } catch (err) {
    spinner.stop();

    console.log(`${_chalk2.default.red('✗')} There was an error while trying to update reminder. 😕`);
  }
};

exports.default = showReminderList;