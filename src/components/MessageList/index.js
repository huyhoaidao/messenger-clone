import React, { useEffect, useState, useContext } from 'react';
import Compose from '../Compose';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import { Avatar } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItem from '@mui/material/ListItem';
import ListItemButton from "@mui/material/ListItemButton";

import Message from '../Message/index';
import "./MessageList.css";
import Find from '../Toolbar/find.js'

import { doc, onSnapshot } from "firebase/firestore";
import { ChatContext } from "../../context/ChatContext";
import { db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";

export default function MessageList(props) {

  //Chuyển hướng headerTool
  const [active, setActive] = useState("");

  const toggleActive = (tool) => {
    setActive(tool);
  }

  // messages
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  const addMessage = (message) => {
    // Thêm tin nhắn vào mảng messages
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <div className="message-list">
      {active == "" && (
        <Toolbar style={{ "height": "80px" }}
          leftItems={data.user.displayName ? (<ListItem >
            <ListItemAvatar>
              <Avatar alt="Avatar"
                src={messages.senderId === currentUser.uid
                  ? currentUser.photoURL
                  : data.user.photoURL} />
            </ListItemAvatar>
            <ListItemText
              primary={`${data.user.displayName}`} />
          </ListItem>)
            : (
              ""
            )}
          rightItems={[
            <ToolbarButton key="dots" id="dots" icon="fa-solid fa-ellipsis" />,
            <ToolbarButton key="find" id="find" icon="fa-solid fa-magnifying-glass" submit={toggleActive} />,
            <ToolbarButton key="video" id="video" icon="fa-solid fa-video" />,
            <ToolbarButton key="phone" id="phone" icon="fa-solid fa-phone" />,
          ]}
        />
      )}

      {active == "find" && (
        <Find submit={toggleActive} />
      )}

      <div className="message-list-container">
        {messages.map((message, index) => {
          const startsSequence = index === 0 || message.author !== messages[index - 1].author;
          const endsSequence = index === messages.length - 1 || message.author !== messages[index + 1].author;

          return (
            <Message
              message={message}
              key={index}
              startsSequence={startsSequence}
              endsSequence={endsSequence}
            />
          );
        })}
      </div>
      <Compose
        leftItems={[
          <ToolbarButton key="plus" icon="fa-solid fa-circle-plus" />,
        ]}
        rightItems={[
          <ToolbarButton key="sticky" icon="fa-solid fa-note-sticky" />,
          <ToolbarButton key="audio" icon="fa-solid fa-face-smile" />,
          <ToolbarButton key="like" icon="fa-solid fa-thumbs-up" />,
          <ToolbarButton key="send" icon="fa-solid fa-paper-plane" />,
        ]}
      />
    </div>
  );
}