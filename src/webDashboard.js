import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';

let dashboardTemplate = handlebars.compile(fs.readFileSync(path.join(__dirname, '..', 'html', 'dashboard.html'), 'utf8'));

export default function(request, response, {baseUrl = '', pageTitle = ''}) {
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.end(dashboardTemplate({baseUrl, pageTitle}));
};
