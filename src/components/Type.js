import React, { useState } from "react";
import { T } from "../Terminal/TerminalData";

export default function Type({ handleSubmit, currDir, terminal, updateLog }) {
  const [value, setValue] = useState("");
  const [cmdIdx, setCmdIdx] = useState(0);

  const handle = (e) => {
    e.preventDefault();
    handleSubmit(value);
    setValue("");
    setCmdIdx(terminal.cmdLog.length - 1);
  };

  // AUTOCOMPLETE COMMAND
  const autoCompleteCmd = (cmd) => {
    const options = terminal
      .getCommands()
      .filter((a) => a.startsWith(cmd.toLowerCase()))
      .map((o) => {
        return { text: o, click: `${o}` };
      });

    if (options.length === 1) {
      setValue(options[0].text);
      terminal.deleteBottomLog();
    } else terminal.setBottomLog(T.list, options);

    updateLog();
  };

  // AUTOCOMPLETE FOLDER/FILENAME
  const autoCompleteFile = (cmd, file) => {
    const options = terminal
      .getFiles()
      .filter((a) => a.text.toLowerCase().startsWith(file.toLowerCase()));

    if (options.length === 1) {
      setValue(`${cmd} ${options[0].text}`);
      terminal.deleteBottomLog();
    } else terminal.setBottomLog(T.list, options);

    updateLog();
  };

  // AUTOCOMPLETE ON TAB
  const handleAutoComplete = (txt) => {
    const words = txt.split(" ");

    if (words.length === 1) {
      if (words[0].startsWith("./")) {
        autoCompleteFile("sh", words[0].replaceAll("./", ""));
      } else autoCompleteCmd(words[0]);
    } else {
      autoCompleteFile(words[0], words[1]);
    }
  };

  // GETS CMD FROM CMD LOG
  const getCmdAt = (increment, e) => {
    const cmdLog = terminal.cmdLog;
    const newIdx = Math.min(
      Math.max(cmdIdx + increment, 0),
      terminal.cmdLog.length
    );
    const newCmd = cmdLog[cmdIdx];
    setCmdIdx(newIdx);

    return newCmd || "";
  };

  const handleKeyDown = (e) => {
    if (e.code === "Tab") {
      e.preventDefault();
      handleAutoComplete(value);
    } else if (e.code === "ArrowUp") {
      setValue(getCmdAt(-1, e));
    } else if (e.code === "ArrowDown") {
      setValue(getCmdAt(1, e));
    }
  };

  return (
    <form className="type" onSubmit={handle}>
      <p>
        <span className="c-teal-1">/{currDir}</span> ~{" "}
      </p>
      <input
        type="text"
        autoFocus={window.innerWidth > 768}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => {
          if (window.innerWidth > 768) {
            e.target.selectionStart = e.target.value.length;
            e.target.focus();
          }
        }}
        onKeyDown={handleKeyDown}
        autocorrect="off"
        autocapitalize="none"
      />
    </form>
  );
}
