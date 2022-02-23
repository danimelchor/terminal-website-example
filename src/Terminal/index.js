import {
  LS_STRUCTURE,
  COMMANDS,
  HELP,
  T,
  FILE_STRUCTURE,
} from "./TerminalData";

const ext = (name) => {
  const parts = name.split(".");
  return parts[parts.length - 1];
};

export default class Terminal {
  currentDir = "";
  logs = [];
  bottomlog = null;
  cmdLog = [];

  // ------- LOGS -----

  addLog(type, content) {
    this.logs.push({ type, content });
    this.deleteBottomLog();
  }

  setBottomLog(type, content) {
    this.bottomlog = { type, content };
  }

  deleteBottomLog() {
    this.bottomlog = null;
  }

  // ------- EXECUTION -------

  write(txt) {
    this.addLog(T.cmd, { cmd: txt, dir: this.currentDir });

    const words = txt.trim().split(" ");
    const cmd = words[0].trim();
    const args =
      words[1] !== undefined && words[1].trim() !== ""
        ? words[1].trim()
        : undefined;

    if (words.length > 2) {
      this.addLog(T.error, `Too many arguments (${words.length - 1}).`);
      return;
    }

    this.cmdLog.push(txt);
    this.execCmd(cmd, args);
  }

  execCmd(cmd, args) {
    if (cmd.startsWith("./")) {
      const newArgs = cmd.replaceAll("./", "");
      this.sh(newArgs);
      return;
    }

    switch (cmd) {
      case "ls":
        this.ls(args);
        break;
      case "cd":
        this.cd(args);
        break;
      case "clear":
        this.clear(args);
        break;
      case "help":
        this.help(args);
        break;
      case "cat":
        this.cat(args);
        break;
      case "sh":
        this.sh(args);
        break;
      default:
        this.addLog(T.error, `${cmd} command not found.`);
    }
  }

  getCommands() {
    return COMMANDS;
  }

  getFiles() {
    return LS_STRUCTURE[this.currentDir] || [];
  }

  // ------- COMMANDS ------

  ls(args) {
    if (args !== undefined) {
      this.addLog(T.error, "ls doesn't take any arguments.");
      return;
    }

    const files = this.getFiles();
    this.addLog(T.list, files);
  }

  cd(args) {
    if (args === undefined || args === ".." || args === "../") {
      this.currentDir = "";
      return;
    }

    const files = this.getFiles();
    const dir = args.replaceAll("/", "");

    if (
      !Object.keys(LS_STRUCTURE).includes(dir) ||
      !files.map((a) => a.text).includes(`${dir}/`)
    ) {
      this.addLog(T.error, `${args} is not a directory.`);
      return;
    }

    this.currentDir = dir;
  }

  clear(args) {
    if (args !== undefined) {
      this.addLog(T.error, "clear doesn't take any arguments.");
      return;
    }

    this.logs = [];
  }

  help(args) {
    if (args !== undefined) {
      this.addLog(T.error, "help doesn't take any arguments.");
      return;
    }

    this.addLog(T.table, HELP);
  }

  cat(args) {
    if (args === undefined) {
      this.addLog(T.error, "cat requires one argument (the file to show).");
      return;
    } else if (ext(args) !== "md") {
      this.addLog(T.error, 'You can only cat files ending in ".md" here');
      return;
    }

    const files = this.getFiles();
    const file = args.replaceAll("/", "");

    if (!files.map((a) => a.text).includes(file)) {
      this.addLog(T.error, `The file ${file} doesn't exist.`);
      return;
    }

    this.addLog(T.data, file);
  }

  sh(args) {
    if (args === undefined) {
      this.addLog(T.error, "sh requires one argument (the file to run).");
      return;
    } else if (ext(args) !== "sh") {
      this.addLog(T.error, 'You can only sh files ending in ".sh"');
      return;
    }

    const files = this.getFiles();
    const file = args.replaceAll("/", "");
    if (!files.map((a) => a.text).includes(file)) {
      this.addLog(T.error, `The file ${file} doesn't exist.`);
      return;
    }

    FILE_STRUCTURE[file]();
  }
}
