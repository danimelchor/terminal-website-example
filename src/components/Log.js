import React from "react";
import { T, FILE_STRUCTURE } from "../Terminal/TerminalData";

const getColor = (name) => {
  const l = name.length;

  if (name.charAt(0) === ".") {
    return "c-gray-1";
  } else if (name.charAt(l - 1) === "/") {
    return "c-teal-1";
  } else if (name.substring(l - 3) === ".sh") {
    return "c-purple-1";
  }
};

const Default = ({ content }) => <div className="line c-blue-1">{content}</div>;
const Error = ({ content }) => <div className="line">{content}</div>;

const List = ({ content }) => (
  <div className="line-list">
    {content.map((item, key) => (
      <div className={getColor(item)} key={key}>
        {item}
      </div>
    ))}
  </div>
);

const Command = ({ content }) => (
  <div className="line">
    <span className="c-teal-1">/{content.dir}</span> ~ {content.cmd}
  </div>
);

const Table = ({ content }) => {
  return (
    <div className="line-table">
      <table>
        <colgroup>
          <col span="1" style={{ width: "30%" }} />
          <col span="1" style={{ width: "40%" }} />
          <col span="1" style={{ width: "30%" }} />
        </colgroup>
        <tbody>
          {content.map((r) => (
            <tr>
              <td>{r[0]}</td>
              <td>{r[1]}</td>
              <td>{r[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function Log({ type, content }) {
  if (type === T.text) return <Default content={content} />;
  else if (type === T.list) return <List content={content} />;
  else if (type === T.cmd) return <Command content={content} />;
  else if (type === T.error) return <Error content={content} />;
  else if (type === T.table) return <Table content={content} />;
  else if (type === T.data) return <>{FILE_STRUCTURE[content]}</>;
  return <></>;
}
