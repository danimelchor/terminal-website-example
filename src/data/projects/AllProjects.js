import React from "react";
import BUNexus from "./BUNexus";
import Danielmelchor from "./Danielmelchor";
import Decentrapass from "./Decentrapass";
import Wordel from "./Wordel";

export default function AllProjects() {
  const projects = [
    <BUNexus />,
    <Danielmelchor />,
    <Decentrapass />,
    <Wordel />,
  ];
  return (
    <>
      {projects.map((p, key) => (
        <>
          {p}
          <p>&nbsp;</p>
          <p>&nbsp;</p>
        </>
      ))}
    </>
  );
}
