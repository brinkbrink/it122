import http from 'http';
import * as tape from './data.js';


http.createServer((req, res) => {
  const path = req.url.toLowerCase();
  let detail = req.url.split("?"); // split query string 
  let params = new URLSearchParams(detail[1]); // used URLSearchParams as recommended, parse is deprecated as of 2019
  let artist = params.get('artist'); // gets artist value from query
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
      let found = tape.getItem(`${artist}`); // getting object from array
      res.writeHead(200, {'Content-Type': 'text/plain'}); 
      let results = (found) ? JSON.stringify(found) : 'Nothing found'; // if results exist display them, otherwise use nothing found msg
      res.end(`Results for ${artist} 
      ${results}`); // results displayed
      break;
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('404 error - These aren\'t the droids you\'re looking for...');
      break;
  }
}).listen(process.env.PORT || 3000);