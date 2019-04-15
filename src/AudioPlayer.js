import React, {Fragment, useState} from "react";
import styled, {keyframes} from "styled-components";

const BlinkAnimation = keyframes`
  from {
      color: white;
  }
  to {
      color: black;
  }
`;

const TabHere = styled.div`
  color: white;
  position: fixed;
  bottom: 15px;
  left: 50vw;
  cursor: pointer;
  transform: translateX(-50%);
  animation: ${BlinkAnimation} 1s linear infinite;

  font-size: 1.4rem;
  font-weight: bold;
  font-family: "Varela", sans-serif;
`;

function AudioPlayer() {
  const [isSpace, setSpace] = useState(false);

  return (
    <Fragment>
      <TabHere
        onClick={() => {
          setSpace(!isSpace);
          window.toggleMove();
        }}>
        TAB HERE TO SWITCH TO {isSpace ? "EARTH" : "SPACE"} MODE
      </TabHere>
    </Fragment>
  );
}

export default AudioPlayer;
