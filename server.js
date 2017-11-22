const express =require('express');
const http = require('http');
const socketIO = require('socket.io');
const bodyParser =require('body-parser');
const path =require('path');


const api = require('./server/routes/api');

const port = 8080;
const app = express();
app.use(express.static(path.join(__dirname,'dist')));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/api',api);
app.get('*',(req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const server = http.createServer(app);
const io = socketIO(server);
io.on('connection', function(socket) {
   console.log('A user connected');

   //Send a message when 
   setTimeout(function() {
      //Sending an object when emmiting an event
      socket.emit('testerEvent', { description: 'A custom event named testerEvent!'});
   }, 4000);

   socket.on('disconnect', function () {
      console.log('A user disconnected');
   });
});
app.listen(port,function(){
  console.log("server running on localhost" + port);
})
