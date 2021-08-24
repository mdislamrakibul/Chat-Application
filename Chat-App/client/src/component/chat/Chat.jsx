import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import { io } from 'socket.io-client'
import './chat.css'
import InfoBar from '../infobar/InfoBar'
import Input from '../input/Input'
import Messages from '../messages/Messages'
import TextContainer from '../TextContainer/TextContainer';
let socket

function Chat({ location }) {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [users, setUsers] = useState('');
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')

    const ENDPOINT = 'http://localhost:5000/'
    useEffect(() => {
        const { name, room } = queryString.parse(location?.search) // retrive data from url
        // console.log(location.search)
        // console.log(name)
        // console.log(room)
        socket = io(ENDPOINT, { transports: ['websocket'] })
        setName(name)
        setRoom(room)
        // console.log(name)
        // console.log(room)
        // emitting
        socket.emit('join', { name, room }, () => {

        })

        return () => {
            // unmounting (here disconnect and off)
            socket.emit('disconnect')
            socket.off()
        }

    }, [ENDPOINT, location?.search])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })
        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });
    }, [messages])

    //function for sending setMessages
    const sendMessage = (e) => {
        e.preventDefault()
        if (message) {
            socket.emit('sendMessage', message, () => {
                setMessage('')
            })
        }
    }
    console.log(message, messages);
    return (
        <>
            <div className="outerContainer">
                <div className="container">
                    <InfoBar room={room} />
                    <Messages messages={messages} name={name} />
                    <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
                    {/* <input value={message} onChange={(e)=>setMessage(e.target.value)}
                    onKeyPress={e=>e.key==='Enter' ? sendMessage(e) : null}/> */}
                </div>
                <TextContainer users={users} />
            </div>
        </>
    )
}

export default Chat;
