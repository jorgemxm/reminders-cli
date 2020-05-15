'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.completeReminder = undefined;

var _applescriptPromise = require('applescript-promise');

var _applescriptPromise2 = _interopRequireDefault(_applescriptPromise);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _list = require('./list');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const completeReminderPath = `${__dirname}/../scripts/complete_reminder.applescript`;

const spinner = (0, _ora2.default)();

const completeReminder = exports.completeReminder = async (name, isSearch) => {
  spinner.start('Completing reminder...');

  try {
    await _applescriptPromise2.default.execFile(completeReminderPath, [name]);

    spinner.stop();

    if (isSearch) {
      return console.log(`${_chalk2.default.green('✓')} Reminders matching "${name}" have been completed!`);
    }

    return console.log(`${_chalk2.default.green('✓')} Reminder ${name} completed!`);
  } catch (err) {
    spinner.stop();

    return console.log(`${_chalk2.default.red('✗')} There was an error while trying to complete the reminder. 😕`);
  }
};

exports.default = async (name = null) => {
  if (name) {
    return completeReminder(name, true);
  }

  spinner.start('Loading reminders');

  const reminders = await (0, _list.getReminders)();

  spinner.stop();

  const reminderList = [{
    type: 'list',
    name: 'name',
    message: 'Reminders',
    choices: reminders
  }];

  const { name: reminderName } = await _inquirer2.default.prompt(reminderList);

  return completeReminder(reminderName);
};