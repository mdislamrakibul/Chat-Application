import React from 'react'

import closeIcon from '../../icons/closeIcon.png'
import onlineIcon from '../../icons/onlineIcon.png'


import './input.css'

function Input({ message, setMessage, sendMessage }) {
    return (
        <>
            <form className="form">
                <input
                    className="input"
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' ? sendMessage(e) : null}
                />
                <button className="sendButton" onClick={(e) => sendMessage(e)}>Send</button>
            </form>
        </>
    )
}

export default Input
