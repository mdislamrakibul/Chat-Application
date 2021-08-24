const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const cors = require("cors")


const PORT = process.env.PORT || 5000

const {addUser, removeUser, getUser, getUsersInRoom} = require('./users')

const app = express()
app.use(cors({ credentials: true }));
const server = http.createServer(app);
const io = socketio(server);
// connection
io.on('connection', (socket) => {
    // emitting
    socket.on('join',({name, room}, callback)=>{
        const { error, user } = addUser({id:socket.id, name, room})
        if(error){
            return callback(error)
        }
        // admin text
        socket.emit('message',{user: 'admin', text: `${user.name}, welcome to the ${user.room} room`})
        socket.broadcast.to(user.room).emit('message',{user:'admin', 'text':`${user.name}, has joined`})
        socket.join(user.room)

        io.to(user.room).emit('roomData', {room:user.room, users: getUsersInRoom(user.room)})

        callback()
    })

    socket.on('sendMessage',(message, callback)=>{
        const user = getUser(socket.id)

        io.to(user?.room).emit('message',{user:user?.name, text:message})
        io.to(user?.room).emit('roomData',{room:user?.room, users: getUsersInRoom(user.room)})
        callback()
    })


    socket.on('disconnect',()=>{
        console.log('User left');
        const user = removeUser(socket.id)
        if(user){
            io.to(user.room).emit('message',{user:'admin', text:`${user?.name} has left the room`})
        }
    })
})




const router = require('./routes/router')
app.use(router)

server.listen(PORT,()=>{
    console.log(`Server has started on ${PORT}`);
})
