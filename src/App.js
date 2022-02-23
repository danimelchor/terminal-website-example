import { useState } from "react";
import TerminalContainer from "./components/TerminalContainer";
import Title from "./components/Title";

import { AiFillHome } from "react-icons/ai";

function App() {
  const [started, setStarted] = useState(false);
  const [textFromTitle, setTextFromTitle] = useState();

  return (
    <div className="App">
      <a href="http://danielmelchor.com" className="website-button">
        <AiFillHome />
      </a>
      <Title started={started} setTextFromTitle={setTextFromTitle} />
      <TerminalContainer
        setStarted={setStarted}
        textFromTitle={textFromTitle}
      />
    </div>
  );
}

export default App;
