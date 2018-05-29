import http from 'http';
import config from './config';

const server = http.createServer((req, res) => {
  res.end('Hello World, you are dying!');
});

server.listen(config.port, config.hostname, () => {
  console.log(`Server running on http://${config.hostname}:${config.port}/`);
});
