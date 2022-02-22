import { useState } from "react";
import Line from "./components/Line";
import Type from "./components/Type";

import Terminal from "./Terminal";
const terminal = new Terminal();

function App() {
  const [log, setLog] = useState([]);
  const [currDir, setCurrDir] = useState("");

  const handleSubmit = (value) => {
    terminal.write(value);
    const logs = terminal.getLogs();

    setLog(JSON.parse(JSON.stringify(logs)));
    setCurrDir(terminal.currentDir);
  };

  return (
    <div className="App">
      {log.map((l, key) => (
        <Line log={l} key={key} />
      ))}
      <Type handleSubmit={handleSubmit} currDir={currDir} />
    </div>
  );
}

export default App;
