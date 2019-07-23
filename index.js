var express = require('express')
var app = express()
var socket = require('socket.io')

//static files
app.use(express.static('public'))

//App listening
var server = app.listen(3000, function(){
    console.log('server is listening...port 3000')
})

//socket setup
var io = socket(server)

io.on('connection', function(socket){
    console.log('made socket connection')

    socket.on('chat', function(data){
        io.sockets.emit('chat', data)
    })

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data)
    })
})