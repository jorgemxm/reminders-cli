'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DateRange {
  // DATE_CHOICES = {};

  constructor(currentDate) {
    this.parseDate = (date = (0, _moment2.default)(), type, quantity) => {
      if (quantity) {
        switch (type) {
          case 'week':
            {
              date.add(quantity, 'week');
              break;
            }
          case 'month':
            {
              date.add(quantity, 'month');
              break;
            }
          default:
            {
              date.add(quantity, 'day');
              break;
            }
        }
      }

      return date.format('DD/MM/YYYY');
    };

    this.today = () => this.parseDate();

    this.tomorrow = date => this.parseDate(date, 'day', 1);

    this.inTwoDays = date => this.parseDate(date, 'day', 2);

    this.nextWeek = date => this.parseDate(date, 'week', 1);

    this.inTwoWeeks = date => this.parseDate(date, 'week', 2);

    this.nextMonth = date => this.parseDate(date, 'month', 1);

    this.inTwoMonths = date => this.parseDate(date, 'month', 2);

    this.getDateChoices = () => Object.keys(this.DATE_CHOICES).map(choice => this.DATE_CHOICES[choice].label);

    this.getDateValueBasedOnLabel = label => Object.keys(this.DATE_CHOICES).reduce((choices, choice) => this.DATE_CHOICES[choice].label === label ? this.DATE_CHOICES[choice] : choices, {});

    this.checkIsCustomDate = date => this.DATE_CHOICES.CUSTOM.value === date;

    this.DATE_CHOICES = {
      CUSTOM: {
        label: 'Custom',
        value: null
      },
      TODAY: {
        label: 'Today',
        value: this.today()
      },
      TOMORROW: {
        label: 'Tomorrow',
        value: this.tomorrow()
      },
      IN_TWO_DAYS: {
        label: 'In two days',
        value: this.inTwoDays()
      },
      NEXT_WEEK: {
        label: 'Next week',
        value: this.nextWeek()
      },
      IN_TWO_WEEKS: {
        label: 'In two weeks',
        value: this.inTwoWeeks()
      },
      NEXT_MONTH: {
        label: 'Next month',
        value: this.nextMonth()
      },
      IN_TWO_MONTHS: {
        label: 'In two months',
        value: this.inTwoMonths()
      }
    };

    if (currentDate) {
      this.DATE_CHOICES = _extends({
        CURRENT: {
          label: `Current (${currentDate})`,
          value: currentDate
        }
      }, this.DATE_CHOICES);
    }
  }

}

exports.default = DateRange;