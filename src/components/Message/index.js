import React, { useContext, useEffect, useRef } from "react";
import moment from 'moment';

import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import './Message.css';
import { Avatar } from "@mui/material";

export default function Message(props) {
  const { message, startsSequence, endsSequence } = props;

  const friendlyTimestamp = moment(message.timestamp).format('LLLL');

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const isUserMessage = message.senderId === currentUser.uid;

  console.log("khach", currentUser)

  return (
    <div
      className={[
        'message',
        `${isUserMessage ? 'mine' : ''}`,
        `${startsSequence ? 'start' : ''}`,
        `${endsSequence ? 'end' : ''}`,
      ].join(' ')}
    >
      <div className="bubble-container">
        {/* {!isUserMessage && (
          <div className="avatar">
            <Avatar alt="Avatar"
              src={message.senderId === currentUser.uid
                ? currentUser.photoURL
                : data.user.photoURL} />
          </div>
        )} */}
        <div className="bubble" title={friendlyTimestamp}>
          {message.text}
          <div style={{ "width": "100%" }}>
            {message.img && <img style={{ "max-width": "700px", "max-height": "500px" }} src={message.img} alt="" />}
          </div>
        </div>
      </div>
    </div>
  );
}