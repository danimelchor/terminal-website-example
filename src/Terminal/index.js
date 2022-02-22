import { ALLOWED_CMDS, CD_STRUCTURE } from "./TerminalData";

export default class Terminal {
  currentDir = "";
  logs = [];

  write(txt) {
    this.addCmd(txt);

    const words = txt.split(" ");
    const cmd = words[0];
    const args = words.splice(1);

    if (!ALLOWED_CMDS.includes(cmd)) {
      this.addLog(`${cmd} command not found.`);
      return;
    }

    this.execCmd(cmd, args);
  }

  getLogs() {
    return this.logs;
  }

  addLog(log) {
    this.logs.push(log);
  }

  addCmd(cmd) {
    this.logs.push(`/${this.currentDir} > ${cmd}`);
  }

  execCmd(cmd, args) {
    switch (cmd) {
      case "ls":
        this.ls();
        break;
      case "cd":
        this.cd(args);
        break;
    }
  }

  // ------- COMMANDS ------

  ls() {
    const files = CD_STRUCTURE[this.currentDir];
    this.addLog(files);
  }

  cd(args) {
    if (args[0] === undefined) {
      this.currentDir = "";
      return;
    }

    const files = CD_STRUCTURE[this.currentDir];
    if (files.includes(args[0])) {
      this.currentDir = args[0];
    } else {
      this.addLog(`${args[0]} is not an existing file/directory.`);
    }
  }
}
