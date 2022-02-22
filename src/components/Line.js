import React from "react";

export default function Line({ log }) {
  console.log(typeof log);

  if (typeof log === "string") return <div className="line">{log}</div>;
  else if (typeof log === "object")
    return (
      <div className="line-list">
        {log.map((item, key) => (
          <div key={key}>{item}</div>
        ))}
      </div>
    );
  return <></>;
}
