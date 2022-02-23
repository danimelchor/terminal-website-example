import React, { useEffect } from "react";

import { useState } from "react";
import Log from "../components/Log";
import Type from "../components/Type";

import Terminal from "../Terminal";
const terminal = new Terminal();

export default function TerminalContainer({ setStarted, textFromTitle }) {
  const [log, setLog] = useState([]);
  const [bottomLog, setBottomLog] = useState([]);
  const [currDir, setCurrDir] = useState("");
  const [fontSize, setFontSize] = useState(16);

  const updateLog = () => {
    const logs = terminal.logs;
    setLog(JSON.parse(JSON.stringify(logs)));
    setCurrDir(terminal.currentDir);

    const bottom = terminal.bottomlog;
    setBottomLog(bottom ? JSON.parse(JSON.stringify(bottom)) : bottom);

    setTimeout(() => {
      const logDiv = document.getElementById("log");
      logDiv.scrollTop = logDiv.scrollHeight;
    }, 200);
  };

  const handleSubmit = (value) => {
    setStarted(true);
    terminal.write(value);
    updateLog();
  };

  useEffect(() => {
    if (window.innerWidth <= 425) setFontSize(12);
    else if (window.innerWidth <= 768) setFontSize(14);
    else setFontSize(16);
  }, []);

  useEffect(() => {
    if (textFromTitle) handleSubmit(textFromTitle);
  }, [textFromTitle]);

  return (
    <div className="terminal" style={{ fontSize: fontSize }}>
      <div className="bar">
        <div className="buttons">
          <div
            className="red"
            style={{ width: fontSize * 0.8, height: fontSize * 0.8 }}
          ></div>
          <div
            className="yellow"
            style={{ width: fontSize * 0.8, height: fontSize * 0.8 }}
          ></div>
          <div
            className="green"
            style={{ width: fontSize * 0.8, height: fontSize * 0.8 }}
          ></div>
        </div>
        <div className="change-size">
          <span>{fontSize}px</span>
          <input
            type="range"
            min={12}
            max={24}
            onChange={(e) => setFontSize(Number(e.target.value))}
            value={fontSize}
            step={1}
          />
        </div>
      </div>
      <div className="log" id="log">
        {log.map((l, key) => (
          <Log
            content={l.content}
            type={l.type}
            key={key}
            setValue={handleSubmit}
          />
        ))}
      </div>
      <Type
        handleSubmit={handleSubmit}
        currDir={currDir}
        terminal={terminal}
        updateLog={updateLog}
        textFromTitle={textFromTitle}
      />
      {bottomLog && <Log content={bottomLog.content} type={bottomLog.type} />}
    </div>
  );
}
