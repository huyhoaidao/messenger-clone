import React from 'react';
import './ToolbarButton.css';

export default function ToolbarButton(props) {
  const { id, iconleft, icon, key, submit } = props;

  const activeTool = () => {
    if (id == "find") {
      submit("find");
    }
  }

  return (
    <>
      <i className={`toolbar-button ${icon}`} onClick={activeTool} />
      <i className={[
        `toolbar-button-left ${iconleft}`,
        // `${key =='send'}`
      ].join('')}></i>
    </>

  );
}