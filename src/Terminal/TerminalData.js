import React from "react";

import README from "../data/Readme";
import BUNexus from "../data/projects/BUNexus";
import Danielmelchor from "../data/projects/Danielmelchor";
import AllProjects from "../data/projects/AllProjects";
import Wordel from "../data/projects/Wordel";
import Decentrapass from "../data/projects/Decentrapass";
import Experience from "../data/Experience";
import Education from "../data/Education";
import Skills from "../data/Skills";

// File system
export const LS_STRUCTURE = {
  "": [
    "education.md",
    "experience.md",
    "projects/",
    "README.md",
    "resume.sh",
    "skills.md",
  ],
  projects: [
    ".ShowAllProjects.md",
    "BUNexus.md",
    "danielmechor.md",
    "Decentrapass.md",
    "Wordel*.md",
  ],
};

// File structure
export const FILE_STRUCTURE = {
  "README.md": <README />,
  ".ShowAllProjects.md": <AllProjects />,
  "BUNexus.md": <BUNexus />,
  "danielmechor.md": <Danielmelchor />,
  "Decentrapass.md": <Decentrapass />,
  "Wordel*.md": <Wordel />,
  "experience.md": <Experience />,
  "education.md": <Education />,
  "skills.md": <Skills />,
  "resume.sh": () =>
    window.open("https://danielmelchor.com/danielmelchor_resume.pdf", "_blank"),
};

// Types of logs
export const T = {
  text: "text",
  list: "list",
  table: "table",
  error: "error",
  cmd: "cmd",
  data: "data",
};

// Allowed commands
export const COMMANDS = ["cat", "cd", "clear", "help", "ls", "sh"];

// HELP
export const HELP = [
  ["cat [file]", "displays the content of [file]", "ex: cat skills.md"],
  ["cd [dir]", "changes the directory to [dir]", "ex: cd projects/"],
  ["clear", "clears the terminal log", "ex: clear"],
  ["help", "displays the list of commands and descriptions", "ex: help"],
  ["ls", "lists the contents of the current directory", "ex: ls"],
  ["sh [file]", "runs a file", "ex: sh resume.sh"],
];
