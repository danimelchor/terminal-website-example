import React from "react";

export default function Title({started}) {
  return (
    <div className="title">
      <div className="ascii">
        <pre> ________  ________  ________   ___  _______   ___               _____ ______          </pre>
        <pre>|\   ___ \|\   __  \|\   ___  \|\  \|\  ___ \ |\  \             |\   _ \  _   \        </pre>
        <pre>\ \  \_|\ \ \  \|\  \ \  \\ \  \ \  \ \   __/|\ \  \            \ \  \\\__\ \  \       </pre>
        <pre> \ \  \ \\ \ \   __  \ \  \\ \  \ \  \ \  \_|/_\ \  \            \ \  \\|__| \  \      </pre>
        <pre>  \ \  \_\\ \ \  \ \  \ \  \\ \  \ \  \ \  \_|\ \ \  \____        \ \  \    \ \  \ ___ </pre>
        <pre>   \ \_______\ \__\ \__\ \__\\ \__\ \__\ \_______\ \_______\       \ \__\    \ \__|\__\</pre>
        <pre>    \|_______|\|__|\|__|\|__| \|__|\|__|\|_______|\|_______|        \|__|     \|__\|__|</pre>
      </div>
      <p style={{opacity: started ? 0 : 1}}>Type <span>help</span> in the terminal to start</p>
    </div>
  );
}
