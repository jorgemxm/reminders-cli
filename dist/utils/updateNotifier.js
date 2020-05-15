'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _updateNotifier = require('update-notifier');

var _updateNotifier2 = _interopRequireDefault(_updateNotifier);

var _boxen = require('boxen');

var _boxen2 = _interopRequireDefault(_boxen);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = () => {
  (0, _updateNotifier2.default)({
    pkg: _package2.default,
    callback: (data, update) => {
      if (!update || _package2.default.version === update.latest) {
        return;
      }

      const message = _chalk2.default.cyan(`There's an update of ${_package2.default.name} available:`, _chalk2.default.dim(_package2.default.version), _chalk2.default.reset('→'), _chalk2.default.blue(update.latest), _chalk2.default.dim('\nRun'), _chalk2.default.green(_chalk2.default.bold(`npm i -g ${_package2.default.name}`)), _chalk2.default.dim('to update.'));

      const boxenOptions = {
        padding: 1,
        borderColor: 'blue',
        dimBorder: true,
        float: 'center',
        align: 'center',
        margin: 1
      };

      console.log((0, _boxen2.default)(message, boxenOptions));
    }
  });
};