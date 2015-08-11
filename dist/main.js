'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var features = {};
var versions = {};
var versionListeners = {};

var getLowestVersion = function getLowestVersion(implementations) {
  var _Object$getOwnPropertyNames$sort = Object.getOwnPropertyNames(implementations).sort();

  var _Object$getOwnPropertyNames$sort2 = _toArray(_Object$getOwnPropertyNames$sort);

  var first = _Object$getOwnPropertyNames$sort2[0];

  var rest = _Object$getOwnPropertyNames$sort2.slice(1);

  return first;
};

var register = function register(name, implementations) {
  features[name] = implementations;
  versions[name] = getLowestVersion(implementations);
  versionListeners[name] = [];
};

var _module = function _module(name) {
  var version = versions[name];
  var current = features[name][version];
  versionListeners[name].push(function (newVersion) {
    version = newVersion;
    current = features[name][version];
  });
  return function () {
    return current;
  };
};

var set = function set(name, version) {
  if (!features[name] || !features[name][version]) {
    throw new Error('Feature [' + name + '] does not have a version [' + version + ']');
  }
  versions[name] = version;
  versionListeners[name].forEach(function (cb) {
    return cb(version);
  });
};

var listModules = function listModules() {
  return Object.getOwnPropertyNames(features).sort().map(function (moduleName) {
    return {
      module: moduleName,
      current: versions[moduleName],
      availableVersions: Object.getOwnPropertyNames(features[moduleName]).sort()
    };
  });
};

var dashboard = function dashboard(request, response) {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  _fs2['default'].createReadStream(_path2['default'].join(__dirname, '..', 'html', 'dashboard.html')).pipe(response);
};

exports['default'] = {
  register: register, module: _module, set: set, listModules: listModules, dashboard: dashboard
};
module.exports = exports['default'];