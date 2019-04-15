import React, {Fragment} from "react";
import styled from "styled-components";

import MinecraftMap from "./MinecraftMap";
import AudioPlayer from "./AudioPlayer";

const Logo = styled.h1`
  color: #777;
  position: fixed;
  z-index: 9999;
  margin: 15px;
  font-size: 1.4rem;
  font-family: "Varela", sans-serif;

  & > a {
    color: #444;
    text-decoration: none;
  }
`;

const App = () => {
  return (
    <Fragment>
      <Logo>
        Relax{" "}
        <a rel="noopener noreferrer" target="_blank" href="https://thechun.xyz">
          thechun.xyz
        </a>
      </Logo>

      <AudioPlayer />

      <MinecraftMap />
    </Fragment>
  );
};

export default App;
