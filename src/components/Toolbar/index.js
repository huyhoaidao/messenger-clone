import React from 'react';
import './Toolbar.css';

export default function Toolbar(props) {
  const { leftItems, rightItems, style } = props;



  return (
    <div className="toolbar" style={style}>
      <div className="left-items">{leftItems}</div>
      {/* <h1 className="toolbar-title">{title}</h1> */}
      <div className="right-items">{rightItems}</div>
    </div>
  );
}