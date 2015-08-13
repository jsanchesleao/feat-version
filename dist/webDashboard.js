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

exports['default'] = function (_ref) {
  var _ref$baseUrl = _ref.baseUrl;
  var baseUrl = _ref$baseUrl === undefined ? '' : _ref$baseUrl;
  var _ref$pageTitle = _ref.pageTitle;
  var pageTitle = _ref$pageTitle === undefined ? '' : _ref$pageTitle;
  var feat = _ref.feat;

  return function (request, response) {
    if (request.url === baseUrl + '/feature/all') {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(feat.listModules()));
      return;
    };
    if (request.url === baseUrl + '/feature/dashboard') {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(dashboardTemplate({ baseUrl: baseUrl, pageTitle: pageTitle }));
      return;
    }
    var parse = request.url.match(/\/feature\/(\w+):(\w+)$/);
    if (parse) {
      feat.set(parse[1], parse[2]);
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end('{"success": true}');
    } else {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      response.end('{"success": false}');
    }
  };
};

;
module.exports = exports['default'];