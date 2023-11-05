import React, { useState, useEffect, createContext, useContext } from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import MessageList from '../MessageList';
import { Button, IconButton, Typography } from '@mui/material';


import './ConversationList.css';
import '../Messenger/Messenger.css';
import Sidebar from '../Sidebar';


import { doc, onSnapshot, collection } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { db } from "../../firebase";


export default function ConversationList() {

  // Chuyển tabMessage Resquests 


  //chuyển tab Sidebar
  const [activeTab, setActiveTab] = useState('chats');

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  // conversation chat
  const [currentIndex, setCurrentIndex] = useState(0);

  const [visibleIndex, setVisibleIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? users.length - 1 : prevIndex - 1));
    setVisibleIndex((prevVisibleIndex) => (prevVisibleIndex === 0 ? users.length - 4 : prevVisibleIndex - 4));
  };
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === users.length - 1 ? 0 : prevIndex + 1));
    setVisibleIndex((prevVisibleIndex) => (prevVisibleIndex === users.length - 4 ? 0 : prevVisibleIndex + 4));
  };
  // css conversation 
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
  }));

  const [chats, setChats] = useState([]);

  const [users, setUsers] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };


  useEffect(() => {
    const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
      setUsers(snapshot.docs.map((doc) => doc.data()));
    });
    return unsub;
  }, []);

  const visibleUsers = users.slice(visibleIndex, visibleIndex + 4);

  return (

    <div className="messenger">

      {/* menuBar */}
      <Sidebar activeTab={activeTab} handleTabChange={handleTabChange} />

      {/* conversation */}
      <div className="scrollable sidebar">
        {activeTab === 'chats' && (
          <div className="conversation-list">
            <Toolbar
              leftItems={[<h5 style={{ "font-weight": "700" }}>Chats</h5>]
              }
              rightItems={[
                <ToolbarButton key="add" iconleft="fa-solid fa-pen-to-square" />
              ]}
            />
            <ConversationSearch />
            <div style={{ "flex": "1" }}>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ position: 'relative' }}>
                <IconButton size="small" onClick={handlePrevious} sx={{ position: 'absolute', left: 15, zIndex: 1 }}>
                  <i class="fa-solid fa-angle-left fa-xs"></i>
                </IconButton>
                {visibleUsers.map((user, index) => (
                  <div key={index} style={{
                    "display": "flex",
                    "flex-direction": "column",
                    "align-items": "center"
                  }}>
                    <StyledBadge
                      key={index}
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      variant="dot"
                    >
                      <Avatar alt={user.username} src={user.photoURL} sx={{ width: 50, height: 50 }} />
                      <div style={{ "margin-top": "8px", "font-size": "12px" }}>{user.username}</div>
                    </StyledBadge>
                  </div>

                ))}
                <IconButton size="small" onClick={handleNext} sx={{ position: 'absolute', right: 15, zIndex: 1 }}>
                  <i class="fa-solid fa-angle-right fa-xs"></i>
                </IconButton>
              </Stack>
            </div>
            {/* <UsersComponent
            users={users}
            setReceiverData={setReceiverData}
            navigate={navigate}
            currentUserId={user?.uid}
          /> */}
            {chats && Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
              <div
                className="userChat"
                key={chat[0]}
                onClick={() => handleSelect(chat[1].userInfo)}
              >
                <ConversationListItem img={chat[1].userInfo.photoURL} username={chat[1].userInfo.displayName} text={chat[1].lastMessage?.text} />
              </div>

            ))}
          </div>
        )}

        {activeTab === 'store' && (
          <div className="store-content">
            <Toolbar
              leftItems={[<h5 style={{ "font-weight": "700" }}>Marketplace</h5>]
              }
            />
            <ConversationSearch />
            <div style={{ "padding": "10px" }}>
              <h6>No Messages</h6>
              <span style={{ "font-size": "14px" }}>Chats will appear here when you send or receive messages as a buyer or seller on Marketplace</span>
            </div>
          </div>
        )}

        <div>
          {(activeTab === 'notifications' || activeTab === 'notifications-Spam') && (
            <div className="notifications-content">
              <Toolbar
                leftItems={[
                  <h5 style={{ "font-weight": "700" }}>
                    {activeTab === 'notifications' ? 'Message Resquests' : 'Spam'}
                  </h5>]
                }
              />
              <ConversationSearch />
              <div className="tab-container">
                <div className="tabs">
                  <button className="tab" onClick={() => { handleTabChange("notifications") }}>You may know</button>
                  <button className="tab" onClick={() => { handleTabChange("notifications-Spam") }}>Spam</button>
                </div>
              </div>
              <div style={{ "padding": "10px" }}>
                <span style={{ "font-size": "14px" }}>Open a chat to get more info about who's messaging you. They won't know you've seen it until you reply.</span>
              </div>
              {chats && Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
                <div
                  className="userChat"
                  key={chat[0]}
                  onClick={() => handleSelect(chat[1].userInfo)}
                >
                  <ConversationListItem img={chat[1].userInfo.photoURL} username={chat[1].userInfo.displayName} text={chat[1].lastMessage?.text} />
                </div>
              ))}
            </div>
          )}
          {/* {activeTab === 'Spam' && (
            <div className='Spam-content'>
              <Toolbar
                leftItems={[<h5 style={{ "font-weight": "700" }}>Spam</h5>]
                }
              />
              <ConversationSearch />
              <div class="tab-container">
                <div class="tabs">
                  <button class="tab" onClick={() => { handleTabChange("notifications") }}>You may know</button>
                  <button class="tab" onClick={() => { handleTabChange("Spam") }}>Spam</button>
                </div>
              </div>
              <div style={{ "padding": "10px" }}>
                <span style={{ "font-size": "14px" }}>Open a chat to get more info about who's messaging you. They won't know you've seen it until you reply.</span>
              </div>
              {chats && Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
                <div
                  className="userChat"
                  key={chat[0]}
                  onClick={() => handleSelect(chat[1].userInfo)}
                >
                  <ConversationListItem img={chat[1].userInfo.photoURL} username={chat[1].userInfo.displayName} text={chat[1].lastMessage?.text} />
                </div>
              ))}
            </div>
          )} */}
        </div>

        {activeTab === 'archive' && (
          <div className="archive-content">
            <Toolbar
              leftItems={[<h5 style={{ "font-weight": "700" }}>Archived</h5>]
              }
            />
            <ConversationSearch />
            {chats && Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
              <div
                className="userChat"
                key={chat[0]}
                onClick={() => handleSelect(chat[1].userInfo)}
              >
                <ConversationListItem img={chat[1].userInfo.photoURL} username={chat[1].userInfo.displayName} text={chat[1].lastMessage?.text} />
              </div>
            ))}
          </div>
        )}

      </div>

      {/* chats content */}
      <div className="scrollable content">
        <MessageList />
      </div>
    </div >
  );
}