import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';

let dashboardTemplate = handlebars.compile(fs.readFileSync(path.join(__dirname, '..', 'html', 'dashboard.html'), 'utf8'));

export default function({baseUrl = '', pageTitle = '', feat}) {
  return function(request, response) {
    if (request.url === baseUrl + '/feature/all') {
       response.writeHead(200, {'Content-Type': 'application/json'});
       response.end(JSON.stringify(feat.listModules()));
       return;
    };
    if (request.url === baseUrl + '/feature/dashboard') {
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.end(dashboardTemplate({baseUrl, pageTitle}));
      return;
    }
    let parse = request.url.match(/\/feature\/(\w+):(\w+)$/)
    if (parse) {
      feat.set(parse[1], parse[2]);
      response.writeHead(200, {'Content-Type': 'application/json'})
      response.end('{"success": true}');
    }
    else {
      response.writeHead(400, {'Content-Type': 'application/json'});
      response.end('{"success": false}');
    }
  };
};
