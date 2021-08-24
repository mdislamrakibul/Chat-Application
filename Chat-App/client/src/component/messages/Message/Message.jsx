import React from 'react'
import './message.css'
import ReactEmoji from 'react-emoji'
export default function Message({ message: { user, text }, name }) {
    let isSentByCurrentUser = false

    const trimName = name.trim().toLowerCase()

    if (user === trimName) {
        isSentByCurrentUser = true
    }
    return (
        <div>
            {isSentByCurrentUser
                ? (
                    <div className="messageContainer justifyEnd">
                        <p className="sentText pr-10">{trimName}</p>
                        <div className="messageBox backgroundBlue">
                            <p className="message colorWhite">{ReactEmoji.emojify(text)}</p>
                        </div>
                    </div>
                )
                : (
                    <div className="messageContainer justifyStart">
                        <div className="messageBox backgroundWhite">
                            <p className="message colorDark">{ReactEmoji.emojify(text)}</p>
                        </div>
                        <p className="sentText pl-10">{user}</p>
                    </div>
                )}
        </div>
    )
}
