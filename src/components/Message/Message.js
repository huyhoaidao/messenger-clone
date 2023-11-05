import React from 'react';
import moment from 'moment';


export default function Message(props) {
    const {
        message, user
    } = props;

    const friendlyTimestamp = moment(message.timestamp).format('LLLL');
    return (
        <div className={[
            'message',
            `${user === message.messageUserId ? 'mine' : ''}`,
            `${user === message.messageUserId ? 'start' : ''}`,
            `${user === message.messageUserId ? 'end' : ''}`,
        ].join(' ')}
        >


            <div className="bubble-container">
                <div className="bubble" title={friendlyTimestamp}>
                    {message.message}
                </div>
            </div>
        </div>
    );
}
