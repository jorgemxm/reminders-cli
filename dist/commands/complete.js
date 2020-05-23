"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.complete = exports.completeReminder = void 0;

var _applescriptPromise = _interopRequireDefault(require("applescript-promise"));

var _ora = _interopRequireDefault(require("ora"));

var _inquirer = _interopRequireDefault(require("inquirer"));

var _chalk = _interopRequireDefault(require("chalk"));

var _list = require("./list");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const completeReminderPath = `${__dirname}/../scripts/complete_reminder.applescript`;
const spinner = (0, _ora.default)();

const completeReminder = async (name, isSearch) => {
  spinner.start('Completing reminder...');

  try {
    await _applescriptPromise.default.execFile(completeReminderPath, [name]);
    spinner.stop();

    if (isSearch) {
      return console.log(`${_chalk.default.green('✓')} Reminders matching "${name}" have been completed!`);
    }

    return console.log(`${_chalk.default.green('✓')} Reminder ${name} completed!`);
  } catch (err) {
    spinner.stop();
    return console.log(`${_chalk.default.red('✗')} There was an error while trying to complete the reminder. 😕`);
  }
};

exports.completeReminder = completeReminder;

const complete = async (name = null) => {
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
  const {
    name: reminderName
  } = await _inquirer.default.prompt(reminderList);
  return completeReminder(reminderName);
};

exports.complete = complete;