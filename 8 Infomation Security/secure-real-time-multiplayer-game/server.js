require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const expect = require('chai');
const socket = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');

const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner.js');

const app = express();

app.use('/public', express.static(process.cwd() + '/public'));
app.use('/assets', express.static(process.cwd() + '/assets'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet.hidePoweredBy({ setTo: 'PHP 7.4.3' }));
app.use(helmet.noSniff()); // Prevent MIME type sniffing
app.use(helmet.xssFilter()); // Prevent XSS attacks
app.use(helmet.noCache()); // Disable client-side caching

// For FCC testing purposes and enables user to connect from outside the hosting platform
app.use(cors({ origin: '*' })); 

// Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  }); 

// For FCC testing purposes
fccTestingRoutes(app);
    
// 404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

const portNum = process.env.PORT || 3000;

// Set up server and tests
const server = app.listen(portNum, () => {
  console.log(`Listening on port ${portNum}`);
  if (process.env.NODE_ENV === 'test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch (error) {
        console.log('Tests are not valid:');
        console.error(error);
      }
    }, 1500);
  }
});

// Set up Socket.io for real-time communication
const io = socket(server);

io.on('connection', (socket) => {
  console.log('New player connected:', socket.id);

  socket.on('move', (data) => {
    // Broadcast movement data to all other players
    socket.broadcast.emit('move', data);
  });

  socket.on('collect', (itemId) => {
    // Broadcast item collection to all other players
    io.emit('collect', { id: itemId, player: socket.id });
  });

  socket.on('disconnect', () => {
    console.log('Player disconnected:', socket.id);
  });
});

module.exports = app; // For testing
