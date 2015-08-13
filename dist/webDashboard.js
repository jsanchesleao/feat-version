'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _handlebars = require('handlebars');

var _handlebars2 = _interopRequireDefault(_handlebars);

var dashboardTemplate = _handlebars2['default'].compile(_fs2['default'].readFileSync(_path2['default'].join(__dirname, '..', 'html', 'dashboard.html'), 'utf8'));

exports['default'] = function (request, response, _ref) {
  var _ref$baseUrl = _ref.baseUrl;
  var baseUrl = _ref$baseUrl === undefined ? '' : _ref$baseUrl;
  var _ref$pageTitle = _ref.pageTitle;
  var pageTitle = _ref$pageTitle === undefined ? '' : _ref$pageTitle;

  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.end(dashboardTemplate({ baseUrl: baseUrl, pageTitle: pageTitle }));
};

;
module.exports = exports['default'];