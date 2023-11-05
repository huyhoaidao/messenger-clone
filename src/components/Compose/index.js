import React, { useContext, useState } from "react";
import Img from "../../img/img.png";
import Attach from "../../img/attach.png";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import './Compose.css';
import toolbar from '../ToolbarButton/index'

export default function Compose(props) {

  // ẩn hiện Setting
  const [display, setDisplay] = useState(false);

  const toggleShowHide = () => {
    if (display == false) {
      setDisplay(true);
    }
    if (display == true) {
      setDisplay(false);
    }
  }


  const { rightItems, leftItems, setMess, chatMessage } = props;
  const check = false;

  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleKey = (e) => {
    e.code === "Enter" && handleSend();
  };

  const handleSend = async () => {
    if (text.trim() === "") {
      return;
    }
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);

  }

  return (
    <div className="compose">
      <div>
        <div className="toolbar-button">
          <div className="leftItems" onClick={() => { toggleShowHide() }}>{leftItems}</div>
        </div>
        {display && (
          <div className="Toolplus">
            <label><i class="fa-solid fa-microphone"></i> Record a Voice Clip</label>
            <label htmlFor="file"><i class="fa-solid fa-paperclip"></i> Add Attachments</label>
            <input
              type="file"
              style={{ display: "none" }}
              id="file"
              onChange={(e) => setImg(e.target.files[0])}
            />
          </div>
        )}
      </div>
      <div className="input">
        <input
          type="text"
          className="compose-input"
          placeholder="Type a message..."
          onKeyDown={handleKey}
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <div className="sticky">
          {rightItems[0]}
          {rightItems[1]}
        </div>
      </div>
      <div className="toolbar-button">
        <div onClick={handleSend}>{rightItems[3]}</div>
      </div>
    </div>
  );
}