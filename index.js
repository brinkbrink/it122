import http from 'http';
import { getAll, getItem } from './data.js';
import { parse } from "querystring";


http.createServer((req, res) => {
//   let url = req.url.split("?"); // separate route from query string
//   let query = parse(url[1]); // convert query string to a JS object
  const path = req.url.toLowerCase()
  switch(path) {
    case '/':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(JSON.stringify(getAll()));
      break;
    case '/about':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Learning more about me could lead to learning more about you. Or it could just be a complete waste of time.');
      break;
    case '/detail':
      let found = getItem(query.artist); 
      res.writeHead(200, {'Content-Type': 'text/plain'});
      let results = (found) ? JSON.stringify(found) : "Not found";
      res.end(`Results for ${query.artist}: \n${results}`);
      break;
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('404 error - These aren\'t the droids you\'re looking for...');
      break;
  }
}).listen(process.env.PORT || 3000);