import React, {Fragment} from "react";
import ReactDOM from "react-dom";
import {createGlobalStyle} from "styled-components";

import App from "./App";

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        overflow: hidden;
        background: black;
        font-family: sans-serif;
    }
`;

ReactDOM.render(
  <Fragment>
    <GlobalStyle />
    <App />
  </Fragment>,
  document.getElementById("root"),
);
