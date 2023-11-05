import React, { useState, useContext } from 'react'
import './Sidebar.css'
import { AuthContext } from "../../context/AuthContext";
import { signOut } from "firebase/auth"
import { auth } from '../../firebase'


const TabBar = ({ activeTab, handleTabChange }) => {
    const { currentUser } = useContext(AuthContext);

    // ẩn hiện Setting
    const [display, setDisplay] = useState(false);

    const toggleShowHide = () => {
        if (display === false) {
            setDisplay(true);
        }
        if (display === true) {
            setDisplay(false);
        }
    }

    // model setting
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setDisplay(false);
    };

    // pick list
    const [isList, setIsList] = useState("");

    const showCloseList = (list) => {
        setIsList(list)
    }

    // Button on off
    const [isOn, setIsOn] = useState(false);

    const handleClick = () => {
        setIsOn(!isOn);
    };


    return (
        <div className="menuBar">
            <ul>
                <i class="fa-brands fa-facebook-messenger"></i>
                <li>
                    <a href="#" onClick={() => handleTabChange('chats')}><i class="fa-solid fa-comment"></i></a>
                </li>
                <li>
                    <a href="#" onClick={() => handleTabChange('store')}><i class="fa-solid fa-store"></i></a>
                </li>
                <li>
                    <a href="#" onClick={() => handleTabChange('notifications')}><i class="fa-solid fa-comment-dots"></i></a>
                </li>
                <li>
                    <a href="#" onClick={() => handleTabChange('archive')}><i class="fa-solid fa-box-archive"></i></a>
                </li>
                <li>
                    <a href="#" onClick={() => { toggleShowHide() }}>
                        <div>
                            <img className="photo" src={currentUser.photoURL} alt="conversation" />
                        </div>
                    </a>
                    {display && (
                        <div class="UserMenu" id="menu-toggle" onClick={openModal}>
                            <i class="fa-solid fa-gear"></i>
                            <span>  Preference</span>
                        </div>
                    )}
                    {isOpen && (
                        <div className="modal">
                            <div className="modal-content">
                                <div className='modal-menu'>
                                    <span>Preference</span>
                                    <div className='modal-menu-item'>
                                        <div className='modal-photo-general'>
                                            <i class="fa-solid fa-gear"></i>
                                        </div>
                                        <span>General</span>
                                    </div>
                                    <div className='modal-menu-item'>
                                        <div className='modal-photo-Active'>
                                            <i class="fa-solid fa-bell"></i>
                                        </div>
                                        <span>Active status</span>
                                    </div>
                                    <div className='modal-menu-item'>
                                        <div className='modal-photo-Notifications'>
                                            <i class="fa-solid fa-bell"></i>
                                        </div>
                                        <span>Notifications</span>
                                    </div>
                                    <div className='modal-menu-item'>
                                        <div className='modal-photo-Appearance'>
                                            <i class="fa-solid fa-moon"></i>
                                        </div>
                                        <span>Appearance</span>
                                    </div>
                                    <div className='modal-menu-item'>
                                        <div className='modal-photo-Language'>
                                            <i class="fa-solid fa-earth-americas"></i>
                                        </div>
                                        <span>Language</span>
                                    </div>
                                    <span>Calls</span>
                                    <span>End-to-end Encryption</span>
                                    <div className='modal-menu-item'>
                                        <div className='modal-photo-Logins'>
                                            <i class="fa-solid fa-key"></i>
                                        </div>
                                        <span>Logins</span>
                                    </div>
                                    <div className='modal-menu-item'>
                                        <div className='modal-photo-Security'>
                                            <i class="fa-solid fa-shield"></i>
                                        </div>
                                        <span>Security alerts</span>
                                    </div>
                                    <span>Account & support</span>
                                    <div className='modal-menu-item' onClick={() => showCloseList("logout")}>
                                        <div className='modal-photo-Logout'>
                                            <i class="fa-solid fa-right-from-bracket"></i>
                                        </div>
                                        <span>Log out</span>
                                    </div>
                                    <div className='modal-menu-item'>
                                        <div className='modal-photo-Account'>
                                            <i class="fa-solid fa-gear"></i>
                                        </div>
                                        <span>Account settings</span>
                                    </div>
                                    <div className='modal-menu-item'>
                                        <div className='modal-photo-Report'>
                                            <i class="fa-solid fa-triangle-exclamation"></i>
                                        </div>
                                        <span>Report aproblem</span>
                                    </div>
                                    <div className='modal-menu-item'>
                                        <div className='modal-photo-Help'>
                                            <i class="fa-solid fa-circle-question"></i>
                                        </div>
                                        <span>Help</span>
                                    </div>
                                    <div className='modal-menu-item'>
                                        <div className='modal-photo-Legal'>
                                            <i class="fa-solid fa-file-contract"></i>
                                        </div>
                                        <span>Legal & policiel</span>
                                    </div>
                                </div>
                                <div className='modal-menuList'>
                                    <span className="close" onClick={closeModal}>&times;</span>
                                    <div className='modal-general-detail'>
                                        <div>
                                            <span style={{ "font-size": "17px", "font-weight": "700" }}>General</span>
                                            <p style={{ "font-size": "15px", "font-weight": "650" }}>Show Messenger Desktop app in the windows System Tray</p>
                                            <button className={`toggle-button ${isOn ? 'on' : ''}`} onClick={handleClick}>
                                                <span className="toggle-indicator"></span>
                                            </button>
                                        </div>
                                        <hr />
                                        <div>
                                            <p style={{ "font-size": "15px", "font-weight": "650" }}>Open the Messenger Desktop app when you start your computer</p>
                                            <button className={`toggle-button ${isOn ? 'on' : ''}`} onClick={handleClick}>
                                                <span className="toggle-indicator"></span>
                                            </button>
                                        </div>
                                        <hr />
                                        <div>
                                            <p style={{ "font-size": "15px", "font-weight": "650" }}>Open the Messenger Desktop app when you use Messenger in your browser</p>
                                            <button className={`toggle-button ${isOn ? 'on' : ''}`} onClick={handleClick}>
                                                <span className="toggle-indicator"></span>
                                            </button>
                                            <p style={{ "font-size": "13px", "font-weight": "400", "color": "gray" }}>The Messenger Desktop app will open automatically when you use Messenger on messenger.com</p>
                                        </div>
                                        <hr />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {isList === "logout" && (
                        <div className="logout-modal">
                            <div className="logout-modal-content">
                                <div><h4>Are you sure you want to log out</h4></div>
                                <div>
                                    <button onClick={() => signOut(auth)}>Log out</button>
                                    <button onClick={() => showCloseList("")}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    )}
                </li>
            </ul>

        </div>
    )
}

export default TabBar