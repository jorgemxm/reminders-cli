"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateReminder = exports.showReminderList = exports.getReminderDate = exports.getReminders = void 0;

var _applescriptPromise = _interopRequireDefault(require("applescript-promise"));

var _ora = _interopRequireDefault(require("ora"));

var _inquirer = _interopRequireDefault(require("inquirer"));

var _moment = _interopRequireDefault(require("moment"));

var _chalk = _interopRequireDefault(require("chalk"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getRemindersPath = `${__dirname}/../scripts/get_reminders.applescript`;
const updateReminderPath = `${__dirname}/../scripts/update_reminder.applescript`;
const getReminderPath = `${__dirname}/../scripts/get_reminder.applescript`;
const spinner = (0, _ora.default)();

const getReminders = () => _applescriptPromise.default.execFile(getRemindersPath);

exports.getReminders = getReminders;

const getReminderDate = async ({
  name
}) => {
  const date = await _applescriptPromise.default.execFile(getReminderPath, [name]);
  return (0, _moment.default)(date, 'dddd, MMM DD, YYYY H:mm:ss').format('DD/MM/YYYY-HH:mm').split('-');
};

exports.getReminderDate = getReminderDate;

const tic = _chalk.default.green('✓');

const tac = _chalk.default.red('✗');

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
  const chosenReminder = await _inquirer.default.prompt(reminderList);
  spinner.start();
  spinner.text = 'Loading reminder information';
  const reminderDate = await getReminderDate(chosenReminder);
  spinner.stop();
  const dateRange = new _utils.DateRange(reminderDate[0]);
  const choices = dateRange.getDateChoices();
  const questions = [{
    type: 'input',
    name: 'name',
    message: `What's the name of the reminder?`,
    default: chosenReminder.name
  }, {
    type: 'list',
    name: 'date',
    message: `What's the due date of the reminder?`,
    choices,
    filter: date => dateRange.getDateValueBasedOnLabel(date).value
  }, {
    type: 'input',
    name: 'date',
    message: `What's the due date of the reminder?`,
    when: ({
      date
    }) => dateRange.checkIsCustomDate(date)
  }, {
    type: 'input',
    name: 'time',
    message: `What's the time of the reminder?`,
    default: reminderDate[1]
  }];
  const response = await _inquirer.default.prompt(questions);
  updateReminder(chosenReminder.name, response);
};

exports.showReminderList = showReminderList;

const updateReminder = async (reminderName, {
  name,
  date,
  time
}) => {
  spinner.start();
  spinner.text = 'Updating reminder';
  const datetime = (0, _moment.default)(`${date} ${time}`, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm');
  const dateMsg = (0, _moment.default)(`${datetime}`, 'YYYY-MM-DD HH:mm').format('dddd, DD MMM gggg, h:mm A');
  const args = [reminderName, name, datetime];

  try {
    await _applescriptPromise.default.execFile(updateReminderPath, args);
    spinner.stop();
    console.log(`${tic} Reminder ${name} updated!`);
    console.log(`${tic} ${name} on ${dateMsg}`);
  } catch (err) {
    spinner.stop();
    console.log(`${tac} There was an error while trying to update reminder. 😔`);
  }
};

exports.updateReminder = updateReminder;