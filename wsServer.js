var io        = require('socket.io')(5442);
var sip       = require('./src/semantic-internet-protocol')
var header    = sip.header
var interest  = sip.interest
var knowledge = sip.knowledge


io.on('connection', function (socket) {

  socket.on('expose', function (data) {
    var [head, body] = header.serialize(data)
    var bla          = knowledge.serialize(body)
    console.log(head, bla)

    setTimeout(() => {
      var bodyStr   = interest.deserialize({ vocabulary: '', infoContent: '' })
      var headerStr = header.deserialize({version: 1.0, contentLength: bodyStr.length, command: 'insert'})
      io.emit('interest', headerStr + bodyStr);
    }, 1000)
  });

  socket.on('error', e => console.log(e) )

  socket.on('disconnect', function () {
    io.emit('user disconnected');
  });
});
