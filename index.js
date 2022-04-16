import http from 'http';

http.createServer((req, res) => {
  const path = req.url.toLowerCase()
  switch(path) {
    case '/':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('What is a home? Whatever it is, you\'re here.');
      break;
    case '/about':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Learning more about me could lead to learning more about you. Or it could just be a complete waste of time.');
      break;
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('404 error - These aren\'t the droids you\'re looking for...');
      break;
  }
}).listen(process.env.PORT || 3000);