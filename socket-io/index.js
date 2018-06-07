const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Magic happens on port ${PORT}`);
});

app.get('/', (req, res) => {
  // eslint-disable-next-line no-path-concat
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/javascript', (req, res) => {
  // eslint-disable-next-line no-path-concat
  res.sendFile(__dirname + '/public/javascript.html');
});

app.get('/node', (req, res) => {
  // eslint-disable-next-line no-path-concat
  res.sendFile(__dirname + '/public/node.html');
});

app.get('/react', (req, res) => {
  // eslint-disable-next-line no-path-concat
  res.sendFile(__dirname + '/public/react.html');
});

// tech namespace
const tech = io.of('/tech');

tech.on('connection', (socket) => {
  socket.on('join', (data) => {
    socket.join(data.room);
    tech.in(data.room).emit('message', `New user joined ${data.room} room`);
  });
  socket.on('message', (data) => {
    // sends the message
    tech.in(data.room).emit('message', data.msg);
  });

  socket.on('disconnect', (data) => {
    tech.in(data.room).emit('message', `User off ${data.room}`);
  });
});

// io.on('connection', (socket) => {
//   console.log('user connected');
//   socket.on('message', (msg) => {
//     console.log(`message: ${msg}`);
//     // sends the message
//     io.emit('message', msg);
//   });

//   socket.on('disconnect', () => {
//     console.log('user off');
//     io.emit('message', 'user off');
//   });
// });
