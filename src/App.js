import logo from './Images/sirColorIcon.jpeg';
import titleBlack from './Images/sirBlack.jpg';
import titleGrey from './Images/sirColor1.jpg';
import './styles/App.scss';
import TitleArea from './components/TitleArea/TitleArea';
//import logo from './images/sirIconOnly.jpeg';
import React, { useState, useRef } from "react";

function App() {
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  return (
    <div className="App">
      <header className="App-header">
        <div className="logoContainer">
          <img className="logo" src={logo}/>
        </div>
      </header>
      <TitleArea img={titleGrey}/>
    </div>
  );
}

export default App;
