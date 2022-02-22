import React, { useState } from "react";

export default function Type({ handleSubmit, currDir }) {
  const [value, setValue] = useState("");

  const handle = (e) => {
    e.preventDefault();
    handleSubmit(value);
    setValue("");
  };

  return (
    <form className="type" onSubmit={handle}>
      <p>/{currDir} &gt;</p>
      <input
        type="text"
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}
