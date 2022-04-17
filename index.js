import http from 'http';
import * as tape from './data.js';


http.createServer((req, res) => {
//   let url = req.url.split("?"); // separate route from query string
//   let query = parse(url[1]); // convert query string to a JS object
  const path = req.url.toLowerCase()
  let detail = req.url.split("?");
  let params = new URLSearchParams(detail[1]);
  let artist = params.get('artist');
  switch(path) {
    case '/':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(JSON.stringify(tape.getAll()));
      break;
    case '/about':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(req.url);
      res.end('Learning more about me could lead to learning more about you. Or it could just be a complete waste of time.');
      break;
    case `/detail?artist=${artist}`:
      let found = tape.getItem(`${artist}`);
      res.writeHead(200, {'Content-Type': 'text/plain'});
      let results = (found) ? JSON.stringify(found) : 'Nothing found';
      res.end(`Results for ${artist} 
      ${results}`);
      break;
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('404 error - These aren\'t the droids you\'re looking for...');
      break;
  }
}).listen(process.env.PORT || 3000);