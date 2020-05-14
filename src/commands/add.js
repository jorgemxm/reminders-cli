import applescript from 'applescript-promise';
import moment from 'moment';
import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import { DateRange } from '../utils';

const tic = chalk.green('✓');
const tac = chalk.red('✗');

const spinner = ora();

const scriptPath = `${__dirname}/../scripts/add_reminder.applescript`;

const addReminder = async (providedArgs = {}) => {
  let info = providedArgs;
  const questions = [];
  let reminderDate = null;

  if (!providedArgs.name) {
    questions.push(
      {
        type: 'input',
        name: 'name',
        message: 'What\'s the name of the reminder?',
      },
    );
  } else {
    console.log(`${tic} Creating ${info.name}...`);
  }

  if (!providedArgs.date) {
    const dateRange = new DateRange();
    const choices = dateRange.getDateChoices();

    questions.push(
      {
        type: 'list',
        name: 'date',
        message: 'What\'s the due date of the reminder?',
        choices,
        filter: date => dateRange.getDateValueBasedOnLabel(date).value,
      },
      {
        type: 'input',
        name: 'date',
        message: 'What\'s the due date of the reminder?',
        when: ({ date }) => dateRange.checkIsCustomDate(date),
      },
    );
  }

  if (!providedArgs.time) {
    questions.push(
      {
        type: 'input',
        name: 'time',
        message: 'What\'s the time of the reminder?',
      },
    );
  }

  if (questions.length) {
    const response = await inquirer.prompt(questions);

    info = {
      ...info,
      ...response,
    };
  }

  spinner.start();

  spinner.text = 'Creating the new reminder...';

  try {
    info.name = `${info.name[0].toUpperCase()}${info.name.slice(1)}`;

    // moment('12/25/2018-14:30', "MM/DD/YYYY-HH:mm");
    reminderDate = moment(`${info.date}-${info.time}`, 'DD/MM/YYYY-HH:mm');
    // console.log('[DEBUG:date]', info.date);

    // Date Format for AppleScript: "Tuesday, Dec 25, 2018 at 02:30:00 PM"
    info.appleDate = reminderDate.format('dddd, MMM DD, gggg [at] hh:mm:ss A');

    await applescript.execFile(scriptPath, Object.values(info));

    spinner.stop();

    console.log(`${tic} Reminder created successfully!`);
    // console.log(`${tic} ${info.name} on ${info.date} at ${info.time}.`);
    console.log(`${tic} ${info.name} on ${info.appleDate}.`);
  } catch (err) {
    spinner.stop();

    console.log(`${tac} There was an error while trying to add the reminder. 😕`);
  }
};

export default addReminder;
