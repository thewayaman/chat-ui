import React from 'react';

const Messages = ({ messages, currentUser }) => {



    let renderMessage = (message) => {
        const { sender, content, color } = message;
        const className = (currentUser.username === message.sender) ? "Messages-message currentUser" : "Messages-message";

        return (
            <li className={className}
                style={{ backgroundColor: color }}
            ><div className="Message-content">
                    <div className="username">
                        {sender}
                    </div>
                    <div className="text">{content}</div>
                </div>
            </li>
        );
    };

    return(
        <ul className="message-list">
            {messages.map(msg=>renderMessage(msg))}
        </ul>
        
    );


}

export default Messages;