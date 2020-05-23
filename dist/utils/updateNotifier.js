"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateNotify = updateNotify;

var _updateNotifier = _interopRequireDefault(require("update-notifier"));

var _boxen = _interopRequireDefault(require("boxen"));

var _chalk = _interopRequireDefault(require("chalk"));

var _package = _interopRequireDefault(require("../../package.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function updateNotify() {
  const notifier = (0, _updateNotifier.default)({
    pkg: _package.default,
    updateCheckInterval: 1000 * 60 * 60 * 24 * 30 // 30 days

  });

  if (notifier.update) {
    const {
      update: {
        latest = ''
      } = {}
    } = notifier;

    if (_package.default.version === latest) {
      return;
    }

    const message = _chalk.default.cyan(`There's an update of ${_package.default.name} available:`, _chalk.default.dim(_package.default.version), _chalk.default.reset('→'), _chalk.default.blue(latest), _chalk.default.dim('\nRun'), _chalk.default.green(_chalk.default.bold(`npm i -g ${_package.default.name}`)), _chalk.default.dim('to update.'));

    const boxenOptions = {
      padding: 1,
      borderColor: 'blue',
      dimBorder: true,
      float: 'center',
      align: 'center',
      margin: 1
    };
    console.log((0, _boxen.default)(message, boxenOptions));
  }
}