var socket = io.connect('http://localhost:3000')

var message = document.getElementById('message')
var handle = document.getElementById('handle')
var btn = document.getElementById('send')
var output = document.getElementById('output')
var feedback = document.getElementById('feedback')

//Emit a message
btn.addEventListener('click', function(){
    if (message.value !== ''){
        socket.emit('chat', {
            message: message.value,
            handle: handle.value
        })
    }
})
//listening for a keypress
message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value)
})

//Listen for a message
socket.on('chat', function(data){
    output.innerHTML += `<p><strong>${data.handle}: </strong>${data.message}</p>`
    message.value=''
    feedback.innerHTML = ''
})

socket.on('typing', function(data){
    feedback.innerHTML = `<p>${data} is typing</p>`
})