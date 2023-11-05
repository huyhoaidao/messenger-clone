import React from 'react'
import './find.css'

export default function find(props) {
    const { submit } = props;


    return (
        <div className="find-container">
            <div className='finds'>
                <input type="text" className='find' placeholder='Search in Conversation' />
                <button className='up'><i class="fa-solid fa-angle-up"></i></button>
                <button className='down'><i class="fa-solid fa-angle-down"></i></button>
                <button className='cancel' onClick={() => submit("")}>Cancel</button>
            </div>
        </div>
    )
}
