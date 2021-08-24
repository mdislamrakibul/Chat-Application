import React from 'react';

import './infobar.css'
import closeIcon from '../../icons/closeIcon.png'
import onlineIcon from '../../icons/onlineIcon.png'
function InfoBar({ room }) {
    return (
        <>
            <div className="infoBar">
                <div className="leftInnerContainer">
                    <img className="onlineIcon" src={onlineIcon} alt="Online" />
                    <h3>{room}</h3>
                </div>
                <div className="rightInnerContainer">
                    <a href="#"><img src={closeIcon} alt="Close" />
                    </a>
                </div>
            </div>
        </>
    )
}

export default InfoBar
