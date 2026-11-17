const http = require('http');

http.createServer((req, res) => {
  res.writeHead(302, { Location: 'http://localhost:5173' + (req.url || '/') });
  res.end();
}).listen(5174, '0.0.0.0', () => {
  console.log('Port 5174 -> 5173 redirect active');
});
